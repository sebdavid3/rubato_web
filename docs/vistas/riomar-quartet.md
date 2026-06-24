# RioMar Quartet

- **Ruta:** /riomar-quartet
- **Fase:** 4
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título con imagen del cuarteto.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "RioMar Quartet"
- **Imagen:** `scraped-content/images/riomar-quartet/riomar-quartet-img-0.jpg`

### 2. Historia
- **Descripción:** Historia completa del cuarteto, desde su formación hasta el presente.
- **Componentes:** `section-light`, `h2`, `body-md`.
- **Contenido:** "RioMar Quartet es una agrupación proveniente de Barranquilla (Colombia) ciudad donde el Río Magdalena se encuentra para mezclarse con el mar Caribe. Gracias a esta convergencia, nace la idea de conformar un cuarteto de cuerdas que exalte la unidad en medio de la diversidad musical y cultural de esta región del país. Sus integrantes han adquirido experiencia y formación en música de cámara, orquestal, además de ser docentes en Conservatorios de Música, Universidades y ser un referente de liderazgo en la cultura en la ciudad y el departamento del Atlántico."
- **Imagen:** `scraped-content/images/riomar-quartet/riomar-quartet-img-1.jpg`

### 3. Trayectoria (Línea de Tiempo)
- **Descripción:** Hitos del cuarteto en orden cronológico.
- **Componentes:** `section-light`, `h3`, `body-md`.
- **Contenido:**
  - **Enero 2021** — Seleccionados a nivel Latinoamérica para participar en el Curso Virtual para cuartetos de cuerda, organizado por los cuartetos José White (México) y Q-Arte (Colombia).
  - **Septiembre 2021** — Seleccionados por concurso nacional para el X Festival Internacional de Música de Cámara de Barranquilla.
  - **Noviembre 2021** — Artistas invitados en la reinauguración del Teatro Santa Marta, referente arquitectónico y patrimonial de Colombia.
  - **Nov-Dic 2021** — Participación en la Temporada de Conciertos organizada por la Fundación Rubato.
  - **2022** — Talleristas invitados al XVII Festival Arcos de la UNAB en Bucaramanga.
  - **2023** — Acompañaron a la artista internacional Lido Pimienta en su gira por el Caribe.
- **Imagen:** `scraped-content/images/riomar-quartet/riomar-quartet-img-2.jpg`

### 4. Repertorio
- **Descripción:** Estilos musicales que interpreta el cuarteto.
- **Componentes:** `section-dark`, `h2`, `body-md`.
- **Contenido:** "RioMar Quartet busca difundir un repertorio que abarque diferentes periodos y estilos de la música, pasando por repertorio clásico, contemporáneo y varias manifestaciones tradicionales y populares del Caribe colombiano."

### 5. Integrantes
- **Descripción:** Grid de 4 cards con foto, nombre e instrumento de cada integrante.
- **Componentes:** `h2` ("Integrantes"), `card`, `body-md`, `label-small` (instrumento).
- **Contenido:**
  - Alfredo Reyes — Violín
  - Salma Navarro — Violín
  - Steffin Hernández — Viola
  - Natalia Conde — Violonchelo
- **Imágenes:** `scraped-content/images/riomar-quartet/riomar-quartet-img-3.jpg` a `riomar-quartet-img-6.jpg`

## Datos estructurados

- `src/data/riomar-quartet/hitos.ts` — Array de hitos (año, evento, descripción)
- `src/data/riomar-quartet/integrantes.ts` — Array de integrantes (nombre, instrumento, foto)

## Notas de implementación

- La línea de tiempo puede implementarse con CSS puro (borde vertical + puntos) sin necesidad de librería.
- Las cards de integrantes deben ser 4 en grid 2x2 en desktop, 1 columna en móvil.
- El origen del nombre (Río Magdalena + Mar Caribe) es un buen punto para destacar visualmente.
- Alfredo Reyes, Steffin Hernández y Salma Navarro también aparecen en el equipo de la fundación (acerca-de-nosotros). Usar las mismas fotos y datos consistentes en ambas páginas.
