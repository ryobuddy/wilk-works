// Contenido del sitio. Edita aquí; script.js lo pinta en la página.
// Iconos: "si:<slug>" = simple-icons (https://simpleicons.org), o null para usar la inicial.
window.SITE = {
  brand: "Wilk Works",
  available: "Disponibles para nuevos proyectos",
  headline: "Construimos",
  // Modelo 3D de la portada: binding | mobius | lattice | recursion | crystal
  heroModel: "lattice",
  rotating: ["aplicaciones web", "sistemas a medida", "apps móviles", "infraestructura cloud", "soluciones TI"],
  intro:
    "Software a medida, cloud y soporte TI. Entramos en la niebla de cada problema y salimos con código claro.",

  contact: {
    whatsapp: "51976293223",
    email: "ixamaxim@gmail.com",
    location: "Lima, Perú · Remoto para todo LATAM",
    whatsappMessage: "Hola Wilk Works, quiero cotizar un proyecto.",
  },

  tech: [
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
    { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "PHP", icon: "php", color: "#777BB4" },
    { name: "Laravel", icon: "laravel", color: "#FF2D20" },
    { name: ".NET", icon: "dotnet", color: "#512BD4" },
    { name: "Flutter", icon: "flutter", color: "#02569B" },
    { name: "Kotlin", icon: "kotlin", color: "#7F52FF" },
    { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    { name: "MySQL", icon: "mysql", color: "#4479A1" },
    { name: "MongoDB", icon: "mongodb", color: "#47A248" },
    { name: "Firebase", icon: "firebase", color: "#FFCA28" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "AWS", icon: "amazonaws", color: "#FF9900" },
    { name: "Azure", icon: "microsoftazure", color: "#0078D4" },
    { name: "Google Cloud", icon: "googlecloud", color: "#4285F4" },
    { name: "Cloudflare", icon: "cloudflare", color: "#F38020" },
    { name: "Linux", icon: "linux", color: "#FCC624" },
    { name: "Git", icon: "git", color: "#F05032" },
    { name: "Figma", icon: "figma", color: "#F24E1E" },
  ],

  // Servicios: image = escena de referencia en img/, wide = ocupa dos columnas.
  services: [
    {
      icon: "</>", title: "Desarrollo web", image: "img/svc-web.webp", wide: true,
      text: "Tu web es lo primero que ve un cliente antes de escribirte. La hacemos para que cargue rápido en el celular, se entienda de un vistazo y que tú mismo puedas cambiar precios o fotos sin llamarnos.",
      examples: ["Landing pages", "Tiendas online", "Portales de clientes"],
    },
    {
      icon: "▣", title: "Apps móviles", image: "img/svc-app.webp",
      text: "Si tus clientes reservan, piden o pagan por teléfono, una app les ahorra la llamada y a ti el cuaderno. Android e iOS, conectadas a lo que ya usas.",
      examples: ["Reservas", "Delivery", "Fidelización"],
    },
    {
      icon: "⚙", title: "Sistemas a medida", image: "img/svc-sys.webp",
      text: "Para cuando el Excel ya no alcanza. Armamos el sistema según cómo trabaja tu equipo, no al revés, y no pagas módulos que nunca vas a abrir.",
      examples: ["Inventario", "Ventas", "Facturación"],
    },
    {
      icon: "☁", title: "Cloud y DevOps", image: "img/svc-cloud.webp", wide: true,
      text: "Pasamos tus servidores a la nube sin detener la operación. Copias de seguridad todos los días, actualizaciones sin sustos y un aviso antes de que algo falle, no después.",
      examples: ["AWS / Azure", "CI/CD", "Backups", "Monitoreo"],
    },
    {
      icon: "⛨", title: "Soporte TI", image: "img/svc-ti.webp",
      text: "La impresora que no imprime, el correo que rebota, el wifi que se cae a media reunión. Lo resolvemos en remoto o vamos a tu oficina.",
      examples: ["Redes", "Correo corporativo", "Mesa de ayuda"],
    },
    {
      icon: "◆", title: "Consultoría", image: "img/svc-plan.webp",
      text: "Antes de gastar en tecnología, conversemos. Revisamos qué tienes, qué te falta y qué puede esperar. Te llevas un plan por escrito con prioridades y costos.",
      examples: ["Diagnóstico", "Hoja de ruta", "Presupuesto"],
    },
  ],


  // Proyectos demo (funcionan en /demos/). Reemplázalos o añade tus trabajos reales.
  // image: ruta a una captura real (ej. "img/tienda.png"). Si está vacía se dibuja una ilustración según mock: shop | inventory | mobile | cloud.
  projects: [
    { title: "Tienda online Andina", tag: "E-commerce", text: "Catálogo, carrito y pagos con panel de pedidos.", stack: ["HTML", "JS", "Carrito"], url: "demos/tienda/", image: "img/tienda.webp", mock: "shop" },
    { title: "Gestor de inventario", tag: "Sistema interno", text: "Control de stock multi-almacén con reportes en tiempo real.", stack: ["Chart.js", "Dashboard"], url: "demos/inventario/", image: "img/inventario.webp", mock: "inventory" },
    { title: "App de reservas", tag: "Móvil", text: "Reservas y recordatorios por WhatsApp para un centro de salud.", stack: ["Mobile-first", "WhatsApp"], url: "demos/reservas/", image: "img/reservas.webp", mock: "mobile" },
    { title: "Migración a la nube", tag: "Cloud", text: "Servidores físicos a AWS con 40% menos costo mensual.", stack: ["Cloud", "Chart.js"], url: "demos/cloud/", image: "img/cloud.webp", mock: "cloud" },
  ],

  // Perfiles verificables. Solo se muestran los que tengan url: pega tu enlace y aparece.
  profiles: [
    { name: "GitHub", icon: "si:github", note: "Perfil de desarrollador", url: "https://github.com/ryobuddy" },
    { name: "LinkedIn", icon: "si:linkedin", note: "Perfil profesional", url: "" },
    { name: "Workana", icon: null, note: "Freelance LATAM", url: "" },
    { name: "Upwork", icon: "si:upwork", note: "Freelance internacional", url: "" },
    { name: "Fiverr", icon: "si:fiverr", note: "Servicios por paquete", url: "" },
    { name: "freeCodeCamp", icon: "si:freecodecamp", note: "Certificaciones gratuitas", url: "" },
    { name: "Credly", icon: "si:credly", note: "Insignias verificables", url: "" },
    { name: "Google Developer", icon: "si:google", note: "Perfil g.dev e insignias", url: "" },
    { name: "Microsoft Learn", icon: "si:microsoft", note: "Logros y certificaciones", url: "" },
    { name: "HackerRank", icon: "si:hackerrank", note: "Certificados de habilidades", url: "" },
    { name: "LeetCode", icon: "si:leetcode", note: "Resolución de problemas", url: "" },
    { name: "Stack Overflow", icon: "si:stackoverflow", note: "Reputación técnica", url: "" },
    { name: "Platzi", icon: "si:platzi", note: "Cursos y rutas", url: "" },
  ],

  // Certificaciones. Ejemplo: { title: "Responsive Web Design", issuer: "freeCodeCamp", year: 2026, url: "https://..." }
  certifications: [],

  // Líneas de la terminal. "$ " = comando, "> " = paso, "→ " = resultado.
  ritual: [
    ["$ ", "wilk init --proyecto=tu-empresa"],
    ["> ", "analizando requerimientos..."],
    ["> ", "diseñando arquitectura..."],
    ["> ", "construyendo frontend + API..."],
    ["> ", "desplegando en la nube..."],
    ["$ ", "wilk status"],
    ["→ ", "build ok · 0 errores · ¿qué construimos ahora?"],
  ],

  // Se numeran en cuenta regresiva: seq.04 → seq.01.
  process: [
    { title: "Conversamos", text: "Entendemos tu negocio y lo que necesitas resolver." },
    { title: "Proponemos", text: "Alcance, plazos y precio claros, sin letra pequeña." },
    { title: "Construimos", text: "Entregas cortas para que veas avances cada semana." },
    { title: "Acompañamos", text: "Lanzamiento, capacitación y soporte continuo." },
  ],
};
