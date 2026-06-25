# Cronograma

- **Ruta:** /festival-rubato/[edicion]/cronograma
- **Fase:** 4
- **Tipo:** estática
- **Multi-edición:** Sí — cronograma por edición desde `content/festival-editions/` (TinaCMS)

## Secciones

### 1. Hero
- **Descripción:** Título de la página con el nombre de la edición.
- **Componentes:** `h1`, `section-dark`, `Badge` (edición).
- **Contenido:** "Cronograma y Programación — {edition.name}"
- **Imagen:** Imagen de fondo de la edición.

### 2. Fechas del Festival
- **Descripción:** Bloque destacado con las fechas de esta edición.
- **Componentes:** `section-light`, `h2`, `body-xl`.
- **Contenido:** "¡Ven y prográmate del {edition.dates} con el {edition.name}!"

### 3. Cronograma (Tabla HTML)
- **Descripción:** Cronograma detallado día por día, presentado como tabla HTML semántica.
- **Componentes:** Tabla responsive con `card` por día en mobile.
- **Contenido:** Itera sobre `{edition.schedule}`. Cada `FestivalScheduleItem` tiene:
  - `day` — "Miércoles 10 de septiembre"
  - `date` — "2025-09-10" (ISO, para ordenamiento)
  - `events[]` — Array de actividades:
    - `time` — "10:00 AM"
    - `activity` — "Clase magistral de violín"
    - `location` — "Auditorio Colegio Alemán" (opcional)
    - `artist` — "Camilo Giraldo" (opcional, referencia a un invitado)

### 4. Estado sin cronograma definido
- **Descripción:** Si `{edition.schedule}` está vacío (edición futura sin programación).
- **Componentes:** `section-light`, `card`, `body-md`.
- **Contenido:** "Cronograma en construcción — Estamos preparando una programación increíble. Vuelve pronto."

### 5. Redes Sociales
- **Descripción:** Enlaces a redes sociales del festival para seguir actualizaciones.
- **Componentes:** `SocialLinks`, `body-sm`.
- **Contenido:** "Síguenos en redes para conocer las últimas novedades del festival."

### 6. Navegación
- **Descripción:** Breadcrumb y selector de edición.
- **Componentes:** `link`, selector de edición.
- **Contenido:** `← Volver al {edition.name}` → `/festival-rubato/{edition.id}`

## Variante por edición

- El cronograma es específico de cada edición. Cada `FestivalEdition` tiene su propio array `schedule`.
- Para ediciones pasadas, el cronograma sirve como archivo histórico de lo que ocurrió.
- Para ediciones futuras sin programación definida, se muestra el estado "En construcción".
- Si el cronograma se mantiene como imagen (herencia Wix), la imagen se referencia desde `{edition.scheduleImage}` como fallback. Pero el objetivo es migrar a datos estructurados (tabla HTML).
- El selector de edición permite comparar cronogramas de distintas ediciones (ej: `/2025/cronograma` vs `/2023/cronograma`).

## Datos estructurados

- `{edition.schedule}: FestivalScheduleItem[]` desde `content/festival-editions/` (TinaCMS)
- `{edition.dates}: string` — fechas legibles
- `src/types/index.ts` — tipos compartidos (inferidos por TinaCMS para `FestivalScheduleItem`, `FestivalEdition`)

## Notas de implementación

- **Prioridad:** Migrar de imagen (Wix) a tabla HTML semántica con datos estructurados. Mejor accesibilidad, SEO, responsive y mantenibilidad.
- En desktop: tabla con columnas Hora | Actividad | Lugar | Artista. En mobile: cards apiladas por día, cada actividad como una fila dentro de una card de día.
- Usar `time` como elemento HTML semántico para horas.
- Los días deben ordenarse por `date` (ISO) automáticamente.
- Agregar `FestivalScheduleItem` al tipo `Event` de JSON-LD structured data para rich results de Google (pestaña "Eventos").
- El estado "En construcción" usa el mismo layout para no romper la experiencia (mismo hero, diferente cuerpo).
- Layout simple: fechas destacadas → cronograma (tabla/responsive) → redes sociales → navegación.
