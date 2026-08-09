// ============================================================
// MISSION DATA
// position.top / position.left are PERCENTAGES, measured
// directly from assets/mapa.png (pixel-verified against the
// badge circles in the artwork, not eyeballed). If you ever
// replace mapa.png with a different image, these will need to
// be re-measured.
//
// aprende / practica / reto can each be:
//   { type:'video', label, embedUrl }   -> embeds a YouTube player
//   { type:'link',  label, url, note }  -> button that opens url in a new tab
//   { type:'iframe',label, embedUrl, note } -> embeds the activity directly
//   { type:'text',  label, instructions }   -> instructions only, no link
//   null                                -> shows "Próximamente"
// ============================================================

const INTRO_VIDEO = {
  label: "Video de bienvenida",
  embedUrl: "https://www.youtube.com/embed/EtwfTiqgVFE"
};

const MISSIONS = [
  {
    id: 1,
    emoji: "👋",
    title: "¡Hola, soy yo!",
    skills: ["Speaking"],
    position: { top: 21, left: 32 },
    vocab: ["👋 Hola", "😊 Buenos días", "🙋 Me llamo…", "🌎 Soy de…", "🤝 Mucho gusto", "👋 Adiós"],
    aprende: { type: "video", label: "Video: preséntate en español", embedUrl: "https://www.youtube.com/embed/1Snybn6hUD0" },
    practica: { type: "link", label: "Presentación personal (Educaplay)", url: "https://es.educaplay.com/recursos-educativos/18192092-presentacion_personal_basica.html" },
    reto: {
      type: "link",
      label: "Crea tu avatar",
      url: "https://getavataaars.com/",
      instructions: "Crea tu avatar con tus rasgos físicos y descarga la imagen en .png. Luego escribe una breve descripción, por ejemplo: \"Hola, me llamo Carlos. Tengo 34 años. Soy de Colombia. Soy bajo. Tengo el cabello corto y negro. Tengo gafas y barba. Soy amable y alegre. Me gusta el fútbol y la música.\""
    },
    badgeName: "Explorador de Saludos",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge1.png",
    xp: 100
  },
  {
    id: 2,
    emoji: "👨‍👩‍👧",
    title: "Mi familia",
    skills: ["Listening"],
    position: { top: 28, left: 64 },
    vocab: ["👨 Padre", "👩 Madre", "👦 Hermano", "👧 Hermana", "👴 Abuelo", "👵 Abuela"],
    aprende: { type: "video", label: "Video: la familia", embedUrl: "https://www.youtube.com/embed/XLc2Mc1rkKU" },
    practica: {
      type: "iframe",
      label: "Rueda de la familia (Wordwall)",
      embedUrl: "https://wordwall.net/es/embed/a6b4f1066b3f4c3ba002e9b016274eb6?themeId=1&templateId=8&fontStackId=0",
      note: "Gira la ruleta y crea una oración con el miembro de la familia que te salga y su nombre. Ejemplo: \"Mi hermano se llama Christian\". Grábate con Vocaroo y comparte el enlace."
    },
    reto: {
      type: "text",
      label: "Dibuja a tu familia",
      instructions: "Dibuja a cada miembro de tu familia y escribe una oración presentando a cada uno. Ejemplos: \"Mi mamá se llama Patricia.\" · \"Mi papá se llama Javier.\""
    },
    badgeName: "Experto en Familia",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge2.png",
    xp: 100
  },
  {
    id: 3,
    emoji: "🍕",
    title: "En el restaurante",
    skills: ["Listening", "Speaking"],
    position: { top: 47, left: 29 },
    vocab: ["💧 Agua", "🥤 Jugo", "🍞 Pan", "🍗 Pollo", "🍕 Pizza", "🧾 Cuenta"],
    aprende: { type: "video", label: "Video: en el restaurante", embedUrl: "https://www.youtube.com/embed/j0Dnx_U5hIY" },
    practica: { type: "link", label: "Actividad interactiva (Genially)", url: "https://view.genially.com/6a662ff7befa9404bb3ef5e9" },
    reto: { type: "link", label: "Emparejar alimentos", url: "https://interacty.me/projects/9bef57022aea22b3", instructions: "Relaciona cada imagen con el alimento correcto." },
    badgeName: "Chef del Español",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge3.png",
    xp: 100
  },
  {
    id: 4,
    emoji: "🛍️",
    title: "Vamos de compras",
    skills: ["Speaking", "Vocabulario"],
    position: { top: 49, left: 63 },
    vocab: ["👕 Camisa", "👖 Pantalón", "👟 Zapatos", "👗 Vestido", "💰 Caro", "🏷️ Barato"],
    aprende: { type: "video", label: "Video: vamos de compras", embedUrl: "https://www.youtube.com/embed/I6kCis2yzZA" },
    practica: { type: "link", label: "Actividad (Wordwall)", url: "https://wordwall.net/es/resource/116832513/sin-t%C3%ADtulo2" },
    reto: { type: "link", label: "Vamos de compras (Educaplay)", url: "https://es.educaplay.com/recursos-educativos/30066114-vamos_de_compras.html" },
    badgeName: "Comprador Inteligente",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge4.png",
    xp: 100
  },
  {
    id: 5,
    emoji: "🗺️",
    title: "La ciudad",
    skills: ["Reading", "Speaking"],
    position: { top: 63, left: 38 },
    vocab: ["🏦 Banco", "🏥 Hospital", "🏫 Escuela", "🌳 Parque", "🏛️ Museo", "🛒 Supermercado"],
    aprende: { type: "video", label: "Video: la ciudad", embedUrl: "https://www.youtube.com/embed/jWlS9YXv6ag" },
    practica: { type: "link", label: "Actividad (Wordwall)", url: "https://wordwall.net/es/resource/36776554/spanish/la-ciudad" },
    reto: {
      type: "iframe",
      label: "Vocabulario de la ciudad (Educaplay)",
      embedUrl: "https://es.educaplay.com/juego/1103504-vocabulario_la_ciudad.html"
    },
    badgeName: "Guía Turístico",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge5.png",
    xp: 100
  },
  {
    id: 6,
    emoji: "⏰",
    title: "Mi rutina",
    skills: ["Writing", "Listening"],
    position: { top: 70, left: 64 },
    vocab: ["🛏️ Levantarme", "🥐 Desayunar", "📚 Estudiar", "💼 Trabajar", "🍽️ Comer", "😴 Dormir"],
    aprende: {
      type: "audio",
      label: "Grabación de ejemplo (SoundCloud)",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fleonardo-perez-671751720%2Fgrabacion-rutina-26_7_2026&color=%23D9A441&auto_play=false&show_user=true"
    },
    practica: { type: "link", label: "Orden de acciones: preparar té (Educaplay)", url: "https://es.educaplay.com/recursos-educativos/30075189-orden_de_acciones_preparar_te.html" },
    reto: {
      type: "text",
      label: "Escribe tu rutina",
      instructions: "En un espacio enumerado del 1 al 5, escribe cinco oraciones sobre tu rutina diaria y practica leyéndolas en voz alta."
    },
    badgeName: "Maestro del Tiempo",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge6.png",
    xp: 100
  },
  {
    id: 7,
    emoji: "☀️",
    title: "El clima",
    skills: ["Listening", "Speaking"],
    position: { top: 87, left: 22 },
    vocab: ["🥶 Hace frío", "🥵 Hace calor", "🌧️ Llueve", "❄️ Nieva", "☀️ Está soleado", "☁️ Está nublado"],
    aprende: { type: "link", label: "Lectura sobre los climas (Canva)", url: "https://canva.link/b6jb4okoxctjv5b" },
    practica: { type: "link", label: "Reto de Kahoot", url: "https://create.kahoot.it/share/enter-kahoot-title/5fcb2957-f81c-4546-b98b-1d8cc50bbeec" },
    reto: {
      type: "iframe",
      label: "Reto del clima (Wordwall)",
      embedUrl: "https://wordwall.net/es/embed/9952ff0720e64d9a9cfdba2433d26511?themeId=1&templateId=3&fontStackId=0"
    },
    badgeName: "Meteorólogo ELE",
    badgeEmoji: "🥇",
    badgeImg: "assets/badge7.png",
    xp: 100
  },
  {
    id: 8,
    emoji: "🏆",
    title: "Gran desafío final",
    skills: ["Todas las competencias"],
    position: { top: 80, left: 46 },
    vocab: ["🎧 Listening", "💬 Reading", "✍️ Writing", "🎙️ Speaking"],
    aprende: { type: "video", label: "Video: gran desafío final", embedUrl: "https://www.youtube.com/embed/zgLGDfyD-SQ" },
    practica: {
      type: "link",
      label: "Práctica (Canva)",
      url: "https://passporttravelenglishadventure.my.canva.site/aventura-del-vocabulario-en-espa-ol"
    },
    reto: null,
    badgeName: "Maestro del Español A1",
    badgeEmoji: "👑",
    badgeImg: "assets/badge8.png",
    xp: 200,
    isFinal: true
  }
];
