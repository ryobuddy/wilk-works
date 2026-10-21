# Stack para convertir las demos en proyectos reales

Las 7 demos de `/demos` funcionan en el navegador con datos de prueba. Para venderlas como producto real les falta lo mismo: **backend (base de datos y usuarios), pagos reales, comprobantes SUNAT y notificaciones**. Este documento propone una base común y, por cada demo, qué librerías o proyectos open source usar.

Precios, comisiones y licencias cambian: confírmalos en la web oficial antes de cotizar a un cliente.

---

## 1. Base común (sirve para todas)

| Necesidad | Recomendado | Alternativa | Notas |
|---|---|---|---|
| Base de datos, usuarios y archivos | **Supabase** (PostgreSQL, autenticación, almacenamiento y tiempo real) | **PocketBase** (un solo binario con SQLite) | Supabase escala mejor; PocketBase es ideal para clientes pequeños con un VPS barato |
| Frontend | El HTML + JS actual, o **Astro** si se necesita SEO con muchas páginas | Next.js o Nuxt | No hace falta un framework para la mayoría de pymes |
| Pagos con tarjeta y Yape | **Culqi** (librerías oficiales; su API v2 incluye tarjetas, Yape y PagoEfectivo) | **Izipay** o **Niubiz** | Ten cuentas de prueba: las llaves `test` y `live` están separadas |
| Comprobantes SUNAT | **Greenter** (PHP, open source: XML UBL 2.1, firma y envío) | Un PSE u OSE con API, por ejemplo **Nubefact** | Greenter es gratis pero necesitas certificado digital y mantenerlo; un PSE cobra por comprobante y te ahorra el mantenimiento |
| Recordatorios por WhatsApp | **WhatsApp Business Cloud API** (Meta) | Enlaces `wa.me`, como ahora | La API oficial requiere plantillas aprobadas por Meta |
| Correos transaccionales | **Resend** o **Brevo** | SMTP del hosting | Para confirmaciones de pedido o de reserva |
| PDF | **jsPDF + autoTable** (ya integrado) | Generación en el servidor | Para boletas, reportes y cotizaciones |
| Excel | **SheetJS CE** (ya integrado) | — | Importar y exportar inventarios |
| Gráficos | **Chart.js** (ya integrado) | **Apache ECharts** | ECharts trae más tipos de gráfico |
| Tablas grandes | **Tabulator** (MIT) | AG Grid Community | Filtros, orden y paginación sin código propio |
| Código de barras y QR | **html5-qrcode** y **JsBarcode** (ya integrados) | `@zxing/browser` | html5-qrcode funciona con la cámara del celular |
| Mapas | **Leaflet + OpenStreetMap** | Google Maps | Leaflet es gratis; con mucho tráfico usa un proveedor de mapas propio |
| App instalable | Service worker propio (ya en Reservas) | **Workbox** | Workbox simplifica la caché sin conexión |
| Hosting | **Vercel** (frontend) | Railway o un VPS (backend) | El sitio ya está en Vercel |

---

## 2. Por proyecto

### 🛍️ Tienda online (Andina)
- **Ya usa:** jsPDF, autoTable, canvas-confetti y localStorage.
- **Para producción:**
  - Productos, pedidos y clientes en **Supabase**, con un panel de administración propio o **Tabulator**.
  - Pago con **Culqi Checkout** (tarjeta y Yape) y webhook para marcar el pedido como pagado.
  - Boleta o factura vía **Greenter** o un **PSE**.
  - Envíos: tarifas por zona en una tabla. Integrar a un courier solo si el cliente lo pide.
- **Open source listo para adaptar:** **WooCommerce** (fácil para el cliente, enorme ecosistema peruano: Culqi, Izipay y Nubefact tienen plugins) o **Medusa** (headless, TypeScript y PostgreSQL; mejor para equipos técnicos).

### 🏨 Hotel (Casa Qolla)
- **Ya usa:** flatpickr, canvas-confetti y un cuadro de ocupación propio.
- **Para producción:**
  - Habitaciones, tarifas y reservas en **Supabase**. Usa la función de tiempo real para que dos personas no reserven la misma habitación.
  - Pago o adelanto con **Culqi**, y correo de confirmación con **Resend**.
  - Calendario del personal: **FullCalendar** (núcleo MIT gratis; la vista de recursos por habitación es de pago) o mantener el cuadro propio.
- **Open source listo para adaptar:** **QloApps** (gestión hotelera, motor de reservas y web; PHP 8.1+ y MySQL; licencia OSL-3.0). Revisa la licencia antes de revenderlo modificado.

### 🧾 Punto de venta (El Perno)
- **Ya usa:** JsBarcode y validación de RUC propia.
- **Para producción:**
  - Ventas y stock en **Supabase**, con funcionamiento **sin conexión** (cola local que se sincroniza al volver internet).
  - Boletas y facturas reales con **Greenter** o un **PSE**, más resumen diario de boletas.
  - Impresión en ticketera térmica con **QZ Tray** o impresión del navegador en 80 mm, como ahora.
  - Consulta de RUC o DNI con una API de consulta (existen servicios peruanos de pago).
- **Open source listo para adaptar:** **Open Source Point of Sale (OSPOS)** (PHP, CodeIgniter 4 y MySQL, con Docker; verifica su LICENSE) u **Odoo Community** (LGPLv3; más completo y más pesado).

### 📦 Inventario (Stockly)
- **Ya usa:** Chart.js, SheetJS, jsPDF, JsBarcode y html5-qrcode.
- **Para producción:**
  - Productos, almacenes y movimientos en **Supabase**, con usuarios y roles (almacenero, administrador).
  - Tabla con **Tabulator** cuando haya miles de productos.
  - Alertas de stock bajo por correo o WhatsApp.
- **Open source listo para adaptar:** **ERPNext** (GPL; inventario, compras y ventas) u **Odoo Community**.

### 🏠 Inmobiliaria (Horizonte)
- **Ya usa:** solo JS propio, con cotizador de cuota fija.
- **Para producción:**
  - Propiedades y fotos en **Supabase Storage**, con un panel para que la inmobiliaria suba inmuebles.
  - **Leaflet** para ver las propiedades en un mapa.
  - Formulario de contacto que guarda el cliente potencial y avisa por correo o WhatsApp.
  - Si tiene muchas páginas, conviene generarlas con **Astro** para el SEO.

### 📅 Reservas (Vitalis)
- **Ya usa:** flatpickr, qrcodejs y una app instalable (PWA).
- **Para producción:**
  - Agenda por especialista en **Supabase**.
  - Recordatorio automático 24 h antes con la **WhatsApp Business Cloud API** y una tarea programada (cron de Supabase o Vercel).
  - Pago de reserva opcional con **Culqi**.
- **Open source listo para adaptar:** **Easy!Appointments** (PHP, licencia GPL).

### ☁️ Cloud (Nimbus)
- **Ya usa:** Chart.js, jsPDF y latencia real medida desde el navegador.
- **Como servicio real:**
  - Contenedores con **Docker**.
  - Infraestructura como código con **Terraform**.
  - Monitoreo con **Uptime Kuma** (open source) o Better Stack.
  - Respaldos con **restic**.
  - El panel puede leer el estado real desde Uptime Kuma.

---

## 3. Orden sugerido

1. **Montar la base común una vez:** proyecto en Supabase, cuenta de prueba en Culqi y entorno de pruebas de comprobantes (Greenter o PSE).
2. **Convertir primero la tienda y el punto de venta**, que son los que más piden tus clientes (pagos y SUNAT).
3. **Reutilizar esos módulos** (usuarios, pagos, comprobantes, correo) en hotel, reservas e inventario.

## 4. Cuidado con las licencias
- **MIT, BSD y Apache 2.0:** puedes usarlas y modificarlas en proyectos de clientes sin problema.
- **GPL, LGPL y OSL** (ERPNext, Easy!Appointments, QloApps, Odoo CE): puedes usarlas, pero si distribuyes versiones modificadas debes respetar sus condiciones. Revísalas antes de venderlas como producto propio.
- **FullCalendar Premium:** solo la versión de pago permite uso comercial de las vistas de recursos.

## Fuentes
- Greenter: https://packagist.org/packages/greenter/ws · https://packagist.org/packages/greenterfin/xml
- API de facturación con Laravel y Greenter: https://mintlify.com/yorchavez9/Api-de-facturacion-electronica-sunat-Peru/introduction
- Pasarelas en Perú: https://kom.pe/pasarelas-pago-tienda-virtual-peru-2026/ · https://pypi.org/project/culqi3/ · https://www.guiadesoftware.com/blog/mejor-pasarela-pago-peru
- QloApps: https://blog.brightcoding.dev/2026/10/06/qloappsqloapps-self-hosted-hotel-booking-platform-in-php · https://alternativeto.net/software/qloapps/about
- OSPOS y Odoo: https://awesome.ecosyste.ms/projects/github.com%2Fopensourcepos%2Fopensourcepos · https://opensource.com/tools/point-of-sale
- Medusa y WooCommerce: https://dev.to/gunkev/medusa-vs-woocommerce-comparing-two-open-source-online-commerce-platforms-4g8g · https://rigbyjs.com/pl/blog/woocommerce-vs-shopify-vs-medusa
- FullCalendar Premium: https://fullcalendar.io/premium
