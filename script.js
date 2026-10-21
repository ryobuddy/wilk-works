(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wa = (text) => `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  const SI = "https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/";
  const icon = (slug) => `<span class="si" style="--icon:url(${SI}${slug}.svg)"></span>`;
  const pad = (i) => String(i).padStart(2, "0");

  // Ilustraciones de referencia para proyectos sin captura (SVG en línea, colores de la marca)
  const svg = (inner) => `<svg viewBox="0 0 400 220" aria-hidden="true">${inner}</svg>`;
  const win = (inner) => svg(`<rect x="8" y="8" width="384" height="204" rx="10" class="m-win"/><rect x="8" y="8" width="384" height="26" rx="10" class="m-bar"/><circle cx="26" cy="21" r="4" class="m-r"/><circle cx="40" cy="21" r="4" class="m-y"/><circle cx="54" cy="21" r="4" class="m-g"/><rect x="120" y="15" width="160" height="12" rx="6" class="m-url"/>${inner}`);
  const range = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join("");
  const MOCKS = {
    shop: win(
      `<rect x="24" y="46" width="90" height="10" rx="5" class="m-a"/><rect x="330" y="44" width="46" height="16" rx="8" class="m-y"/>` +
        range(3, (k) => `<g transform="translate(${24 + k * 120} 70)" class="m-rise" style="--d:${k * 120}ms"><rect width="108" height="128" rx="8" class="m-card"/><rect x="8" y="8" width="92" height="62" rx="6" class="m-img"/><rect x="8" y="80" width="70" height="8" rx="4" class="m-l"/><rect x="8" y="94" width="50" height="8" rx="4" class="m-l2"/><rect x="8" y="110" width="40" height="10" rx="5" class="m-y"/></g>`)
    ),
    inventory: win(
      `<rect x="8" y="34" width="70" height="178" class="m-side"/>` +
        range(5, (k) => `<rect x="20" y="${50 + k * 24}" width="46" height="8" rx="4" class="${k ? "m-l2" : "m-a"}"/>`) +
        [48, 80, 60, 110, 90, 130].map((h, k) => `<rect class="m-barc" x="${96 + k * 26}" y="${150 - h * 0.8}" width="16" height="${h * 0.8}" rx="3" style="--d:${k * 80}ms"/>`).join("") +
        `<path d="M96 118 L136 98 L176 106 L216 78 L256 84" class="m-line"/>` +
        range(3, (k) => `<rect x="270" y="${50 + k * 34}" width="110" height="26" rx="6" class="m-card"/><rect x="280" y="${59 + k * 34}" width="50" height="8" rx="4" class="m-l"/><rect x="342" y="${59 + k * 34}" width="28" height="8" rx="4" class="${k === 1 ? "m-y" : "m-b"}"/>`) +
        `<rect x="96" y="164" width="284" height="34" rx="6" class="m-card"/><rect x="108" y="177" width="120" height="8" rx="4" class="m-l2"/>`
    ),
    mobile: svg(
      `<rect x="140" y="8" width="120" height="204" rx="18" class="m-win"/><rect x="180" y="16" width="40" height="6" rx="3" class="m-url"/><rect x="152" y="32" width="70" height="9" rx="4" class="m-a"/>` +
        range(20, (k) => `<rect x="${152 + (k % 5) * 20}" y="${50 + Math.floor(k / 5) * 20}" width="16" height="16" rx="4" class="${k === 12 ? "m-y" : k === 7 ? "m-b" : "m-card"}"/>`) +
        `<rect x="152" y="138" width="96" height="30" rx="8" class="m-card"/><rect x="160" y="146" width="60" height="6" rx="3" class="m-l"/><rect x="160" y="156" width="40" height="6" rx="3" class="m-l2"/>` +
        `<g class="m-float"><rect x="268" y="118" width="118" height="44" rx="12" class="m-wa"/><rect x="280" y="130" width="80" height="7" rx="3" class="m-white"/><rect x="280" y="143" width="56" height="7" rx="3" class="m-white2"/></g>` +
        `<g class="m-float" style="--d:-2s"><rect x="14" y="58" width="114" height="40" rx="12" class="m-card"/><rect x="26" y="70" width="70" height="7" rx="3" class="m-l"/><rect x="26" y="82" width="46" height="7" rx="3" class="m-y"/></g>`
    ),
    cloud: svg(
      range(3, (k) => `<g transform="translate(24 ${36 + k * 54})"><rect width="84" height="40" rx="6" class="m-card"/><circle cx="14" cy="20" r="4" class="m-g"/><rect x="26" y="12" width="46" height="6" rx="3" class="m-l"/><rect x="26" y="23" width="30" height="6" rx="3" class="m-l2"/></g><path d="M108 ${56 + k * 54} C 170 ${56 + k * 54}, 180 112, 232 112" class="m-flow"/>`) +
        `<path d="M232 146 a30 30 0 0 1 8-60 a42 42 0 0 1 80-8 a30 30 0 0 1 50 34 a28 28 0 0 1-12 34 z" class="m-cloud"/>` +
        range(3, (k) => `<rect x="${266 + k * 30}" y="104" width="22" height="22" rx="4" class="${k === 1 ? "m-y" : "m-b"}"/>`) +
        `<rect x="254" y="170" width="116" height="24" rx="12" class="m-card"/><circle cx="270" cy="182" r="4" class="m-g"/><rect x="280" y="178" width="78" height="8" rx="4" class="m-l"/>`
    ),
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Encabezado, pie y fondo compartidos por todas las páginas ----------
  const PAGE = document.body.dataset.page || "index";
  const NAV = [["index", "Inicio"], ["servicios", "Servicios"], ["soluciones", "Soluciones"], ["proyectos", "Proyectos"], ["planes", "Planes"], ["nosotros", "Nosotros"]];
  const link = (p) => (p === "index" ? "./" : `${p}.html`);
  const phone = "+" + S.contact.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
  const logo = `<a href="./" class="logo"><img class="logo-mark" src="brand/logo-mark.svg" alt="" width="46" height="30"><span>${esc(S.brand)}</span></a>`;
  document.body.insertAdjacentHTML("afterbegin", `
    <canvas id="fogfx" aria-hidden="true"></canvas>
    <div class="codefloat" id="codefloat" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>
    <div class="progress" id="progress" aria-hidden="true"></div>
    <header class="nav" id="site-nav">
      <div class="wrap nav-inner">
        ${logo}
        <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú"><span></span></button>
        <nav id="main-nav" aria-label="Principal">
          ${NAV.map(([p, t]) => `<a href="${link(p)}"${p === PAGE ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
          <a href="contacto.html" class="btn btn-sm"${PAGE === "contacto" ? ' aria-current="page"' : ""}>Contáctanos</a>
        </nav>
      </div>
    </header>`);
  document.querySelector("main").insertAdjacentHTML("afterend", `
    <footer class="site-footer">
      <div class="wrap foot-grid">
        <div class="foot-brand">${logo}<p>Páginas web, tiendas online, sistemas a medida, cloud y soporte TI para empresas.</p><p class="foot-motto">El código es la magia de nuestro mundo.</p></div>
        <div><h4>Servicios</h4><ul>${S.services.map((s) => `<li><a href="servicios.html">${esc(s.title)}</a></li>`).join("")}</ul></div>
        <div><h4>Empresa</h4><ul><li><a href="soluciones.html">Soluciones por rubro</a></li><li><a href="proyectos.html">Proyectos y demos</a></li><li><a href="planes.html">Planes</a></li><li><a href="planes.html#faq">Preguntas frecuentes</a></li><li><a href="nosotros.html">Nosotros</a></li><li><a href="privacidad.html">Privacidad</a></li></ul></div>
        <div><h4>Contacto</h4><ul><li><a href="${wa(S.contact.whatsappMessage)}" target="_blank" rel="noopener">WhatsApp ${phone}</a></li><li><a href="mailto:${esc(S.contact.email)}">${esc(S.contact.email)}</a></li><li>${esc(S.contact.location)}</li></ul></div>
      </div>
      <div class="wrap foot-bottom"><span>© ${new Date().getFullYear()} ${esc(S.brand)}</span><a href="#">Volver arriba ↑</a></div>
    </footer>
    <a class="wa-float" href="${wa(S.contact.whatsappMessage)}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><span class="si" style="--icon:url(${SI}whatsapp.svg)"></span></a>`);

  // Menú en celular
  const menuBtn = $("menu-btn"), nav = $("site-nav");
  menuBtn.onclick = () => { const open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", open); menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); };
  $("main-nav").addEventListener("click", (e) => e.target.closest("a") && nav.classList.remove("open"));

  // Banda final de llamada a la acción ([data-cta] en cada página)
  document.querySelectorAll("[data-cta]").forEach((el) => (el.outerHTML = `
    <div class="cta-band">
      <div>
        <h2>¿Listo para que la tecnología trabaje para ti?</h2>
        <p>Escríbenos y en minutos te mostramos ejemplos de tu rubro y una cotización sin compromiso.</p>
      </div>
      <div class="hero-cta">
        <a class="btn btn-glow" href="${wa(S.contact.whatsappMessage)}" target="_blank" rel="noopener">Hablar por WhatsApp <span aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href="proyectos.html">Ver demos</a>
      </div>
    </div>`));

  // ---------- Contenido: cada bloque se pinta solo si la página lo tiene ----------
  const put = (id, html) => { const el = $(id); if (el) el.innerHTML = html; return el; };
  const take = (id, list) => { const el = $(id); return el && el.dataset.limit ? list.slice(0, +el.dataset.limit) : list; };

  if ($("headline")) {
    $("available").textContent = S.available;
    $("headline").textContent = S.headline;
    $("intro").textContent = S.intro;
    $("hero-whatsapp").href = wa(S.contact.whatsappMessage);
  }
  put("badges", (S.badges || []).map((b) => `<li>${esc(b)}</li>`).join(""));

  const techItems = S.tech.map((t) => `<span class="tech" style="--c:${t.color}">${icon(t.icon)}${esc(t.name)}</span>`).join("");
  put("tech", techItems + `<span aria-hidden="true" class="dup">${techItems}</span>`);

  put("services", take("services", S.services)
    .map((s) => `<article class="card spot arcana${s.wide ? " wide" : ""}">
        ${s.image ? `<div class="svc-img"><img src="${esc(s.image)}" alt="Ejemplo de ${esc(s.title.toLowerCase())}" loading="lazy"></div>` : ""}
        <div class="svc-body">
          <h3><span class="icon" aria-hidden="true">${esc(s.icon)}</span>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <ul class="examples" aria-label="Ejemplos">${(s.examples || []).map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        </div></article>`)
    .join(""));

  put("projects", take("projects", S.projects)
    .map((p) => `<a class="card spot project" href="${esc(p.url)}"${p.url.startsWith("demos/") ? ' target="_blank" rel="noopener"' : ""}>
        <div class="shot">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : MOCKS[p.mock] || ""}</div>
        <span class="tag">${esc(p.tag)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
        <ul class="stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.url.startsWith("demos/") ? `<span class="live"><i></i>Ver demo en vivo ↗</span>` : ""}
      </a>`)
    .join(""));

  put("profiles", S.profiles
    .filter((p) => p.url)
    .map((p) => `<a class="card spot profile" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="p-icon">${p.icon && p.icon.startsWith("si:") ? icon(p.icon.slice(3)) : esc(p.name[0])}</span>
        <span><b>${esc(p.name)}</b><small>${esc(p.note)}</small></span>
        <span class="arrow" aria-hidden="true">↗</span>
      </a>`)
    .join(""));

  if (S.certifications.length && $("certs")) {
    $("certs-wrap").hidden = false;
    put("certs", S.certifications
      .map((c) => `<a class="card spot cert" href="${esc(c.url || "#")}" target="_blank" rel="noopener">
          <span class="tag">${esc(c.issuer)} · ${esc(c.year)}</span><h3>${esc(c.title)}</h3><span class="muted">Verificar ↗</span></a>`)
      .join(""));
  }

  put("industries", take("industries", S.industries || [])
    .map((r) => `<a class="card spot industry" href="${esc(r.demo)}" target="_blank" rel="noopener"><span class="ind-ic" aria-hidden="true">${r.icon}</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p><span class="live"><i></i>Ver demo ↗</span></a>`)
    .join(""));

  put("plans", (S.plans || [])
    .map((p) => `<article class="card plan${p.featured ? " featured" : ""}">
        <span class="plan-tag">${esc(p.tag)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.text)}</p>
        <div class="price">${p.price ? `<small>S/</small>${esc(p.price)}<span>/ ${esc(p.unit)}</span>` : `A cotizar<span>/ ${esc(p.unit)}</span>`}</div>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn ${p.featured ? "btn-glow" : "btn-ghost"}" target="_blank" rel="noopener" href="${wa(`Hola Wilk Works, me interesa el plan "${p.name}". ¿Me pueden cotizar?`)}">Cotizar ${esc(p.name.toLowerCase())}</a>
      </article>`)
    .join(""));

  put("faq-list", (S.faq || []).map((f) => `<details class="card"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join(""));

  put("values", (S.values || []).map((v) => `<article class="card"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join(""));

  const n = S.process.length;
  put("process", S.process.map((p, i) => `<li class="card"><span class="seq">seq.${pad(n - i)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join(""));

  if ($("c-whatsapp")) {
    $("c-whatsapp").href = wa(S.contact.whatsappMessage);
    $("c-whatsapp").textContent = phone;
    $("c-email").href = "mailto:" + S.contact.email;
    $("c-email").textContent = S.contact.email;
    $("c-location").textContent = S.contact.location;
  }
  $("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const company = f.get("company") ? ` de ${f.get("company")}` : "";
    window.open(wa(`Hola Wilk Works, soy ${f.get("name")}${company}. ${f.get("message")}`), "_blank", "noopener");
  });

  // ---------- Animaciones ----------
  // Texto rotativo
  const rot = $("rotating");
  if (!rot) {} else if (reduced) rot.textContent = S.rotating[0];
  else {
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = S.rotating[w];
      rot.textContent = word.slice(0, (c += del ? -1 : 1));
      let t = del ? 35 : 75;
      if (!del && c === word.length) (del = true), (t = 1800);
      else if (del && c === 0) (del = false), (w = (w + 1) % S.rotating.length), (t = 300);
      setTimeout(tick, t);
    })();
  }

  // Terminal del ritual: empieza a escribir cuando entra en pantalla
  const term = $("term");
  const renderLine = ([p, t]) => `<span class="p">${esc(p)}</span>${esc(t)}\n`;
  function typeRitual() {
    if (!term) return;
    if (reduced) return (term.innerHTML = S.ritual.map(renderLine).join(""));
    let li = 0, ch = 0, done = "";
    (function type() {
      if (li >= S.ritual.length) return setTimeout(() => ((li = 0), (ch = 0), (done = ""), type()), 5000);
      const [p, t] = S.ritual[li];
      ch++;
      term.innerHTML = done + `<span class="p">${esc(p)}</span>${esc(t.slice(0, ch))}`;
      if (ch >= t.length) (done += renderLine(S.ritual[li])), li++, (ch = 0), setTimeout(type, p === "$ " ? 500 : 280);
      else setTimeout(type, p === "$ " ? 55 : 20);
    })();
  }

  // Aparición escalonada al hacer scroll
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.classList.contains("terminal")) typeRitual();
        io.unobserve(en.target);
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".card, .section h2, .kicker, .terminal").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 6) * 70 + "ms";
    io.observe(el);
  });

  // Spotlight que sigue al cursor en las tarjetas
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // Barra de progreso
  addEventListener("scroll", () => {
    const h = document.documentElement;
    $("progress").style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  }, { passive: true });

  // Manifest: el código se compila en forma. Tres etapas por celda, con barrido:
  //   0 source  → líneas de código
  //   1 render  → la forma (dos anillos enlazados, raymarching) en caracteres ASCII
  //   2 manifest → la misma forma como imagen suave
  if ($("mind")) {
  const cv = $("mind"), ctx = cv.getContext("2d");
  const img = document.createElement("canvas"), ictx = img.getContext("2d");
  const label = $("mind-stage");
  const RAMP = " .,:-=+*#%@";
  const GLITCH = "01<>/{}[]#%&$";
  const SOURCE = [
    "const bind = (a, b) => link(a.essence, b.essence);",
    "// to change a thing, first learn its name",
    "function speak(name) {",
    "  const truth = decode(name);",
    "  return world.resolve(truth);",
    "}",
    "while (focus) energy.flow(source, target);",
    "let hidden = known.inverse();",
    "export const form = compile(intent);",
    "if (belief > doubt) manifest(pattern);",
  ];
  const STAGES = ["source", "render", "manifest"];
  const DPR = Math.min(devicePixelRatio || 1, 2);
  const Q = 3;
  let cellW, cellH, cols, rows, Wc, Hc, side, mx = 0, my = 0, last = 0, offs, code, idata, hits;
  // paleta de la imagen: violeta oscuro → violeta → azul claro → destello amarillo
  const pal = (s) => s > 0.88 ? [255, 216, 102] : s > 0.6 ? [150 + (s - 0.6) * 250, 175 + (s - 0.6) * 200, 255] : [55 + s * 160, 35 + s * 125, 120 + s * 225];

  function size() {
    const r = cv.getBoundingClientRect();
    Wc = r.width; Hc = r.height; side = Math.min(Wc, Hc);
    cellH = side < 420 ? 10 : 13; cellW = cellH * 0.62;
    cols = Math.floor(Wc / cellW); rows = Math.floor(Hc / cellH);
    cv.width = Wc * DPR; cv.height = Hc * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.font = `600 ${cellH}px "JetBrains Mono", monospace`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    img.width = cols * Q; img.height = rows * Q; // la imagen va a Q× la resolución de la rejilla
    idata = ictx.createImageData(cols * Q, rows * Q);
    hits = new Float32Array(cols * rows);
    // retraso de cada celda: barrido diagonal con algo de ruido
    offs = new Float32Array(cols * rows);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) offs[y * cols + x] = (x / cols) * 0.55 + (y / rows) * 0.25 + Math.random() * 0.2;
    code = Array.from({ length: rows }, (_, y) => SOURCE[y % SOURCE.length].padEnd(cols, " ").slice(0, cols));
  }

  // Modelos 3D (funciones de distancia). Se elige con SITE.heroModel o ?model= en la URL.
  //   binding → dos anillos enlazados: un vínculo entre dos cosas
  //   mobius  → cinta de una sola cara: lo conocido y lo oculto son la misma superficie
  //   lattice → esfera tallada por un patrón (giroide): el orden oculto dentro de la materia
  //   recursion → cubo fractal (Menger): un hechizo dentro de otro, como una función que se llama a sí misma
  //   crystal → octaedro con núcleo: una idea que cristaliza
  const torus = (x, y, z, R, r) => Math.hypot(Math.hypot(x, y) - R, z) - r;
  const box = (x, y, z, b) => { const qx = Math.abs(x) - b, qy = Math.abs(y) - b, qz = Math.abs(z) - b; return Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0); };
  const MODELS = {
    binding: (x, y, z) => Math.min(torus(x + 0.36, y, z, 0.52, 0.15), torus(x - 0.36, z, y, 0.52, 0.15)),
    mobius: (x, y, z) => {
      const a = Math.atan2(z, x), qx = Math.hypot(x, z) - 0.58, ca2 = Math.cos(a / 2), sa2 = Math.sin(a / 2);
      const rx = qx * ca2 - y * sa2, ry = qx * sa2 + y * ca2;
      return (Math.hypot(Math.max(Math.abs(rx) - 0.34, 0), Math.max(Math.abs(ry) - 0.06, 0)) + Math.min(Math.max(Math.abs(rx) - 0.34, Math.abs(ry) - 0.06), 0)) * 0.7;
    },
    lattice: (x, y, z) => {
      const k = 7, g = Math.sin(x * k) * Math.cos(y * k) + Math.sin(y * k) * Math.cos(z * k) + Math.sin(z * k) * Math.cos(x * k);
      return Math.max(Math.hypot(x, y, z) - 0.78, (Math.abs(g) / k - 0.035) * 0.8);
    },
    recursion: (x, y, z) => {
      let d = box(x, y, z, 0.6), s = 1;
      for (let i = 0; i < 3; i++) {
        const ax = ((((x * s + 0.6) % 1.2) + 1.2) % 1.2) - 0.6, ay = ((((y * s + 0.6) % 1.2) + 1.2) % 1.2) - 0.6, az = ((((z * s + 0.6) % 1.2) + 1.2) % 1.2) - 0.6;
        s *= 3;
        const rx = Math.abs(1.2 - 3 * Math.abs(ax)), ry = Math.abs(1.2 - 3 * Math.abs(ay)), rz = Math.abs(1.2 - 3 * Math.abs(az));
        const c = (Math.min(Math.max(rx, ry), Math.max(ry, rz), Math.max(rz, rx)) - 0.6) / s;
        d = Math.max(d, c);
      }
      return d;
    },
    crystal: (x, y, z) => {
      const oct = (Math.abs(x) + Math.abs(y * 0.8) + Math.abs(z) - 0.8) * 0.57735;
      return Math.min(Math.max(oct, -(oct + 0.07)), Math.hypot(x, y, z) - 0.2);
    },
  };
  const model = MODELS[new URLSearchParams(location.search).get("model")] || MODELS[S.heroModel] || MODELS.binding;
  let ca, sa, cb, sb;
  function sdf(x, y, z) {
    let X = x * ca - z * sa, Z = x * sa + z * ca, Y = y * cb - Z * sb;
    Z = y * sb + Z * cb;
    return model(X, Y, Z);
  }
  function shade(u, v) {
    let t = 0, x = u * 1.45, y = v * 1.45;
    for (let i = 0; i < 56; i++) {
      const d = sdf(x, y, -2 + t);
      if (d < 0.004) {
        const z = -2 + t, e = 0.004;
        let nx = sdf(x + e, y, z) - d, ny = sdf(x, y + e, z) - d, nz = sdf(x, y, z + e) - d;
        const nl = Math.hypot(nx, ny, nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        const lam = Math.max(0, -0.5 * nx - 0.6 * ny - 0.62 * nz);
        const rim = Math.pow(1 - Math.abs(nz), 3);
        return Math.min(1, 0.12 + 0.75 * lam + 0.35 * rim);
      }
      t += d;
      if (t > 4) break;
    }
    return 0;
  }

  // Línea de tiempo global: pausa, transición, pausa… (valor 0→3, donde 3 vuelve a 0)
  const HOLD = 2.6, MOVE = 1.6, CYCLE = 3 * (HOLD + MOVE);
  const FREEZE = +(new URLSearchParams(location.search).get("stage") ?? -1);
  function stageAt(t) {
    t = ((t % CYCLE) + CYCLE) % CYCLE;
    const k = Math.floor(t / (HOLD + MOVE)), r = t - k * (HOLD + MOVE);
    return k + (r < HOLD ? 0 : (r - HOLD) / MOVE);
  }

  function frame(now) {
    if (!reduced) requestAnimationFrame(frame);
    if (now - last < 33) return; // ~30 fps
    last = now;
    const t = now / 1000, a = t * 0.5 + mx * 0.8, b = 0.5 + Math.sin(t * 0.3) * 0.3 + my * 0.5;
    ca = Math.cos(a); sa = Math.sin(a); cb = Math.cos(b); sb = Math.sin(b);
    const g = FREEZE >= 0 ? FREEZE : stageAt(t);
    label.textContent = STAGES[Math.round(g) % 3];
    ctx.clearRect(0, 0, Wc, Hc);
    const px = idata.data;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
      hits[y * cols + x] = shade(((x + 0.5) * cellW - Wc / 2) / (side / 2), ((y + 0.5) * cellH - Hc / 2) / (side / 2));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const u = ((x + 0.5) * cellW - Wc / 2) / (side / 2), v = ((y + 0.5) * cellH - Hc / 2) / (side / 2);
        const s = hits[i];
        const inLens = u * u + v * v < 0.8;
        // celdas en el borde de la forma: alguna vecina toca la forma
        const near = s > 0 || hits[i - 1] > 0 || hits[i + 1] > 0 || hits[i - cols] > 0 || hits[i + cols] > 0;
        const st = FREEZE >= 0 ? FREEZE + 0.5 : (stageAt(t - offs[i] * 1.4) + 3) % 3, k = Math.floor(st), f = st - k;
        const cx = (x + 0.5) * cellW, cy = (y + 0.5) * cellH;
        // la imagen: opacidad del píxel según cuánto esté la celda en la etapa "manifest"
        const imgA = k === 2 ? (f < 0.85 ? 1 : 1 - (f - 0.85) / 0.15) : k === 1 && f > 0.85 ? (f - 0.85) / 0.15 : 0;
        for (let sy = 0; sy < Q; sy++) for (let sx = 0; sx < Q; sx++) {
          const p = ((y * Q + sy) * cols * Q + x * Q + sx) * 4;
          if (!imgA || !near) { px[p + 3] = 0; continue; }
          const ss = shade(((x + (sx + 0.5) / Q) * cellW - Wc / 2) / (side / 2), ((y + (sy + 0.5) / Q) * cellH - Hc / 2) / (side / 2));
          const c = pal(ss);
          px[p] = c[0]; px[p + 1] = c[1]; px[p + 2] = c[2]; px[p + 3] = ss > 0 ? imgA * 255 : 0;
        }
        if (f > 0.85 && k !== 2) {
          // decodificando: glifos al azar entre etapas
          if (Math.random() < 0.5 && (s > 0 || (k === 0 && inLens))) {
            ctx.fillStyle = "#f5c542";
            ctx.fillText(GLITCH[(Math.random() * GLITCH.length) | 0], cx, cy);
          }
          continue;
        }
        if (k === 0) {
          const c = code[y][x];
          if (c === " " || !inLens) continue;
          ctx.fillStyle = s > 0 ? `rgba(220,214,255,${0.45 + s * 0.55})` : "rgba(140,132,190,.35)";
          ctx.fillText(c, cx, cy);
        } else if (k === 1 && s > 0) {
          ctx.fillStyle = s > 0.8 ? "#ffd866" : s > 0.6 ? "#e4e9ff" : s > 0.42 ? "#9db4ff" : s > 0.25 ? "#b39bff" : "#7d63d9";
          ctx.fillText(RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(s * (RAMP.length - 1)))], cx, cy);
        }
      }
    }
    ictx.putImageData(idata, 0, 0);
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.filter = "blur(0.5px)";
    ctx.drawImage(img, 0, 0, cols * cellW, rows * cellH);
    ctx.restore();
  }
  size();
  addEventListener("resize", size);
  addEventListener("pointermove", (e) => {
    mx = (e.clientX / innerWidth) * 2 - 1;
    my = (e.clientY / innerHeight) * 2 - 1;
  });
  document.fonts.ready.then(() => (size(), requestAnimationFrame(frame)));
  }

  // ---------- Fondo: niebla gris en WebGL (fbm con deformación de dominio) ----------
  const fx = $("fogfx"), gl = fx.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (gl) {
    const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fs = `precision mediump float;
      uniform vec2 r; uniform float t; uniform vec2 m; uniform float sc;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
      void main(){
        vec2 uv=gl_FragCoord.xy/r; vec2 p=(gl_FragCoord.xy-.5*r)/r.y*2.2;
        p.y+=sc*.0006; p+=m*.15;
        vec2 q=vec2(fbm(p+t*.04),fbm(p+vec2(5.2,1.3)-t*.035));
        vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*.06),fbm(p+3.*q+vec2(8.3,2.8)-t*.05));
        float f=fbm(p+3.5*w);
        vec3 bg=vec3(.043,.039,.078);
        vec3 col=mix(bg,vec3(.33,.2,.62),smoothstep(.25,.75,f));
        col=mix(col,vec3(.2,.34,.8),smoothstep(.4,.9,w.y)*.7);
        col=mix(col,vec3(.55,.54,.64),smoothstep(.55,1.,f*q.x*1.6)*.22);
        col+=vec3(.96,.77,.26)*pow(smoothstep(.72,1.,f*w.x*1.5),3.)*.32;
        float md=length(uv-(m*.5+.5)); col+=vec3(.35,.25,.7)*.12/(md*6.+.4);
        col*=.55+.45*smoothstep(1.25,.2,length(uv-.5)*1.6);
        gl_FragColor=vec4(min(col*.66,vec3(.3,.27,.42)),1.);
      }`;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      const U = (k) => gl.getUniformLocation(prog, k);
      const uR = U("r"), uT = U("t"), uM = U("m"), uS = U("sc");
      let fm = [0, 0], tm = [0, 0];
      const SCALE = 0.5; // ponytail: media resolución, la niebla es borrosa y así va fluido en móviles
      const fit = () => { fx.width = innerWidth * SCALE; fx.height = innerHeight * SCALE; gl.viewport(0, 0, fx.width, fx.height); };
      fit();
      addEventListener("resize", fit);
      addEventListener("pointermove", (e) => (tm = [(e.clientX / innerWidth) * 2 - 1, 1 - (e.clientY / innerHeight) * 2]));
      const t0 = performance.now();
      (function loop(now) {
        fm = [fm[0] + (tm[0] - fm[0]) * 0.04, fm[1] + (tm[1] - fm[1]) * 0.04];
        gl.uniform2f(uR, fx.width, fx.height);
        gl.uniform1f(uT, (now - t0) / 1000);
        gl.uniform2f(uM, fm[0], fm[1]);
        gl.uniform1f(uS, scrollY);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!reduced) requestAnimationFrame(loop);
      })(t0);
      document.body.classList.add("webgl");
    }
  }

  // ---------- Fragmentos de código que flotan en la niebla ----------
  const SNIPPETS = [
    "bind(this, that);", "// every name is a key", "known.map(hidden)", "await the_unseen;",
    "if (belief) energy.flow();", "import { will } from 'self';", "return form(intent);", "link(source, target, focus)",
    "// to alter it, describe it", "const world = parse(silence);", "fn speak(name) -> Reality", "0 => ∞",
    "new Pattern(echo)", "decode(veil)", "sync(mind, matter)", "while (attention) shape();",
    "let cost = equivalent(change);", "// what is hidden still compiles", "Object.freeze(moment)", "yield understanding;",
    "observe() !== ignore()", "[mind, hand, world].reduce(make)",
  ];
  const cf = $("codefloat");
  const count = innerWidth < 760 ? 10 : 22;
  cf.innerHTML = Array.from({ length: count }, (_, i) => {
    const z = Math.random(); // 0 = lejos, 1 = cerca
    const style = [
      `left:${Math.random() * 92}%`, `top:${Math.random() * 100}%`,
      `--z:${z.toFixed(2)}`, `font-size:${(11 + z * 9).toFixed(1)}px`,
      `opacity:${(0.08 + z * 0.22).toFixed(2)}`, `filter:blur(${((1 - z) * 2.5).toFixed(1)}px)`,
      `animation-duration:${(40 + (1 - z) * 50).toFixed(0)}s`, `animation-delay:-${(Math.random() * 60).toFixed(0)}s`,
    ].join(";");
    return `<span style="${style}">${esc(SNIPPETS[i % SNIPPETS.length])}</span>`;
  }).join("");
  addEventListener("pointermove", (e) => {
    cf.style.setProperty("--px", (e.clientX / innerWidth - 0.5).toFixed(3));
    cf.style.setProperty("--py", (e.clientY / innerHeight - 0.5).toFixed(3));
  });
})();
