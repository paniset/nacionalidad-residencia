// Interfaz del comprobador, la lista de documentos y el botón del kit. Sin red: solo localStorage.
import DATOS from './datos.mjs';
import MEDIR from './medir-config.mjs';
import { iniciarMedicion } from './medir.mjs';
import { CLAVE, comprobar, documentos, leerTexto, viaPorPais, condiciones } from './motor.mjs';

const $ = id => document.getElementById(id);

function hoyISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLarga = iso => { const [a, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${a}`; };

const memoria = {
  leer() { try { return leerTexto(localStorage.getItem(CLAVE), DATOS); } catch { return leerTexto(null, DATOS); } },
  guardar(v) { try { localStorage.setItem(CLAVE, JSON.stringify(v)); return true; } catch { return false; } },
  borrar() { try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ } },
};

function el(tag, attrs = {}, ...hijos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'class') n.className = v; else n.setAttribute(k, v === true ? '' : String(v));
  }
  for (const h of hijos) if (h != null && h !== false) n.append(h instanceof Node ? h : document.createTextNode(String(h)));
  return n;
}

function iniciarApp(raiz) {
  raiz.classList.add('js');
  const f = { pais: $('pais'), via: $('via'), inicio: $('inicio'), boda: $('boda'), menor: $('menor'), capacidad: $('capacidad') };
  const supuestos = $('supuestos'), cajaBoda = $('caja-boda'), resultado = $('resultado'), lista = $('lista'), ul = $('documentos');
  const hoy = hoyISO();
  f.inicio.max = hoy; f.boda.max = hoy;
  let estado = memoria.leer();
  // La página de un país o de una vía fija ese valor; el resto se conserva de lo guardado.
  if (raiz.dataset.pais && estado.pais !== raiz.dataset.pais) { estado.pais = raiz.dataset.pais; estado.via = ''; estado.supuesto = ''; estado.boda = ''; }
  if (raiz.dataset.via && estado.via !== raiz.dataset.via) { estado.via = raiz.dataset.via; estado.supuesto = ''; estado.boda = ''; }
  if (!estado.via && estado.pais) estado.via = viaPorPais(DATOS, estado.pais);

  const leerForm = () => {
    const sup = raiz.querySelector('input[name="supuesto"]:checked');
    return { ...estado, pais: f.pais.value, via: f.via.value, supuesto: sup ? sup.value : '', inicio: f.inicio.value, boda: f.boda.value,
      menor: f.menor.checked, capacidad: f.capacidad.checked };
  };
  const guardar = () => {
    const ok = memoria.guardar(estado);
    $('guardado').textContent = ok ? 'Se guarda solo en este navegador; no se envía nada.' : 'Este navegador no permite guardar: imprime la lista antes de cerrar.';
  };
  const visibilidad = () => {
    const unAno = f.via.value === 'un-ano';
    supuestos.hidden = !unAno;
    const sup = raiz.querySelector('input[name="supuesto"]:checked');
    cajaBoda.hidden = !(unAno && sup && sup.value === 'casado');
  };

  function pintarLista() {
    if (!estado.pais && !estado.via) { lista.hidden = true; return; }
    const docs = documentos(estado, DATOS);
    const marcados = new Set(estado.marcados);
    ul.replaceChildren(...docs.map(d => {
      const fuente = DATOS.fuentes[d.fuente];
      const casilla = el('input', { type: 'checkbox', id: `doc-${d.id}`, 'aria-describedby': `det-${d.id}` });
      casilla.checked = marcados.has(d.id);
      const li = el('li', { class: marcados.has(d.id) ? 'hecho' : '' },
        el('label', { for: `doc-${d.id}` }, casilla, el('span', { class: 'tit' }, d.texto)),
        el('div', { id: `det-${d.id}` }, d.detalle ? el('span', { class: 'det' }, d.detalle) : null,
          el('span', { class: 'det' }, 'Fuente: ', el('a', { href: fuente.url, rel: 'noopener' }, fuente.titulo))));
      casilla.addEventListener('change', () => {
        const s = new Set(estado.marcados);
        if (casilla.checked) s.add(d.id); else s.delete(d.id);
        estado.marcados = [...s];
        li.className = casilla.checked ? 'hecho' : '';
        progreso(docs);
        guardar();
      });
      return li;
    }));
    progreso(docs);
    lista.hidden = false;
  }
  function progreso(docs) {
    const hechos = docs.filter(d => estado.marcados.includes(d.id)).length;
    const { deleExento, centros } = condiciones(estado, DATOS);
    const nota = centros ? ' Al ser menor o persona con capacidad modificada, se aportan certificados de centros en lugar de DELE y CCSE.'
      : (deleExento ? ' Estás exento del DELE A2 por tu nacionalidad; la CCSE sí es obligatoria.' : '');
    $('progreso').textContent = `Tienes ${hechos} de ${docs.length} documentos.${nota}`;
  }

  function pintarResultado(r) {
    if (r.error) { resultado.replaceChildren(el('p', { class: 'avisos' }, r.error)); return; }
    const caja = el('div', { class: `resultado ${r.yaPuede ? 'si' : 'no'}` });
    const unidad = r.anios === 1 ? 'año' : 'años';
    caja.append(el('p', { class: 'grande' }, r.yaPuede ? `Ya cumples el plazo de ${r.anios} ${unidad} desde el ${fechaLarga(r.fecha)}.`
      : `Podrás presentarla a partir del ${fechaLarga(r.fecha)} (${r.faltan === 1 ? 'falta 1 día' : `faltan ${r.faltan} días`}).`));
    if (r.faltan === 0) caja.append(el('p', {}, 'Hoy se cumple justo el plazo: por prudencia, preséntala a partir de mañana.'));
    if (r.base === 'boda') caja.append(el('p', {}, 'La fecha la marca el primer año de matrimonio, que se cumple después que el año de residencia.'));
    caja.append(el('p', { class: 'mini' }, 'Cálculo de fecha a fecha. Solo cuenta si tu residencia ha sido legal, continuada y sigue vigente al presentar; además se exigen buena conducta cívica e integración. Información, no asesoramiento jurídico.'));
    if (r.via.nota) caja.append(el('p', { class: 'mini' }, r.via.nota));
    resultado.replaceChildren(caja);
  }

  // Rellenar el formulario con el estado.
  f.pais.value = estado.pais; f.via.value = estado.via; f.inicio.value = estado.inicio; f.boda.value = estado.boda;
  f.menor.checked = estado.menor; f.capacidad.checked = estado.capacidad;
  if (estado.supuesto) { const r = raiz.querySelector(`input[name="supuesto"][value="${estado.supuesto}"]`); if (r) r.checked = true; }
  visibilidad();
  pintarLista();
  if (estado.inicio && estado.via) pintarResultado(comprobar({ ...estado, hoy }, DATOS));

  f.pais.addEventListener('change', () => { const v = viaPorPais(DATOS, f.pais.value); if (v && f.via.value !== 'refugiado' && f.via.value !== 'un-ano') f.via.value = v; });
  $('comprobador').addEventListener('change', () => {
    visibilidad(); estado = leerForm(); guardar(); pintarLista();
    // Un resultado a la vista no puede quedar desfasado respecto al formulario.
    if (resultado.childElementCount) pintarResultado(comprobar({ ...estado, hoy }, DATOS));
  });
  $('comprobador').addEventListener('submit', ev => {
    ev.preventDefault();
    estado = leerForm(); guardar(); pintarLista();
    pintarResultado(comprobar({ ...estado, hoy }, DATOS));
  });
  $('imprimir').addEventListener('click', () => {
    document.body.classList.add('solo-lista');
    window.addEventListener('afterprint', () => document.body.classList.remove('solo-lista'), { once: true });
    window.print();
  });
  $('borrar').addEventListener('click', () => {
    memoria.borrar();
    estado = leerTexto(null, DATOS);
    $('comprobador').reset();
    visibilidad();
    resultado.replaceChildren();
    lista.hidden = true;
    $('guardado').textContent = 'Datos borrados de este navegador.';
  });
}

// Botón del kit: no cobra ni recoge datos. Lanza el evento «medir», que medir.mjs solo envía si medir-config.mjs tiene dirección.
function iniciarKit(boton) {
  const msg = $('kit-msg');
  boton.addEventListener('click', () => {
    msg.textContent = 'Gracias por el interés. El kit todavía no está a la venta y esta web no guarda datos de contacto, así que no podemos avisarte: vuelve más adelante.';
    boton.setAttribute('aria-disabled', 'true');
    document.dispatchEvent(new CustomEvent('medir', { detail: boton.dataset.medir }));
  });
}

iniciarMedicion(MEDIR);
const raiz = $('app');
if (raiz) iniciarApp(raiz);
const kit = $('kit');
if (kit) iniciarKit(kit);
