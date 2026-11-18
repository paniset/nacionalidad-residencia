// Contador de clics sin datos personales. Reutilizable tal cual en otras webs (copiar este archivo y medir-config.mjs).
// Escucha el evento «medir» (detail = nombre del evento, p. ej. «kit-pago») y envía UN aviso con tres campos:
// {evento, web, pagina}. Sin cookies, sin identificadores, sin almacenamiento local, sin IP guardada por nosotros.
// Con la dirección vacía no hace ninguna petición. Respeta «No rastrear» (DNT / Global Privacy Control).
const PERMITIDO = /^[a-z0-9-]{1,40}$/;

export function iniciarMedicion({ url = '', web = '', doc = globalThis.document, nav = globalThis.navigator, loc = globalThis.location, enviar } = {}) {
  if (!url || !doc) return () => {};
  const mandar = enviar || ((dir, texto) => {
    if (nav && typeof nav.sendBeacon === 'function') return nav.sendBeacon(dir, texto);
    return fetch(dir, { method: 'POST', body: texto, keepalive: true, credentials: 'omit', mode: 'no-cors' }).catch(() => {});
  });
  const alEvento = (ev) => {
    if (nav && (nav.doNotTrack === '1' || nav.globalPrivacyControl === true)) return;
    const evento = String(ev.detail ?? '');
    if (!PERMITIDO.test(evento)) return;
    const pagina = loc ? String(loc.pathname || '').slice(0, 120) : '';
    try { mandar(url, JSON.stringify({ evento, web, pagina })); } catch { /* medir nunca debe romper la web */ }
  };
  doc.addEventListener('medir', alEvento);
  return () => doc.removeEventListener('medir', alEvento);
}
