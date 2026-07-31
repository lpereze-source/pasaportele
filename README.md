# Pasaporte ELE — prototipo interactivo

Sitio estático (HTML/CSS/JS puro, sin build ni frameworks). Funciona tal cual en Netlify.

## ⚠️ Si ves la página sin estilos ni mapa (solo texto)
Eso pasa cuando `index.html` se abre suelto, separado de las carpetas `css/`, `js/` y `assets/`. El navegador no encuentra esos archivos y carga la página "en crudo". Solución: **nunca muevas ni compartas `index.html` solo** — copia o arrastra siempre la carpeta `pasaporte-ele` completa (con sus 4 elementos: `index.html`, `css/`, `js/`, `assets/`). Para probarlo en tu computador, o abres `index.html` con doble clic estando dentro de esa carpeta, o mejor aún, usas un servidor local (`python3 -m http.server` dentro de la carpeta) y visitas `localhost:8000`.

## Qué hace ya
- El fondo del mapa (`assets/mapa.png`) ahora está recortado sin restos de otros paneles, y los 8 nodos están alineados con precisión de píxel contra las insignias numeradas del propio dibujo (no a ojo).
- Misiones 1, 2, 3, 4, 5 y 7 tienen video real de YouTube incrustado. Misión 5 y 7 también tienen su reto/práctica incrustados directamente (Educaplay y Wordwall). Misiones 6 y 4 aún tienen partes pendientes ("Práctica: Kevin" en tu documento) — se muestran como "Próximamente".
- Misión 8 sigue vacía en tu documento (sin video ni actividad todavía).
- Animaciones: brillo pulsante en misiones disponibles, agrandado + resplandor dorado al pasar el mouse, rebote al hacer clic, temblor en misiones bloqueadas, sello con confeti al completar una misión.
- Las misiones se desbloquean en orden: para abrir la misión 3 hay que completar la 2.
- Progreso (insignias, XP, monedas) guardado en `localStorage`, sin servidor ni login.
- Botón "Reiniciar progreso" al pie.

## Qué falta que hagas tú
1. **Misiones 4 y 6** (práctica), y **misión 8 completa**: en cuanto Kevin/tú tengan esos enlaces, agrégalos en `js/missions-data.js` siguiendo el mismo formato que las demás misiones.
2. **Actividades con "comentarios"**: tu documento pide que el estudiante comparta un enlace o descripción "en un comentario" (Vocaroo, avatar, dibujo). Este sitio no tiene sistema de comentarios propio — hoy se muestran como instrucciones de texto. Si quieres recolectar esas respuestas, lo más simple es incrustar un Google Form por misión.
3. **Insignias con imagen real**: si luego quieres imágenes reales de insignias en vez de emoji, añade un campo `badgeImg` a cada misión y úsalo en `app.js` donde hoy se imprime `m.badgeEmoji`.

## Sobre el "sellado" de misiones (importante)
Wordwall y Kahoot no avisan a tu sitio cuando un estudiante termina — no existe ese enlace automático en las cuentas gratuitas. Por eso el botón "Ya terminé" funciona por confianza (el estudiante confirma que acabó). Si necesitas verificar resultados reales, revisa los reportes propios de Wordwall/Kahoot por separado; este sitio es la capa motivacional/visual, no el libro de calificaciones.

## Desplegar en Netlify (sin usar el agente de IA — no necesitas créditos)
El agente de Netlify no es necesario para este sitio; es HTML/CSS/JS plano, así que el despliegue manual (gratis, sin límite de uso) es más simple y más confiable:

1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta `pasaporte-ele` completa (con `index.html`, `css/`, `js/` y `assets/` dentro) directamente sobre la página.
3. En segundos obtienes una URL como `nombre-al-azar.netlify.app`. Puedes cambiarla en Site settings → Change site name.

Si ya tienes un sitio roto en Netlify por el intento anterior con el agente: no hace falta arreglarlo. Ve a ese sitio en tu panel de Netlify → **Deploys** → arrastra esta misma carpeta en la zona "Drag and drop your site output folder here" de ese mismo sitio, y reemplaza el despliegue roto sin gastar créditos de IA.

Si prefieres conectar GitHub para que se actualice solo con cada cambio, sigue funcionando igual (build command vacío, publish directory `.`), pero para este proyecto el drag-and-drop es más rápido y no tiene ninguna desventaja.

## Progreso por dispositivo (limitación a tener en cuenta)
El progreso se guarda en el navegador del estudiante. Si cambia de computador o borra datos de navegación, empieza de cero. Para que el progreso viaje entre dispositivos (por ejemplo, casa y colegio) o para que tú como docente puedas verlo, se necesitaría una base de datos sencilla (por ejemplo Supabase, gratis) conectada mediante Netlify Functions. Si en algún momento lo necesitas, es un paso adicional manejable — avísame y lo armamos.
