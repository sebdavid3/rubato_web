# Orquesta de Cámara de Barranquilla

- **Ruta:** /orquesta-de-camara
- **Fase:** 4
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título con imagen de la orquesta.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Orquesta de Cámara de Barranquilla"
- **Imagen:** `scraped-content/images/orquesta-de-camara/orquesta-de-camara-img-1.jpg`

### 2. Acerca de la Orquesta
- **Descripción:** Texto introductorio sobre la orquesta.
- **Componentes:** `section-light`, `h2` ("Acerca de la Orquesta de Cámara"), `body-md`.
- **Contenido:** Información general sobre la orquesta. (El scrape del Wix tiene contenido mínimo. Completar con el cliente.)

### 3. Misión
- **Descripción:** Declaración de misión de la orquesta.
- **Componentes:** `section-light`, `h2` ("Misión"), `body-xl`.
- **Contenido:** "Unir a los músicos del caribe colombiano en función a difundir la música clásica y latinoamericana fomentando la cultura en la ciudad y el resto del país."

### 4. Visión
- **Descripción:** Declaración de visión de la orquesta.
- **Componentes:** `section-dark`, `h2` ("Visión"), `body-xl`.
- **Contenido:** "Trabajando con excelencia buscamos ser de las mejores orquestas de cámara de Latinoamérica y tener reconocimiento mundial representando la ciudad de Barranquilla."

### 5. Integrantes
- **Descripción:** Grid de fotos y nombres de los integrantes.
- **Componentes:** `h2` ("Integrantes"), grid de `card` con foto, nombre e instrumento.
- **Imágenes:** `scraped-content/images/orquesta-de-camara/orquesta-de-camara-img-2.png` a `orquesta-de-camara-img-5.jpg`

## Datos estructurados

- `src/data/orquesta-camara/info.ts` — misión, visión, descripción
- `src/data/orquesta-camara/integrantes.ts` — Array de integrantes (nombre, instrumento, foto)

## Notas de implementación

- El contenido scrapeado del Wix es muy escaso para esta página. La sección "Acerca de" necesita contenido adicional del cliente.
- Los integrantes en el Wix se muestran como fotos sin nombres en el scrape. Se necesita la lista de nombres e instrumentos del cliente.
- Layout similar a la página de RioMar Quartet: historia → misión/visión → integrantes.
- Misión en `section-light` y Visión en `section-dark` para crear contraste, como en mision-vision.
