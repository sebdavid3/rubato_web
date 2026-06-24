# Preparación para Audición

- **Ruta:** /filarmonica-juvenil/preparacion
- **Fase:** 3
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`.
- **Contenido:** "Preparación"
- **Imagen:** `scraped-content/images/preparacion-audicion/preparacion-audicion-img-0.jpeg`

### 2. Pasos para Preparar la Audición
- **Descripción:** 6 pasos para grabar correctamente el video de audición.
- **Componentes:** `section-light`, `h2`, `body-md`, lista numerada con iconos.
- **Contenido:**
  1. **Encuadre:** "Ubicarse de tal manera que pueda observarse las manos del instrumentista y estar en el centro del video."
  2. **Ambiente:** "Buscar un lugar adecuado sin distracciones visuales y sonoras que puedan interferir con la grabación."
  3. **Presentación inicial:** "Empezar mencionando su nombre completo; la ciudad o municipio de residencia; escalas, estudio y obras a interpretar. Todo esto debe decirse al inicio del video para evitar interrupciones una vez dado inicio su interpretación instrumental."
  4. **Calidad:** "En lo posible, usar una cámara de buena calidad, de lo contrario, ubicarse en un sitio con buena iluminación."
  5. **Duración:** "No exceder los 10 minutos de duración."
  6. **Entrega:** "Una vez terminada la grabación, subir el video a YouTube y adjuntarlo al formulario."

### 3. Contacto para Dudas
- **Descripción:** Información de contacto si hay preguntas.
- **Componentes:** `body-sm`, `link`.
- **Contenido:** "Si tienes alguna duda o consulta, puedes ponerte en contacto con nuestras líneas de atención" → enlace: `/contactanos`

## Datos estructurados

- `src/data/filarmonica/preparacion.ts` — Array de pasos (número, título, descripción)

## Notas de implementación

- Cada paso puede ser una card con número grande decorativo e icono representativo.
- Considerar agregar un diagrama visual del encuadre correcto (dónde posicionar la cámara, qué debe verse).
- El paso 6 menciona "adjuntarlo al formulario": esto implica que el formulario de audición (probablemente Google Forms) debe tener un campo para URL de YouTube.
- Si la convocatoria está cerrada, mostrar banner informativo manteniendo el contenido accesible.
