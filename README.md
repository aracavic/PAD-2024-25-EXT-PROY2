# Plataforma de Recursos para Desarrolladores

Aplicación web progresiva (PWA) para descubrir, guardar y gestionar enlaces y vídeos de interés relacionados con el desarrollo de software, inteligencia artificial, ciberseguridad y otras áreas tecnológicas.

## Características principales

- **Gestión de enlaces**: Consulta, añade, elimina y marca como favoritos tus enlaces de interés, organizados por categorías.
- **Gestión de vídeos de YouTube**: Guarda vídeos relevantes, márcalos como favoritos, elimínalos y clasifícalos por temática.
- **Sugerencias de vídeos**: Descubre nuevos vídeos de YouTube según distintas categorías tecnológicas.
- **Clasificación por categorías**: Filtra y organiza todos tus recursos por temática para facilitar su localización.
- **Selección de favoritos**: Accede rápidamente a tus enlaces y vídeos favoritos desde la pantalla principal.
- **Almacenamiento local**: Todos los datos se guardan en el navegador mediante `localStorage`, permitiendo el uso offline.
- **PWA**: Instalación sencilla en dispositivos y funcionamiento offline gracias a *service workers* y manifiesto web.

## Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias:

   ```bash
   npm install

3. Inicia la aplicación en modo desarrollo:

   ```bash
   npm start

4. Accede a http://localhost:3000 en tu navegador.

## Despliegue

Para desplegar la aplicación en GitHub Pages:

1. Instala el paquete `gh-pages`:

   ```bash
   npm install --save gh-pages
   ```

2. Añade lo siguiente en tu archivo `package.json`:

   ```json
   "homepage": "https://tu-usuario.github.io/tu-repositorio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Ejecuta el despliegue:

   ```bash
   npm run deploy
   ```

4. En este caso ya está desplegada en https://aracavic.github.io/PAD-2024-25-EXT-PROY2/

## Estructura del proyecto

```bash
/src/components   # Componentes principales de la aplicación (pantallas, formularios, listas, etc.)
/public           # Archivos estáticos, manifiesto, service worker e iconos
App.js            # Enrutador principal de la aplicación
App.css           # Estilos globales
```

## Requisitos técnicos

- Node.js y npm instalados.
- Navegador moderno compatible con PWA.
