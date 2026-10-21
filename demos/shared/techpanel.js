// Panel "Cómo está hecho": muestra stack, funciones, técnicas, código y créditos de cada demo.
// Uso: <script src="/demos/shared/techpanel.js" data-app="tienda" defer></script>
(function () {
  const app = document.currentScript?.dataset.app;
  const REPO = "https://github.com/ryobuddy/wilk-works/tree/main/demos/";
  const L = (name, url, license) => ({ name, url, license });
  const LIBS = {
    chart: L("Chart.js 4", "https://www.chartjs.org/", "MIT"),
    jspdf: L("jsPDF + AutoTable", "https://github.com/parallax/jsPDF", "MIT"),
    sheet: L("SheetJS CE", "https://sheetjs.com/", "Apache-2.0"),
    barcode: L("JsBarcode", "https://github.com/lindell/JsBarcode", "MIT"),
    qr: L("html5-qrcode", "https://github.com/mebjas/html5-qrcode", "Apache-2.0"),
    qrgen: L("QRCode.js", "https://github.com/davidshimjs/qrcodejs", "MIT"),
    flat: L("flatpickr", "https://flatpickr.js.org/", "MIT"),
    leaflet: L("Leaflet + OpenStreetMap", "https://leafletjs.com/", "BSD-2 · datos ODbL"),
    confetti: L("canvas-confetti", "https://github.com/catdad/canvas-confetti", "ISC"),
    culqi: L("Culqi Checkout Custom", "https://docs.culqi.com/", "Servicio de pagos"),
    supabase: L("Supabase (PostgreSQL + API REST)", "https://supabase.com/", "Apache-2.0"),
    vercel: L("Vercel Functions (Node.js)", "https://vercel.com/docs/functions", "Plataforma"),
  };
  const APPS = {
    tienda: {
      title: "Tienda online Andina",
      libs: ["supabase", "culqi", "vercel", "jspdf", "confetti"],
      features: ["Catálogo con filtros, búsqueda y orden", "Ficha de producto con cantidades", "Carrito persistente con envío gratis desde S/ 150", "Checkout con pago real en modo de pruebas (tarjeta y Yape vía Culqi)", "Stock descontado de forma atómica en la base de datos", "Constancia de pedido en PDF"],
      tech: ["El total se recalcula en el servidor con los precios de la base de datos", "Los datos de tarjeta nunca tocan el servidor (tokenización de Culqi)", "Row Level Security: el público solo lee productos activos", "Reserva y liberación de stock con funciones SQL transaccionales", "Pruebas automáticas del cálculo y del flujo de cobro (node:test)"],
      arch: ["Navegador → Culqi crea un token", "/api/checkout valida precios en Supabase y reserva stock", "Cobro con la llave secreta de Culqi", "Pedido marcado como pagado; si falla, se libera el stock"],
    },
    hotel: {
      title: "Casa Qolla · Hotel boutique",
      libs: ["flat", "leaflet", "confetti"],
      features: ["Motor de reservas con rango de fechas y huéspedes", "Precio total por noches en soles o dólares", "Disponibilidad por habitación y bloqueo de fechas ocupadas", "Código promocional (prueba WILK10)", "Vista del personal: ocupación de 14 días e indicadores", "Mapa real de la ubicación"],
      tech: ["Asignación automática de la habitación libre para todo el rango", "Ocupación simulada con hash estable (misma respuesta en cada visita)", "Mapa con teselas de OpenStreetMap y marcadores propios", "Diseño responsive con panel lateral de reserva"],
      arch: ["Hoy: datos en el navegador", "Producción: habitaciones y reservas en Supabase con tiempo real para evitar dobles reservas", "Adelanto con Culqi y correo de confirmación"],
    },
    pos: {
      title: "Punto de venta El Perno",
      libs: ["barcode", "qr"],
      features: ["Búsqueda y lectura de código de barras (lector USB o cámara)", "Boleta con DNI o factura con RUC", "Efectivo con vuelto, Yape/Plin o tarjeta", "Ticket de 80 mm con IGV desglosado e impresión", "Cierre de caja por método de pago", "Hoja de códigos de prueba imprimible"],
      tech: ["Validación real del RUC (dígito verificador módulo 11)", "Precios con IGV incluido: base = total ÷ 1.18", "Escaneo por cámara con antirrebote para no duplicar lecturas", "CSS de impresión dedicado para ticket y etiquetas"],
      arch: ["Hoy: ventas y stock en el navegador", "Producción: Supabase con cola sin conexión", "Comprobantes SUNAT con Greenter o un PSE", "Impresión térmica con QZ Tray"],
    },
    inventario: {
      title: "Stockly · Gestor de inventario",
      libs: ["chart", "sheet", "jspdf", "barcode", "qr"],
      features: ["Panel con indicadores y gráficos", "Multi-almacén con filtros", "Alta, edición, borrado y ajustes de stock", "Historial de movimientos", "Exportar a Excel y PDF; importar Excel o CSV", "Etiquetas con código de barras y escáner por cámara"],
      tech: ["Gráficos alimentados por el historial real de movimientos", "Importación tolerante a nombres de columnas", "Vistas por hash (#productos, #movimientos) sin framework"],
      arch: ["Hoy: datos en el navegador", "Producción: Supabase con usuarios y roles", "Alertas de stock bajo por correo o WhatsApp"],
    },
    inmobiliaria: {
      title: "Horizonte Inmobiliaria",
      libs: ["leaflet"],
      features: ["Catálogo con filtros por distrito, tipo, dormitorios y presupuesto", "Vista de lista y vista de mapa", "Ficha con galería de fotos", "Cotizador hipotecario con TEA y plazo", "Formulario para agendar visitas con validación"],
      tech: ["Cuota fija (método francés) con TEA convertida a tasa mensual", "Mapa sincronizado con los filtros y marcadores con precio", "Imágenes WebP optimizadas con carga diferida"],
      arch: ["Hoy: propiedades de ejemplo en el código", "Producción: propiedades y fotos en Supabase Storage con panel de carga", "Leads guardados y avisados por correo o WhatsApp"],
    },
    reservas: {
      title: "App de reservas Vitalis",
      libs: ["flat", "qrgen"],
      features: ["Reserva en 3 pasos: servicio, día y hora, datos", "Calendario con domingos y horas ocupadas bloqueadas", "QR de la cita", "Añadir a Google Calendar o descargar .ics con alarma", "Recordatorio por WhatsApp", "Instalable en el celular (PWA) y uso sin conexión"],
      tech: ["Service worker con estrategia red primero y caché de respaldo", "Manifiesto web para instalación", "Archivo iCalendar generado en el navegador"],
      arch: ["Hoy: citas en el navegador", "Producción: agenda por especialista en Supabase", "Recordatorios automáticos con WhatsApp Business Cloud API"],
    },
    cloud: {
      title: "Panel de migración a la nube",
      libs: ["chart", "jspdf"],
      features: ["Arquitectura antes y después", "Calculadora de ahorro en USD o soles", "Gráfico de costos proyectados", "Latencia medida en vivo", "Reporte PDF con el gráfico", "Enlace para compartir los valores"],
      tech: ["Latencia real: peticiones HEAD al servidor de Vercel desde tu navegador", "Estado de la calculadora guardado en la URL", "Gráfico exportado como imagen dentro del PDF"],
      arch: ["Como servicio real: Docker + Terraform", "Monitoreo con Uptime Kuma", "Respaldos con restic"],
    },
  };
  const cfg = APPS[app];
  if (!cfg) return;

  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: "open" });
  const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  root.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; font-family: Inter, system-ui, sans-serif; }
      .fab { position: fixed; left: 16px; bottom: 16px; z-index: 2147483000; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 0; border-radius: 999px; background: #0b0a14; color: #f5c542; font: 600 13px "JetBrains Mono", ui-monospace, monospace; cursor: pointer; box-shadow: 0 10px 30px -8px rgba(0,0,0,.5); }
      .fab:hover { transform: translateY(-1px); }
      .scrim { position: fixed; inset: 0; background: rgba(11,10,20,.55); z-index: 2147483001; opacity: 0; pointer-events: none; transition: opacity .2s; }
      .panel { position: fixed; top: 0; left: 0; bottom: 0; width: min(440px, 100%); z-index: 2147483002; background: #0f0e1b; color: #e9e7f5; transform: translateX(-100%); transition: transform .3s cubic-bezier(.2,.7,.2,1); overflow: auto; padding: 22px; font-size: 14px; line-height: 1.55; }
      .open .scrim { opacity: 1; pointer-events: auto; }
      .open .panel { transform: none; }
      h2 { font: 700 20px "Space Grotesk", Inter, sans-serif; margin: 4px 0 2px; }
      h3 { font: 600 12px "JetBrains Mono", monospace; color: #b69bff; text-transform: uppercase; letter-spacing: .08em; margin: 20px 0 8px; }
      .k { font: 500 12px "JetBrains Mono", monospace; color: #f5c542; }
      .x { position: absolute; top: 14px; right: 14px; border: 0; background: none; color: #9b97b8; font-size: 26px; cursor: pointer; }
      ul { margin: 0; padding-left: 18px; color: #bdb9d6; }
      li { margin: 4px 0; }
      .libs { display: grid; gap: 6px; padding: 0; list-style: none; }
      .libs a { display: flex; justify-content: space-between; gap: 10px; padding: 9px 12px; border-radius: 10px; background: rgba(139,92,246,.12); border: 1px solid rgba(169,139,255,.2); color: #e9e7f5; text-decoration: none; }
      .libs a:hover { border-color: #b69bff; }
      .libs small { color: #9b97b8; white-space: nowrap; }
      ol { margin: 0; padding-left: 20px; color: #bdb9d6; }
      .code { display: block; margin-top: 18px; text-align: center; padding: 12px; border-radius: 12px; background: #f5c542; color: #1a1408; font-weight: 700; text-decoration: none; }
      .cred { font-size: 12px; color: #9b97b8; }
      .cred a { color: #8fa9ff; }
      .note { font-size: 12px; color: #9b97b8; margin-top: 18px; }
    </style>
    <button class="fab" aria-label="Ver cómo está hecha esta demo">&lt;/&gt; Cómo está hecho</button>
    <div class="scrim"></div>
    <aside class="panel" role="dialog" aria-label="Cómo está hecho">
      <button class="x" aria-label="Cerrar">×</button>
      <span class="k">// Wilk Works · demo</span>
      <h2>${esc(cfg.title)}</h2>
      <h3>Librerías y servicios</h3>
      <ul class="libs">${cfg.libs.map((k) => `<li><a href="${LIBS[k].url}" target="_blank" rel="noopener">${esc(LIBS[k].name)}<small>${esc(LIBS[k].license)}</small></a></li>`).join("")}</ul>
      <h3>Qué hace</h3><ul>${cfg.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <h3>Técnicas</h3><ul>${cfg.tech.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <h3>Arquitectura</h3><ol>${cfg.arch.map((f) => `<li>${esc(f)}</li>`).join("")}</ol>
      <a class="code" href="${REPO}${app}" target="_blank" rel="noopener">Ver el código en GitHub ↗</a>
      <div id="credits"></div>
      <p class="note">HTML, CSS y JavaScript sin framework. Diseñado y programado por Wilk Works.</p>
    </aside>`;
  // Un contenedor dentro del shadow root para alternar la clase "open"
  const rootWrap = document.createElement("div");
  while (root.firstChild) rootWrap.appendChild(root.firstChild);
  root.appendChild(rootWrap);
  const set = (on) => rootWrap.classList.toggle("open", on);
  rootWrap.querySelector(".fab").onclick = () => set(true);
  rootWrap.querySelector(".x").onclick = () => set(false);
  rootWrap.querySelector(".scrim").onclick = () => set(false);
  addEventListener("keydown", (e) => e.key === "Escape" && set(false));

  // Créditos de las fotos (si la demo tiene img/creditos.json)
  fetch("img/creditos.json").then((r) => (r.ok ? r.json() : [])).then((list) => {
    if (!list.length) return;
    rootWrap.querySelector("#credits").innerHTML = `<h3>Créditos de imágenes</h3><ul class="cred">${list.map((c) => `<li>"${esc(c.title || "Foto")}" · ${esc(c.author || "Autor desconocido")} · <a href="${esc(c.license_url || "#")}" target="_blank" rel="noopener">${esc(c.license)}</a> · <a href="${esc(c.source)}" target="_blank" rel="noopener">origen</a></li>`).join("")}</ul>`;
  }).catch(() => {});
})();
