// Generado por generar.py desde datos/nacionalidad.json. No editar a mano.
export default {
"consultado": "2026-11-14",
"vias": [
{
"id": "general",
"anios": 10,
"slug": "nacionalidad-espanola-10-anos-residencia",
"nombre": "10 años (régimen general)",
"quien": "Es el plazo general: se aplica a quien no está en ninguno de los casos con plazo reducido.",
"fuente": "cc"
},
{
"id": "refugiado",
"anios": 5,
"slug": "nacionalidad-espanola-refugiados-5-anos",
"nombre": "5 años (refugiados)",
"quien": "Personas que han obtenido la condición de refugiado.",
"fuente": "cc",
"nota": "El reglamento no pide a los refugiados el certificado de nacimiento, el pasaporte ni los antecedentes penales del país de origen (RD 1004/2015, art. 5). Qué fecha cuenta como inicio de la residencia depende de tu expediente: compruébalo en tu resolución."
},
{
"id": "iberoamericano",
"anios": 2,
"slug": "nacionalidad-espanola-2-anos-iberoamericanos",
"nombre": "2 años (países iberoamericanos y otros)",
"quien": "Nacionales de origen de países iberoamericanos, Andorra, Filipinas, Guinea Ecuatorial o Portugal, y personas de origen sefardí.",
"fuente": "cc"
},
{
"id": "un-ano",
"anios": 1,
"slug": "nacionalidad-espanola-1-ano-residencia",
"nombre": "1 año (casos especiales)",
"quien": "Seis casos del artículo 22.2 del Código Civil.",
"fuente": "cc",
"supuestos": [
{
"id": "nacido-espana",
"texto": "Nací en territorio español."
},
{
"id": "no-opto",
"texto": "No ejercí a tiempo el derecho a optar por la nacionalidad española."
},
{
"id": "tutela",
"texto": "Estuve dos años seguidos bajo tutela, curatela con representación plena, guarda o acogimiento de un ciudadano o una institución española."
},
{
"id": "casado",
"texto": "Llevo un año casado o casada con una persona española, sin separación legal ni de hecho.",
"requiere_boda": 1
},
{
"id": "viudo",
"texto": "Soy viudo o viuda de una persona española y no estábamos separados al fallecer."
},
{
"id": "descendiente",
"texto": "Nací fuera de España y mi padre, madre, abuelo o abuela eran originariamente españoles."
}
]
}
],
"documentos": [
{
"id": "solicitud",
"cuando": [
"siempre"
],
"texto": "Solicitud en el modelo oficial",
"detalle": "Se rellena en la sede electrónica del Ministerio de Justicia y se firma allí.",
"fuente": "orden"
},
{
"id": "tasa",
"cuando": [
"siempre"
],
"texto": "Justificante de la tasa 790-026 pagada",
"detalle": "A tu nombre y antes de presentar. El impreso lleva un código único: no lo fotocopies para otra persona.",
"fuente": "mj"
},
{
"id": "tarjeta",
"cuando": [
"siempre"
],
"texto": "Tarjeta de extranjero (TIE) o certificado de registro de ciudadano de la UE",
"detalle": "",
"fuente": "mj"
},
{
"id": "pasaporte",
"cuando": [
"!via:refugiado"
],
"texto": "Pasaporte completo y en vigor, con copia de todas las páginas",
"detalle": "",
"fuente": "mj"
},
{
"id": "nacimiento",
"cuando": [
"!via:refugiado"
],
"texto": "Certificado de nacimiento de tu país, legalizado o apostillado y traducido si no está en español",
"detalle": "",
"fuente": "rd"
},
{
"id": "antecedentes",
"cuando": [
"!menor",
"!capacidad",
"!via:refugiado"
],
"texto": "Certificado de antecedentes penales de tu país de origen, legalizado o apostillado y traducido si no está en español",
"detalle": "Lo piden a los mayores de edad, salvo refugiados, apátridas y personas con capacidad modificada judicialmente. Si no indica plazo de validez, se presume que vale seis meses desde que se expide (Orden JUS/1625/2016). También se admite el certificado consular de conducta si se expide tras consultar a las autoridades de tu país.",
"fuente": "rd"
},
{
"id": "apostilla",
"cuando": [
"apostilla",
"!via:refugiado"
],
"texto": "Apostilla de La Haya en el certificado de nacimiento y en el de antecedentes",
"detalle": "Tu país aplica el Convenio de la Apostilla: la apostilla sustituye a la legalización.",
"fuente": "legal"
},
{
"id": "legalizacion",
"cuando": [
"legalizacion",
"!via:refugiado"
],
"texto": "Legalización diplomática de los certificados",
"detalle": "Tu país no aplica la apostilla: primero lo legaliza el Ministerio de Exteriores de tu país y después la representación diplomática española.",
"fuente": "legal"
},
{
"id": "apostilla-otro",
"cuando": [
"apostilla_desconocida",
"!via:refugiado"
],
"texto": "Apostilla o legalización de los certificados, según tu país",
"detalle": "Busca tu país en la tabla oficial del Convenio de la Apostilla: si es parte, basta la apostilla; si no, hay que legalizar por vía diplomática.",
"fuente": "hcch"
},
{
"id": "traduccion",
"cuando": [
"traduccion"
],
"texto": "Traducción jurada al español de los documentos que no estén en español",
"detalle": "Las traducciones de traductores jurados nombrados por el Ministerio de Asuntos Exteriores valen en España por sí mismas.",
"fuente": "jurados"
},
{
"id": "dele",
"cuando": [
"dele"
],
"texto": "Diploma DELE A2 o superior del Instituto Cervantes",
"detalle": "O autoriza en la solicitud que el Ministerio lo consulte.",
"fuente": "rd"
},
{
"id": "dele-otro",
"cuando": [
"otro"
],
"texto": "Comprueba si estás exento del DELE A2",
"detalle": "Solo están exentos los nacionales de los países de la lista del artículo 6.5 del Reglamento y quien ya tiene un DELE A2 o superior.",
"fuente": "rd"
},
{
"id": "ccse",
"cuando": [
"ccse"
],
"texto": "Certificado de la prueba CCSE del Instituto Cervantes",
"detalle": "Es obligatoria también para los nacionales de países hispanohablantes. O autoriza en la solicitud que el Ministerio lo consulte.",
"fuente": "rd"
},
{
"id": "centros",
"cuando": [
"centros"
],
"texto": "Certificados de los centros de enseñanza, formación, residencia o atención en los que haya estado la persona",
"detalle": "En menores y personas con capacidad modificada, el representante legal aporta estos certificados en lugar de los diplomas DELE y CCSE.",
"fuente": "rd"
},
{
"id": "representante",
"cuando": [
"centros"
],
"texto": "Documentos de la representación legal",
"detalle": "Acreditación de quien representa a la persona (y, según la edad o el caso, autorización del encargado del Registro Civil o resolución judicial) y documento de identidad del representante.",
"fuente": "rd"
},
{
"id": "matrimonio",
"cuando": [
"supuesto:casado"
],
"texto": "Certificado de convivencia o empadronamiento conjunto con tu cónyuge",
"detalle": "",
"fuente": "mj"
},
{
"id": "supuesto",
"cuando": [
"via:un-ano"
],
"texto": "Documentos que prueben el caso del año de residencia en el que estás",
"detalle": "El reglamento pide documentación adicional según el supuesto (nacimiento en España, matrimonio, viudedad, ascendencia española…).",
"fuente": "rd"
},
{
"id": "refugio",
"cuando": [
"via:refugiado"
],
"texto": "Certificado de tu condición de refugiado",
"detalle": "Vale seis meses desde que se expide.",
"fuente": "orden"
}
],
"fuentes": {
"cc": {
"titulo": "Código Civil, arts. 21 a 23 (texto consolidado, BOE)",
"url": "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763"
},
"rd": {
"titulo": "Real Decreto 1004/2015, Reglamento de nacionalidad por residencia (BOE)",
"url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-12047"
},
"orden": {
"titulo": "Orden JUS/1625/2016, tramitación electrónica de la nacionalidad por residencia (BOE)",
"url": "https://www.boe.es/buscar/act.php?id=BOE-A-2016-9314"
},
"mj": {
"titulo": "Ministerio de Justicia: información sobre la nacionalidad",
"url": "https://www.mjusticia.gob.es/es/ciudadania/nacionalidad/informacion-nacionalidad"
},
"mj790": {
"titulo": "Ministerio de Justicia: formulario 790",
"url": "https://www.mjusticia.gob.es/es/ciudadania/formulario-790"
},
"sede": {
"titulo": "Sede electrónica del Ministerio de Justicia: nacionalidad española",
"url": "https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola"
},
"estado": {
"titulo": "Sede electrónica: consulta del estado del expediente de nacionalidad",
"url": "https://sede.mjusticia.gob.es/eConsultas/inicioNacionalidad"
},
"ccse": {
"titulo": "Instituto Cervantes: prueba CCSE",
"url": "https://cervantes.org/es/examenes/ccse"
},
"manual": {
"titulo": "Instituto Cervantes: manual de preparación CCSE 2026 (PDF)",
"url": "https://cervantes.org/sites/public/produccion/files/2026-10/manual-preparacion-prueba-ccse-2026.pdf"
},
"fechas": {
"titulo": "Instituto Cervantes: DELE y calendario de exámenes",
"url": "https://cervantes.org/es/examenes/dele"
},
"faqic": {
"titulo": "Instituto Cervantes: preguntas frecuentes",
"url": "https://cervantes.org/es/preguntas-frecuentes"
},
"ine": {
"titulo": "INE: adquisiciones de nacionalidad española de residentes, año 2024 (nota de prensa)",
"url": "https://ine.es/dyngs/Prensa/EANER2024.htm"
},
"hcch": {
"titulo": "Conferencia de La Haya: estado del Convenio de la Apostilla",
"url": "https://www.hcch.net/es/instruments/conventions/status-table/?cid=41"
},
"legal": {
"titulo": "Ministerio de Asuntos Exteriores: legalización y apostilla",
"url": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx"
},
"jurados": {
"titulo": "Ministerio de Asuntos Exteriores: traductores-intérpretes jurados",
"url": "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-Interpretes-Jurados.aspx"
},
"ec": {
"titulo": "Gobierno de Ecuador: certificado de antecedentes penales",
"url": "https://www.gob.ec/mdi/tramites/emision-certificado-antecedentes-penales"
},
"ar": {
"titulo": "Gobierno de Argentina: certificado de antecedentes penales",
"url": "https://www.argentina.gob.ar/servicio/solicitar-certificado-de-antecedentes-penales-con-documento-extranjero"
},
"ccsebru": {
"titulo": "Instituto Cervantes de Bruselas: prueba CCSE",
"url": "https://bruselas.cervantes.es/es/examenes_espanol/CCSE/ccse.htm"
},
"como": {
"titulo": "Sede electrónica del Ministerio de Justicia: «Cómo va lo mío»",
"url": "https://sede.mjusticia.gob.es/tramites/como"
}
},
"paises": [
{
"id": "marruecos",
"nombre": "Marruecos",
"dos_anios": false,
"dele_exento": false,
"idioma_es": false,
"apostilla": "2016-08-14"
},
{
"id": "venezuela",
"nombre": "Venezuela",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "1999-03-16"
},
{
"id": "colombia",
"nombre": "Colombia",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2001-01-30"
},
{
"id": "honduras",
"nombre": "Honduras",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2004-09-30"
},
{
"id": "ecuador",
"nombre": "Ecuador",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2005-04-02"
},
{
"id": "peru",
"nombre": "Perú",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2010-09-30"
},
{
"id": "dominicana",
"nombre": "República Dominicana",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2009-08-30"
},
{
"id": "argentina",
"nombre": "Argentina",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "1988-02-18"
},
{
"id": "bolivia",
"nombre": "Bolivia",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2018-05-07"
},
{
"id": "cuba",
"nombre": "Cuba",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": null
},
{
"id": "paraguay",
"nombre": "Paraguay",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2014-08-30"
},
{
"id": "chile",
"nombre": "Chile",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "2016-08-30"
},
{
"id": "mexico",
"nombre": "México",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "uruguay",
"nombre": "Uruguay",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "costa-rica",
"nombre": "Costa Rica",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "el-salvador",
"nombre": "El Salvador",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "guatemala",
"nombre": "Guatemala",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "nicaragua",
"nombre": "Nicaragua",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "panama",
"nombre": "Panamá",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "guinea-ecuatorial",
"nombre": "Guinea Ecuatorial",
"dos_anios": true,
"dele_exento": true,
"idioma_es": true,
"apostilla": "sin-verificar"
},
{
"id": "portugal",
"nombre": "Portugal",
"dos_anios": true,
"dele_exento": false,
"idioma_es": false,
"apostilla": "sin-verificar"
},
{
"id": "andorra",
"nombre": "Andorra",
"dos_anios": true,
"dele_exento": false,
"idioma_es": false,
"apostilla": "sin-verificar"
},
{
"id": "filipinas",
"nombre": "Filipinas",
"dos_anios": true,
"dele_exento": false,
"idioma_es": false,
"apostilla": "sin-verificar"
}
]
};
