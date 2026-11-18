// Lógica pura del comprobador y de la lista de documentos (sin DOM, sin red). Probada en tests/motor.test.mjs.

const RE_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Devuelve [año, mes, día] si la cadena es una fecha ISO real; null si no. */
export function partesFecha(iso) {
  const m = RE_FECHA.exec(String(iso || ''));
  if (!m) return null;
  const [a, mes, d] = m.slice(1).map(Number);
  if (mes < 1 || mes > 12 || d < 1 || d > diasDelMes(a, mes)) return null;
  return [a, mes, d];
}

export function diasDelMes(a, mes) {
  return new Date(Date.UTC(a, mes, 0)).getUTCDate();
}

const iso = (a, mes, d) => `${String(a).padStart(4, '0')}-${String(mes).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/**
 * Suma años «de fecha a fecha» (Código Civil, art. 5.1): si el mes del vencimiento no tiene
 * el día equivalente (29 de febrero), el plazo termina el último día de ese mes.
 */
export function sumarAnios(fecha, n) {
  const p = partesFecha(fecha);
  if (!p || !Number.isInteger(n)) throw new Error('Fecha o número de años no válidos');
  const [a, mes, d] = p;
  return iso(a + n, mes, Math.min(d, diasDelMes(a + n, mes)));
}

/** Días naturales de una fecha a otra (positivo si «hasta» es posterior). */
export function diasEntre(desde, hasta) {
  const a = partesFecha(desde), b = partesFecha(hasta);
  if (!a || !b) throw new Error('Fecha no válida');
  return Math.round((Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) / 86400000);
}

/** Valida una fecha introducida por el usuario: formato, no futura y no absurda. */
export function errorFecha(fecha, hoy, nombre = 'la fecha') {
  if (!fecha) return `Indica ${nombre}.`;
  const p = partesFecha(fecha);
  if (!p) return `Revisa ${nombre}: no es una fecha válida.`;
  if (p[0] < 1940) return `Revisa ${nombre}: el año parece incorrecto.`;
  if (diasEntre(fecha, hoy) < 0) return `${nombre[0].toUpperCase()}${nombre.slice(1)} no puede ser posterior a hoy.`;
  return null;
}

export function buscarVia(datos, id) {
  return datos.vias.find(v => v.id === id) || null;
}

export function buscarPais(datos, id) {
  return datos.paises.find(p => p.id === id) || null;
}

/** Vía que corresponde por defecto a un país (2 años si está en la lista del art. 22.1 CC). */
export function viaPorPais(datos, paisId) {
  const p = buscarPais(datos, paisId);
  if (!p) return '';
  return p.dos_anios ? 'iberoamericano' : 'general';
}

/**
 * Calcula desde qué día se cumple el tiempo de residencia exigido.
 * entrada: {via, supuesto, inicio, boda, hoy}
 * Devuelve {error} o {anios, fecha, faltan, yaPuede, avisos, base}.
 */
export function comprobar(entrada, datos) {
  const { via: viaId, supuesto: supId, inicio, boda, hoy } = entrada;
  const via = buscarVia(datos, viaId);
  if (!via) return { error: 'Elige la vía que te corresponde.' };
  if (!partesFecha(hoy)) return { error: 'Fecha de hoy no válida.' };
  let supuesto = null;
  if (via.supuestos) {
    supuesto = via.supuestos.find(s => s.id === supId);
    if (!supuesto) return { error: 'Elige en qué caso del año de residencia estás.' };
  }
  const err = errorFecha(inicio, hoy, 'la fecha de inicio de tu residencia legal');
  if (err) return { error: err };
  const anios = via.anios;
  let fecha = sumarAnios(inicio, anios);
  let base = 'residencia';
  const avisos = [];
  if (supuesto && supuesto.requiere_boda) {
    const errB = errorFecha(boda, hoy, 'la fecha de la boda');
    if (errB) return { error: errB };
    const porBoda = sumarAnios(boda, supuesto.requiere_boda);
    if (diasEntre(fecha, porBoda) > 0) { fecha = porBoda; base = 'boda'; }
  }
  const faltan = diasEntre(hoy, fecha);
  return { anios, fecha, faltan, yaPuede: faltan <= 0, base, avisos, via, supuesto };
}

/**
 * Perfil para la lista de documentos: {via, supuesto, pais, menor, ccseExento, deleExento}.
 * Cada documento de datos.documentos lleva «cuando»: lista de condiciones que deben cumplirse todas.
 */
export function condiciones(perfil, datos) {
  const pais = buscarPais(datos, perfil.pais);
  // Sin país elegido se trata como «otro»: mejor avisar de más que dar por completa una lista a la que falta algo.
  const otro = !pais;
  const via = buscarVia(datos, perfil.via);
  const supuesto = via && via.supuestos ? via.supuestos.find(s => s.id === perfil.supuesto) : null;
  const c = new Set(['siempre']);
  if (pais) {
    if (pais.exento_ue) c.add('exento_ue');
    else if (pais.apostilla === 'sin-verificar') c.add('apostilla_desconocida');
    else c.add(pais.apostilla ? 'apostilla' : 'legalizacion');
    if (!pais.idioma_es) c.add('traduccion');
  }
  if (otro) { c.add('otro'); c.add('apostilla_desconocida'); c.add('traduccion'); }
  const centros = Boolean(perfil.menor || perfil.capacidad);
  // RD 1004/2015, art. 6.5: exención del DELE por lista cerrada de nacionalidades; art. 6.6: centros en lugar de diplomas.
  const deleExento = centros || Boolean(pais && pais.dele_exento);
  if (!centros && pais && !pais.dele_exento) c.add('dele');
  if (!centros) c.add('ccse');
  if (centros) c.add('centros');
  if (perfil.menor) c.add('menor');
  if (perfil.capacidad) c.add('capacidad');
  if (via) c.add(`via:${via.id}`);
  if (supuesto) c.add(`supuesto:${supuesto.id}`);
  return { set: c, pais, via, supuesto, deleExento, centros };
}

const cumple = (set, x) => (x.startsWith('!') ? !set.has(x.slice(1)) : set.has(x));

export function documentos(perfil, datos) {
  const { set } = condiciones(perfil, datos);
  return datos.documentos.filter(d => d.cuando.every(x => cumple(set, x)));
}

// ---------- Estado guardado en el navegador ----------

export const CLAVE = 'nacionalidad-residencia:v1';

/** Normaliza lo leído de localStorage: descarta campos desconocidos o mal formados. */
export function limpiarEstado(bruto, datos) {
  const e = { via: '', supuesto: '', pais: '', inicio: '', boda: '', menor: false, capacidad: false, marcados: [] };
  if (!bruto || typeof bruto !== 'object') return e;
  if (buscarVia(datos, bruto.via)) e.via = bruto.via;
  const via = buscarVia(datos, e.via);
  if (via && via.supuestos && via.supuestos.some(s => s.id === bruto.supuesto)) e.supuesto = bruto.supuesto;
  if (buscarPais(datos, bruto.pais) || bruto.pais === 'otro') e.pais = bruto.pais;
  if (partesFecha(bruto.inicio)) e.inicio = bruto.inicio;
  if (partesFecha(bruto.boda)) e.boda = bruto.boda;
  e.menor = bruto.menor === true;
  e.capacidad = bruto.capacidad === true;
  const ids = new Set(datos.documentos.map(d => d.id));
  if (Array.isArray(bruto.marcados)) e.marcados = [...new Set(bruto.marcados.filter(x => ids.has(x)))];
  return e;
}

export function leerTexto(texto, datos) {
  try { return limpiarEstado(JSON.parse(texto), datos); } catch { return limpiarEstado(null, datos); }
}
