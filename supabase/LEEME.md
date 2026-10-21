# Tienda real · Supabase + Culqi (modo prueba)

La tienda (`/demos/tienda`) funciona en **modo demo** hasta que completes estos pasos. Luego lee los productos de Supabase y cobra con Culqi.

**Cómo funciona el cobro:**
1. **Navegador:** la ventana de Culqi convierte la tarjeta o el pago con Yape en un token. Los datos de la tarjeta nunca pasan por tu sitio.
2. **`/api/checkout`** (función de Vercel):
   - recalcula el total con los precios de Supabase, sin confiar en el navegador;
   - reserva el stock;
   - cobra con tu clave secreta;
   - marca el pedido como pagado. Si el cobro falla, libera el stock y marca el pedido como fallido.

---

## 1. Supabase (base de datos)
1. Entra a https://supabase.com y crea un proyecto. Para Perú, elige la región **South America (São Paulo)**.
2. Ve a **SQL Editor → New query**, pega todo el archivo [`tienda.sql`](tienda.sql) y presiona **Run**. Se crean las tablas `products` y `orders`, la seguridad y los 8 productos de ejemplo.
3. Ve a **Project Settings → API** y copia:
   - **Project URL** (`https://xxxx.supabase.co`): es pública.
   - **anon public**: es pública.
   - **service_role**: es **secreta**. No la pegues en ningún archivo del sitio.

## 2. Culqi (pagos de prueba)
1. Crea tu cuenta en https://culqi.com y entra al **CulqiPanel**, en el entorno de **integración/pruebas**.
2. Ve a **Desarrollo → API Keys** y copia:
   - **Llave pública** (`pk_test_...`): es pública.
   - **Llave secreta** (`sk_test_...`): es **secreta**.

## 3. Claves secretas en Vercel (las pones tú)
Desde la carpeta `wilkworks`, ejecuta cada comando y pega el valor cuando te lo pida:

```bash
vercel env add SUPABASE_URL production
```
```bash
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```
```bash
vercel env add CULQI_SECRET_KEY production
```

También puedes cargarlas desde vercel.com → proyecto **wilk-works** → **Settings → Environment Variables**.

## 4. Claves públicas en el sitio
Abre [`demos/tienda/config.js`](../demos/tienda/config.js), completa `supabaseUrl`, `supabaseAnonKey` y `culqiPublicKey` (la `pk_test_`), y publica:

```bash
git add demos/tienda/config.js
```
```bash
git commit -m "Conectar tienda a Supabase y Culqi (pruebas)"
```
```bash
git push
```

Con una llave `pk_test_`, la tienda muestra arriba "modo de pruebas".

## 5. Probar
1. Abre https://wilk-works.vercel.app/demos/tienda, agrega productos y paga.
2. Usa las **tarjetas de prueba** que publica Culqi en su documentación (busca "tarjetas de prueba" en docs.culqi.com). Con llaves de prueba no se cobra dinero real.
3. Revisa el resultado en Supabase → **Table Editor**:
   - **orders:** los pedidos con estado `paid` o `failed`.
   - **products:** el stock descontado.

Para agregar o editar productos, usa también Supabase → Table Editor → `products`. El campo `active = false` oculta un producto.

---

## Pendiente antes de cobrar dinero real
- [ ] **Comprobantes SUNAT** (boleta o factura) al pagar, con Greenter o un PSE. Ver `_scenes/stack-proyectos.md`.
- [ ] **Correo de confirmación** al cliente (por ejemplo con Resend).
- [ ] **Pagos con 3D Secure:** algunos bancos piden una verificación extra que Culqi devuelve en el cobro. Hay que manejar ese caso antes de salir a producción.
- [ ] **Panel de pedidos** para el dueño de la tienda (hoy se ven en Supabase).
- [ ] **Cambiar a llaves `live`** de Culqi cuando la cuenta esté aprobada para cobros reales.

## Pruebas automáticas
```bash
node --test api/_order.test.js api/_checkout.test.js
```
Prueban el cálculo del total, el envío, los céntimos y el stock, además del flujo completo con Supabase y Culqi simulados: pago aprobado, tarjeta rechazada y falta de stock.
