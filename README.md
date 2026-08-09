# Pasaporte ELE

## Estructura de este repositorio

```
pasaportele/
├── index.html          ← EL SITIO EN VIVO. No lo borres ni lo muevas de aquí.
└── source/              ← Versión editable (HTML + CSS + JS separados), solo de referencia.
    ├── index.html
    ├── css/style.css
    ├── js/app.js
    ├── js/missions-data.js
    ├── assets/ (mapa.jpg, crown.png, ribbon.png)
    └── README.md         ← notas técnicas sobre cómo editar cada parte
```

- **`index.html` (en la raíz)** es el archivo que GitHub Pages sirve en `https://lpereze-source.github.io/pasaportele/`. Es una versión "todo en uno": CSS, JavaScript e imágenes están incrustados dentro del mismo archivo, así que no depende de ninguna otra carpeta para funcionar. Es el único archivo que necesitas subir para actualizar el sitio.
- **`source/`** es la versión de trabajo, con cada pieza en su propio archivo. No se usa para publicar el sitio directamente — está aquí por si en algún momento quieres editar el código a mano o dármelo para seguir trabajando sobre él. Los cambios en `source/` no se reflejan en el sitio a menos que se vuelva a generar el `index.html` de la raíz a partir de estos archivos.

## Cómo subir esto a GitHub
1. Descomprime el .zip en tu computador.
2. Ve a tu repositorio en GitHub → **Add file → Upload files**.
3. Arrastra la carpeta `pasaportele` completa (o su contenido: el `index.html` y la carpeta `source/`) a la zona de carga. Los navegadores modernos con GitHub mantienen la estructura de carpetas al arrastrar.
4. Si te pide reemplazar el `index.html` existente, confirma — así es como se actualiza el sitio.
5. Espera uno o dos minutos y recarga `https://lpereze-source.github.io/pasaportele/`.
