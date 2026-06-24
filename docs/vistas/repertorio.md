# Repertorio de Obras

- **Ruta:** /filarmonica-juvenil/repertorio
- **Fase:** 3
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`.
- **Contenido:** "Repertorio"
- **Imagen:** `scraped-content/images/repertorio/repertorio-img-0.jpg`

### 2. Introducción
- **Descripción:** Texto introductorio sobre el repertorio de la filarmónica.
- **Componentes:** `section-light`, `body-md`.
- **Contenido:**
  - "La Filarmónica Juvenil de Barranquilla en su recorrido ha interpretado obras y piezas musicales nacionales e internacionales."
  - ⚠️ "*Para los nuevos aspirantes, deben tener en cuenta que su responsabilidad es ponerse al día con el repertorio aparte de las piezas de la audición que se encuentran en el formulario.*"

### 3. Lista de Obras
- **Descripción:** 8 obras del repertorio presentadas como cards.
- **Componentes:** `section-light`, `card`, `h3` (nombre obra), `body-sm` (compositor y arreglista).
- **Contenido:**
  1. **Gargoyles** — Doug Spata
  2. **Palladio** — Karl Jenkins, Arr. Robert Longfield
  3. **The Great Gate of Kiev and Hopak** — Modest Mussorgsky, Arr. Edmund J. Siennicki
  4. **Pirates of the Caribbean (Piratas del Caribe)** — Klaus Badelt, Arr. Larry Moore & Felix D. Morgan
  5. **Concierto para dos Violines en Re menor** — Johann Sebastian Bach
  6. **Hungarian Dance N°1 & N°5** — Johannes Brahms
  7. **Colombia tierra querida** — Lucho Bermúdez, Arr. Rubén Darío Gómez Prada
  8. **La Piragua** — José Benito Barros, Arr. Yovanny Morales

### 4. Contacto para Dudas
- **Descripción:** Información de contacto si hay preguntas.
- **Componentes:** `body-sm`, `link`.
- **Contenido:** "Si tienes alguna duda o consulta, puedes ponerte en contacto con nuestras líneas de atención" → enlace: `/contactanos`

## Datos estructurados

- `src/data/filarmonica/repertorio.ts` — Array de obras (título, compositor, arreglista, partituraURL opcional)

## Notas de implementación

- Las obras podrían enlazar a partituras PDF o a YouTube para que los aspirantes puedan escucharlas.
- Las cards deben ser compactas (título + compositor, no necesitan imagen).
- La nota para aspirantes ("ponerse al día con el repertorio") debe ir destacada (posiblemente en un `card` con borde de advertencia o fondo `primary-container`).
- Tipografía de títulos de obra: `quote` (Libre Baskerville itálica) para dar carácter formal.
