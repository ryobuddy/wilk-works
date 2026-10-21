// Prueba del flujo /api/checkout con Supabase y Culqi simulados: node --test api/_checkout.test.js
const test = require("node:test");
const assert = require("node:assert/strict");

function setup({ culqiOk = true } = {}) {
  process.env.SUPABASE_URL = "https://demo.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
  process.env.CULQI_SECRET_KEY = "sk_test_x";
  const calls = [];
  const db = { stock: { 1: 3, 2: 10 }, order: null };
  global.fetch = async (url, opt = {}) => {
    const body = opt.body ? JSON.parse(opt.body) : null;
    calls.push({ url, method: opt.method || "GET", body });
    const json = (status, data) => ({ ok: status < 400, status, text: async () => JSON.stringify(data), json: async () => data });
    if (url.includes("/rest/v1/products")) return json(200, [{ id: 1, name: "Chompa", price: 189, stock: db.stock[1], active: true }, { id: 2, name: "Café", price: 42, stock: db.stock[2], active: true }]);
    if (url.endsWith("/rpc/reserve_stock")) { for (const i of body.p_items) { if (db.stock[i.id] < i.q) return json(400, { message: "SIN_STOCK" }); db.stock[i.id] -= i.q; } return json(200, null); }
    if (url.endsWith("/rpc/release_stock")) { for (const i of body.p_items) db.stock[i.id] += i.q; return json(200, null); }
    if (url.endsWith("/rest/v1/orders") && opt.method === "POST") { db.order = { id: "o1", ...body, status: "pending" }; return json(201, [db.order]); }
    if (url.includes("/rest/v1/orders?id=eq.o1")) { Object.assign(db.order, body); return json(200, [db.order]); }
    if (url === "https://api.culqi.com/v2/charges") return culqiOk ? json(201, { object: "charge", id: "chr_test_1" }) : json(402, { object: "error", user_message: "Tarjeta rechazada" });
    throw new Error("URL inesperada " + url);
  };
  return { calls, db };
}

function call(body) {
  delete require.cache[require.resolve("./checkout")];
  const handler = require("./checkout");
  return new Promise((resolve) => {
    const res = { statusCode: 200, status(c) { this.statusCode = c; return this; }, json(d) { resolve({ status: this.statusCode, body: d }); } };
    handler({ method: "POST", body }, res);
  });
}

const customer = { name: "Ana Pérez", address: "Av. Demo 123", district: "Miraflores" };

test("pago aprobado: cobra el total calculado en el servidor y marca el pedido pagado", async () => {
  const { calls, db } = setup();
  const r = await call({ token: "tkn_test_1", email: "ana@example.com", customer, items: [{ id: 1, q: 1, price: 1 }, { id: 2, q: 1 }] });
  assert.equal(r.status, 200);
  assert.equal(r.body.total, 231);
  const charge = calls.find((c) => c.url.includes("culqi")).body;
  assert.equal(charge.amount, 23100); // 189 + 42, envío gratis; el precio "1" del navegador se ignora
  assert.equal(charge.currency_code, "PEN");
  assert.equal(db.order.status, "paid");
  assert.equal(db.order.culqi_charge_id, "chr_test_1");
  assert.deepEqual(db.stock, { 1: 2, 2: 9 });
});

test("tarjeta rechazada: libera el stock y marca el pedido fallido", async () => {
  const { db } = setup({ culqiOk: false });
  const r = await call({ token: "tkn_test_1", email: "ana@example.com", customer, items: [{ id: 1, q: 2 }] });
  assert.equal(r.status, 402);
  assert.match(r.body.error, /rechazada/);
  assert.equal(db.order.status, "failed");
  assert.deepEqual(db.stock, { 1: 3, 2: 10 });
});

test("sin stock suficiente no llega a cobrar", async () => {
  const { calls } = setup();
  const r = await call({ token: "tkn_test_1", email: "ana@example.com", customer, items: [{ id: 1, q: 5 }] });
  assert.equal(r.status, 400);
  assert.ok(!calls.some((c) => c.url.includes("culqi")));
});

test("datos incompletos o sin configurar", async () => {
  setup();
  assert.equal((await call({ email: "ana@example.com", customer, items: [{ id: 1, q: 1 }] })).status, 400);
  assert.equal((await call({ token: "t", email: "malo", customer, items: [{ id: 1, q: 1 }] })).status, 400);
  delete process.env.CULQI_SECRET_KEY;
  assert.equal((await call({ token: "t", email: "ana@example.com", customer, items: [{ id: 1, q: 1 }] })).status, 503);
});
