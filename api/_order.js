// Cálculo del pedido con los precios y el stock de la base de datos (nunca los del navegador).
// Los archivos que empiezan con "_" dentro de /api no se publican como endpoints en Vercel.

const FREE_SHIPPING_FROM = 150; // soles
const SHIPPING_COST = 15;

function computeOrder(products, items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error("El carrito está vacío");
  const byId = new Map(products.map((p) => [Number(p.id), p]));
  const merged = new Map();
  for (const it of items) {
    const id = Number(it.id), q = Number(it.q);
    if (!Number.isInteger(id) || !Number.isInteger(q) || q < 1 || q > 99) throw new Error("Cantidad no válida");
    merged.set(id, (merged.get(id) || 0) + q);
  }
  const lines = [...merged].map(([id, q]) => {
    const p = byId.get(id);
    if (!p || p.active === false) throw new Error("Producto no disponible");
    if (p.stock < q) throw new Error(`Solo quedan ${p.stock} de ${p.name}`);
    const cents = Math.round(Number(p.price) * 100);
    return { id, q, name: p.name, price: cents / 100, lineCents: cents * q };
  });
  const subtotalCents = lines.reduce((s, l) => s + l.lineCents, 0);
  const shippingCents = subtotalCents >= FREE_SHIPPING_FROM * 100 ? 0 : SHIPPING_COST * 100;
  return {
    items: lines.map(({ id, q, name, price }) => ({ id, q, name, price })),
    subtotal: subtotalCents / 100,
    shipping: shippingCents / 100,
    total: (subtotalCents + shippingCents) / 100,
    amountCents: subtotalCents + shippingCents, // Culqi cobra en céntimos
  };
}

module.exports = { computeOrder, FREE_SHIPPING_FROM, SHIPPING_COST };
