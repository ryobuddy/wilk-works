"""Genera las páginas del sitio con el mismo <head>.
Uso: python _scenes/build-pages.py   (desde la carpeta wilkworks)
El encabezado, el pie, el fondo y la banda final los inserta script.js en cada página.
"""
import os

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
BASE = "https://wilk-works.vercel.app"

HEAD = """<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{url}">
  <meta name="theme-color" content="#0b0a14">
  <link rel="icon" href="/brand/icon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wilk Works">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{base}/brand/og.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Wilk Works: el código es la magia de nuestro mundo">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{base}/brand/og.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"ProfessionalService","name":"Wilk Works","url":"{base}/","logo":"{base}/brand/icon-512.png","image":"{base}/brand/og.jpg","telephone":"+51976293223","address":{{"@type":"PostalAddress","addressLocality":"Lima","addressCountry":"PE"}},"areaServed":["PE","Latinoamérica"],"description":"Páginas web, tiendas online, sistemas a medida, cloud y soporte TI para empresas."}}
  </script>
</head>
<body data-page="{page}">
  <main>
{body}
  </main>

  <script src="data.js"></script>
  <script src="script.js"></script>
</body>
</html>
"""

def page_head(kicker, h1, sub):
    return f"""    <section class="wrap page-head">
      <p class="kicker">// {kicker}</p>
      <h1>{h1}</h1>
      <p class="section-sub">{sub}</p>
    </section>"""

CTA = '    <section class="wrap section"><div data-cta></div></section>'

FAQ = """    <section id="faq" class="wrap section">
      <p class="kicker">// preguntas</p>
      <h2>Preguntas frecuentes</h2>
      <div class="faq" id="faq-list"></div>
    </section>"""

PROCESS = """    <section id="proceso" class="wrap section">
      <p class="kicker">// proceso</p>
      <h2>Cómo trabajamos</h2>
      <div class="terminal">
        <div class="term-bar"><i></i><i></i><i></i><span>wilkworks — zsh</span></div>
        <pre class="term-body"><code id="term"></code><span class="caret">▋</span></pre>
      </div>
      <ol class="process" id="process"></ol>
    </section>"""

PAGES = {
    "index": dict(
        title="Wilk Works · Páginas web, tiendas online y software a medida en Perú",
        desc="Páginas web, tiendas online con Yape y Plin, sistemas con facturación SUNAT, cloud y soporte TI para empresas en Perú. Mira demos en vivo y cotiza por WhatsApp.",
        body="""    <section class="hero wrap">
      <div class="hero-copy">
        <p class="pill"><span class="dot"></span><span id="available"></span></p>
        <h1><span id="headline"></span><br><span class="rotator"><span id="rotating"></span><span class="caret">|</span></span></h1>
        <p class="lead" id="intro"></p>
        <div class="hero-cta">
          <a class="btn btn-glow" id="hero-whatsapp" target="_blank" rel="noopener">Escríbenos por WhatsApp <span aria-hidden="true">→</span></a>
          <a class="btn btn-ghost" href="proyectos.html">Ver demos en vivo</a>
        </div>
        <ul class="badges" id="badges" aria-label="Lo que incluimos"></ul>
      </div>
      <div class="mind" aria-hidden="true">
        <canvas id="mind"></canvas>
        <span class="mind-label">// compile(intent) → <b id="mind-stage">source</b></span>
      </div>
    </section>

    <section class="marquee" aria-label="Tecnologías">
      <div class="marquee-track" id="tech"></div>
    </section>

    <section class="wrap section">
      <p class="kicker">// servicios</p>
      <div class="sec-head"><h2>Lo que hacemos por tu empresa</h2><a class="more" href="servicios.html">Ver todos los servicios →</a></div>
      <div class="bento" id="services" data-limit="3"></div>
    </section>

    <section class="wrap section">
      <p class="kicker">// demos</p>
      <div class="sec-head"><h2>Pruébalo antes de contratar</h2><a class="more" href="proyectos.html">Ver todos los proyectos →</a></div>
      <div class="grid grid-2" id="projects" data-limit="2"></div>
    </section>

    <section class="wrap section">
      <p class="kicker">// rubros</p>
      <div class="sec-head"><h2>Hecho para tu tipo de negocio</h2><a class="more" href="soluciones.html">Ver soluciones por rubro →</a></div>
      <div class="grid grid-3" id="industries" data-limit="3"></div>
    </section>

""" + CTA,
    ),
    "servicios": dict(
        title="Servicios · Wilk Works: desarrollo web, apps, sistemas, cloud y soporte TI",
        desc="Desarrollo web, apps móviles, sistemas a medida, migración a la nube, soporte TI y consultoría para empresas en Perú.",
        body=page_head("servicios", "Lo que hacemos por tu empresa", "Un solo equipo para tu web, tus sistemas, tu nube y el soporte del día a día.")
        + """
    <section class="wrap section section-tight">
      <div class="bento" id="services"></div>
    </section>

""" + PROCESS + "\n\n" + CTA,
    ),
    "soluciones": dict(
        title="Soluciones por rubro · Wilk Works",
        desc="Software y páginas web para tiendas, ferreterías, clínicas, veterinarias, hoteles y empresas en Perú, con demos en vivo.",
        body=page_head("soluciones", "Soluciones para tu tipo de negocio", "Cada rubro tiene sus propios dolores de cabeza. Estos son algunos que ya resolvimos, con una demo que puedes probar.")
        + """
    <section class="wrap section section-tight">
      <div class="grid grid-3" id="industries"></div>
    </section>

""" + CTA,
    ),
    "proyectos": dict(
        title="Proyectos y demos en vivo · Wilk Works",
        desc="Prueba nuestras demos funcionales: tienda online, gestor de inventario, app de reservas y panel de migración a la nube.",
        body=page_head("proyectos", "Proyectos y demos en vivo", "Siete demos funcionales. No te pedimos que nos creas: abre cada una y pruébala tú mismo.")
        + """
    <section class="wrap section section-tight">
      <div class="filters" id="project-filters" role="toolbar" aria-label="Filtrar proyectos"></div>
      <div class="grid grid-2" id="projects"></div>
    </section>

    <section id="perfiles" class="wrap section">
      <p class="kicker">// perfiles</p>
      <h2>Perfiles verificables</h2>
      <p class="section-sub">Nuestro historial, a la vista en plataformas públicas.</p>
      <div class="profiles" id="profiles"></div>
      <div id="certs-wrap" hidden>
        <h3 class="sub-title">Certificaciones</h3>
        <div class="grid grid-3" id="certs"></div>
      </div>
    </section>

""" + CTA,
    ),
    "planes": dict(
        title="Planes y precios · Wilk Works",
        desc="Planes para web corporativa, tienda online y sistema a medida. Sin mensualidades obligatorias. Cotiza por WhatsApp.",
        body=page_head("planes", "Precios claros, sin letra pequeña", "Sin mensualidades obligatorias. Elige un punto de partida y lo ajustamos a tu negocio.")
        + """
    <section class="wrap section section-tight">
      <div class="plans" id="plans"></div>
    </section>

""" + FAQ + "\n\n" + CTA,
    ),
    "nosotros": dict(
        title="Nosotros · Wilk Works",
        desc="Somos un equipo pequeño de desarrollo y TI en Lima. Creemos que el código es la magia de nuestro mundo.",
        body=page_head("nosotros", "El código es la magia de nuestro mundo", "Somos un equipo pequeño en Lima que convierte problemas del día a día en software que funciona.")
        + """
    <section class="wrap section section-tight about">
      <div class="about-copy">
        <p>Escribir algo con precisión hace que exista. Así vemos nuestro trabajo: escuchamos cómo opera tu negocio, lo describimos en código y el resultado es una herramienta real que ahorra horas, evita errores y te deja crecer.</p>
        <p>Trabajamos con pymes que no tienen un área de sistemas. Por eso hablamos claro, damos fechas por escrito y entregamos todo a tu nombre: el dominio, el código y los datos son tuyos.</p>
      </div>
      <img class="about-logo" src="brand/logo.svg" alt="Logo de Wilk Works" width="420" height="420">
    </section>

    <section class="wrap section">
      <p class="kicker">// principios</p>
      <h2>Cómo pensamos</h2>
      <div class="grid grid-2" id="values"></div>
    </section>

""" + PROCESS + "\n\n" + CTA,
    ),
    "contacto": dict(
        title="Contacto · Wilk Works",
        desc="Escríbenos por WhatsApp o correo. Te respondemos en menos de 24 horas con una cotización sin compromiso.",
        body=page_head("contacto", "Hablemos de tu proyecto", "Cuéntanos qué necesitas y te respondemos en menos de 24 horas.")
        + """
    <section id="contacto" class="wrap section section-tight">
      <div class="contact card">
        <div>
          <ul class="contact-list">
            <li><span>WhatsApp</span><a id="c-whatsapp" target="_blank" rel="noopener"></a></li>
            <li><span>Email</span><a id="c-email"></a></li>
            <li><span>Ubicación</span><b id="c-location"></b></li>
          </ul>
        </div>
        <form id="contact-form" class="form">
          <label>Nombre<input name="name" required autocomplete="name"></label>
          <label>Empresa<input name="company" autocomplete="organization"></label>
          <label>¿Qué necesitas?<textarea name="message" rows="4" required></textarea></label>
          <button class="btn btn-glow" type="submit">Enviar por WhatsApp <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>

""" + FAQ,
    ),
    "privacidad": dict(
        title="Política de privacidad · Wilk Works",
        desc="Cómo trata Wilk Works los datos que compartes con nosotros.",
        body=page_head("privacidad", "Política de privacidad", "Última actualización: octubre de 2026.")
        + """
    <section class="wrap section section-tight legal">
      <h2>Qué datos recibimos</h2>
      <p>Este sitio no usa cookies de seguimiento ni herramientas de analítica. Solo recibimos los datos que tú decides enviarnos: tu nombre, empresa y mensaje cuando nos escribes por WhatsApp o por correo.</p>
      <h2>Para qué los usamos</h2>
      <p>Para responder tu consulta, preparar una cotización y, si trabajamos juntos, coordinar el proyecto. No vendemos ni compartimos tus datos con terceros con fines comerciales.</p>
      <h2>Demos</h2>
      <p>Las demos guardan sus datos de prueba solo en tu navegador (almacenamiento local). No llegan a nuestros servidores y puedes borrarlos limpiando los datos del sitio.</p>
      <h2>Tus derechos</h2>
      <p>Puedes pedirnos en cualquier momento que corrijamos o eliminemos tus datos escribiendo a nuestro correo de contacto, conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú.</p>
    </section>
""",
    ),
}

for name, p in PAGES.items():
    url = BASE + "/" + ("" if name == "index" else name)
    html = HEAD.format(title=p["title"], desc=p["desc"], url=url, base=BASE, page=name, body=p["body"])
    open(f"{name}.html", "w", encoding="utf-8").write(html)
    print("ok", name)
