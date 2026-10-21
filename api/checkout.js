// POST /api/checkout · cobra un pedido de la tienda con Culqi.
// Variables de entorno (en Vercel → Settings → Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CULQI_SECRET_KEY (usa la sk_test_ mientras pruebas)
const { computeOrder } = require("./_order");

const env = (k) => process.env[k] || "";

async function db(path, options = {}) {
  const res = await fetch(`${env("SUPABASE_URL")}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: env("SUPABASE_SERVICE_ROLE_KEY"),
      Authorization: `Bearer ${env("SUPABASE_SERVICE_ROLE_KEY")}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...options.headers,
    },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw Object.assign(new Error(data?.message || `Supabase ${res.status}`), { db: data });
  return data;
}

const rpc = (fn, args) => db(`rpc/${fn}`, { method: "POST", body: JSON.stringify(args) });

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Usa POST" });
  if (!env("SUPABASE_URL") || !env("SUPABASE_SERVICE_ROLE_KEY") || !env("CULQI_SECRET_KEY"))
    return res.status(503).json({ error: "La tienda aún no está configurada (faltan variables de entorno)." });

  const { token, email, customer = {}, items } = req.body || {};
  const name = String(customer.name || "").trim(), address = String(customer.address || "").trim(), district = String(customer.district || "").trim();
  if (!token || typeof token !== "string") return res.status(400).json({ error: "Falta el token de pago" });
  if (!/^\S+@\S+\.\S+$/.test(String(email || ""))) return res.status(400).json({ error: "Correo no válido" });
  if (!name || !address || !district) return res.status(400).json({ error: "Completa nombre, dirección y distrito" });

  // 1. Precios y stock reales desde la base de datos
  let order;
  try {
    const ids = [...new Set((items || []).map((i) => Number(i.id)).filter(Number.isInteger))];
    const products = ids.length ? await db(`products?select=id,name,price,stock,active&id=in.(${ids.join(",")})`) : [];
    order = computeOrder(products, items);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  const stockItems = order.items.map(({ id, q }) => ({ id, q }));
  const code = "AND-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);

  // 2. Reservar stock (atómico) y registrar el pedido como pendiente
  try {
    await rpc("reserve_stock", { p_items: stockItems });
  } catch (e) {
    return res.status(409).json({ error: "Uno de los productos se acaba de agotar. Revisa tu carrito." });
  }
  let saved;
  try {
    [saved] = await db("orders", {
      method: "POST",
      body: JSON.stringify({ code, customer_name: name, email, address, district, items: order.items, subtotal: order.subtotal, shipping: order.shipping, total: order.total }),
    });
  } catch (e) {
    await rpc("release_stock", { p_items: stockItems }).catch(() => {});
    return res.status(500).json({ error: "No se pudo registrar el pedido. No se hizo ningún cobro." });
  }

  // 3. Cobrar con Culqi (monto en céntimos, calculado aquí)
  let charge;
  try {
    const r = await fetch("https://api.culqi.com/v2/charges", {
      method: "POST",
      headers: { Authorization: `Bearer ${env("CULQI_SECRET_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: order.amountCents,
        currency_code: "PEN",
        email,
        source_id: token,
        description: `Pedido ${code} · Andina`,
        metadata: { order_code: code },
      }),
    });
    charge = await r.json();
    if (!r.ok || charge.object === "error") throw new Error(charge.user_message || charge.merchant_message || "Pago rechazado");
  } catch (e) {
    await rpc("release_stock", { p_items: stockItems }).catch(() => {});
    await db(`orders?id=eq.${saved.id}`, { method: "PATCH", body: JSON.stringify({ status: "failed", error: String(e.message).slice(0, 300) }) }).catch(() => {});
    return res.status(402).json({ error: e.message || "El pago no se pudo completar." });
  }

  // 4. Pedido pagado
  await db(`orders?id=eq.${saved.id}`, { method: "PATCH", body: JSON.stringify({ status: "paid", culqi_charge_id: charge.id, paid_at: new Date().toISOString() }) }).catch((e) => console.error("Cobro OK pero no se pudo marcar pagado", code, charge.id, e.message));
  return res.status(200).json({ ok: true, code, total: order.total, items: order.items, shipping: order.shipping });
};
