# Misión y Visión del Festival

- **Ruta:** /festival-rubato/[edicion]/mision-vision
- **Fase:** 4
- **Tipo:** estática
- **Multi-edición:** Sí — contenido por edición desde `content/festival-editions/` (TinaCMS)

## Secciones

### 1. Hero
- **Descripción:** Título de la página con el nombre de la edición.
- **Componentes:** `h1`, `section-dark`, `Badge` (etiqueta con el año/edición).
- **Contenido:** "Misión y Visión — {edition.name}"
- **Imagen:** `{edition.heroImage}` o `scraped-content/images/mision-vision/mision-vision-img-3.jpg`

### 2. Misión
- **Descripción:** Texto completo de la misión de esta edición del festival.
- **Componentes:** `section-light`, `h2` ("Misión"), `body-xl`.
- **Contenido:** `{edition.mission}`
  - (Fallback si no hay misión específica por edición: texto fundacional del festival.)
  - Texto base (I/II edición): "Crear un espacio de formación académica y proyección artística que conjugue procesos musicales a nivel nacional e internacional, con el propósito de que niños, niñas y adolescentes de la región desarrollen sus talentos, a través de prácticas musicales de excelente calidad. El resultado de esta iniciativa contribuirá al ecosistema cultural y a la transformación social de la ciudad."

### 3. Visión
- **Descripción:** Texto completo de la visión a 10 años del festival.
- **Componentes:** `section-dark`, `h2` ("Visión"), `body-xl`.
- **Contenido:** `{edition.vision}`
  - (Fallback si no hay visión específica por edición: texto fundacional.)
  - Texto base: "El Festival Internacional de Música Rubato pretende ser, en un lapso de 10 años, una celebración regular y consolidada en el ámbito regional como un referente en la agenda cultural de calidad, legitimado por la población local como un evento de ciudad y reconocido desde lo formativo como un modelo de transformación social a partir del uso de la música como herramienta para el desarrollo de la sensibilidad y el crecimiento intelectual. El festival aspira, durante este tiempo, a extender su experiencia al resto del país y contar con una organización fortalecida, dotada de la infraestructura y del apoyo económico y logístico necesario para su correcto funcionamiento."

### 4. Navegación
- **Descripción:** Breadcrumb o enlace para volver a la landing de la edición.
- **Componentes:** `link`, `body-sm`.
- **Contenido:** `← Volver al {edition.name}` → enlace: `/festival-rubato/{edition.id}`

## Variante por edición

- La misión y visión pueden evolucionar entre ediciones. Cada `FestivalEdition` tiene campos `mission` y `vision` independientes.
- Si una edición no define `mission` o `vision`, se usa el texto fundacional del festival como fallback (almacenado en un data file separado `festival-fundacional.ts` o como constantes).
- El selector de edición (mismo componente que en la landing) debe estar presente en el hero o navbar de esta página para cambiar de edición sin volver atrás.

## Datos estructurados

- `{edition.mission}` y `{edition.vision}` desde `content/festival-editions/` (TinaCMS)
- `src/data/festival-fundacional.ts` — misión y visión fundacionales (fallback para ediciones que no tengan propias)

## Notas de implementación

- Página simple de dos bloques de texto. Sin cards ni grids complejos.
- La sección Visión usa `section-dark` para crear contraste con la Misión en `section-light`.
- Ambas secciones pueden usar `quote` para destacar frases clave.
- El breadcrumb de navegación incluye el nombre de la edición para orientar al usuario.
- Si la misión/visión es idéntica para todas las ediciones, simplificar: quitar los campos del `FestivalEdition` y usar siempre el texto fundacional. Preguntar al cliente si prevé cambios.
