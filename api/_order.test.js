// Prueba rápida del cálculo de pedidos: node --test api/_order.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { computeOrder } = require("./_order");

const DB = [
  { id: 1, name: "Chompa", price: "189.00", stock: 2, active: true },
  { id: 2, name: "Café", price: "42.00", stock: 10, active: true },
  { id: 3, name: "Oculto", price: "10.00", stock: 5, active: false },
  { id: 4, name: "Centavos", price: "0.10", stock: 50, active: true },
];

test("usa precios de la base de datos y envío gratis desde S/ 150", () => {
  const o = computeOrder(DB, [{ id: 1, q: 1, price: 1 }]); // el precio del navegador se ignora
  assert.equal(o.subtotal, 189);
  assert.equal(o.shipping, 0);
  assert.equal(o.amountCents, 18900);
});

test("cobra envío bajo S/ 150 y une líneas repetidas", () => {
  const o = computeOrder(DB, [{ id: 2, q: 1 }, { id: 2, q: 2 }]);
  assert.deepEqual(o.items, [{ id: 2, q: 3, name: "Café", price: 42 }]);
  assert.equal(o.total, 141);
  assert.equal(o.amountCents, 14100);
});

test("sin errores de redondeo con decimales", () => {
  assert.equal(computeOrder(DB, [{ id: 4, q: 3 }]).amountCents, 30 + 1500);
});

test("rechaza stock insuficiente, productos inactivos y cantidades raras", () => {
  assert.throws(() => computeOrder(DB, [{ id: 1, q: 3 }]), /Solo quedan 2/);
  assert.throws(() => computeOrder(DB, [{ id: 3, q: 1 }]), /no disponible/);
  assert.throws(() => computeOrder(DB, [{ id: 99, q: 1 }]), /no disponible/);
  assert.throws(() => computeOrder(DB, [{ id: 2, q: 0 }]), /Cantidad/);
  assert.throws(() => computeOrder(DB, [{ id: 2, q: 1.5 }]), /Cantidad/);
  assert.throws(() => computeOrder(DB, []), /vacío/);
});
