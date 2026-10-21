// Íconos Lucide (https://lucide.dev, licencia ISC) para las demos.
// Escribe <i data-lucide="nombre"></i> en cualquier parte (también en HTML generado después) y se convierte en SVG.
(function () {
  const run = () => window.lucide && window.lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; if (document.querySelector("i[data-lucide]")) run(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
