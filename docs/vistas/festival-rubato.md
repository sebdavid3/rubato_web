# Festival Internacional de Música Rubato

- **Ruta:** /festival-rubato
- **Fase:** 4
- **Tipo:** landing
- **Multi-edición:** Sí — el festival ocurre cada 2 años. Cada edición tiene su propio landing.

## Arquitectura de ediciones

El festival es bianual. Ya existen la I Edición (2023), II Edición (2025), y vendrán más. El sitio debe soportar múltiples ediciones con navegación entre ellas.

### Rutas
- `/festival-rubato` — redirige a la edición activa (la más reciente con `active: true`)
- `/festival-rubato/[edicion]` — landing de una edición específica (ej: `/festival-rubato/2025`)
- `/festival-rubato/[edicion]/invitados` — invitados de esa edición
- `/festival-rubato/[edicion]/cronograma` — cronograma de esa edición
- `/festival-rubato/[edicion]/mision-vision` — misión y visión de esa edición
- `/festival-rubato/[edicion]/inscripciones` — formulario de inscripción de esa edición

### Implementación
- Todas las rutas bajo `[edicion]` usan `getStaticPaths()` en Astro para generar una página estática por cada edición definida en `src/data/festival-editions.ts`.
- `/festival-rubato` es un redirect (HTTP 302) al `[edicion]` de la edición con `active: true`.
- Si alguna subpágina no tiene contenido para una edición (ej: cronograma aún no definido), se muestra un mensaje "Próximamente" con el diseño de la edición.

## Secciones (Landing por edición)

### 1. Hero
- **Descripción:** Título con imagen de fondo alusiva a la edición. Incluye el selector de edición.
- **Componentes:** `h1`, `section-dark`, `Badge` (selector de edición).
- **Contenido:** `{edition.name}` — Ej: "II Festival Internacional de Música Rubato 2025"
- **Imagen:** `{edition.heroImage}`
- **Selector de edición:** Dropdown o tabs en el hero (o justo debajo) con las ediciones disponibles. Formato: "I Edición · 2023", "II Edición · 2025", etc. La edición activa aparece seleccionada. Diseño: `button-ghost` o `label-nav` en `section-dark`. Navegación client-side (`<select>` + `onChange` → `window.location`).

### 2. Misión y Visión (Resumen)
- **Descripción:** Texto introductorio de la edición y sus valores fundamentales.
- **Componentes:** `section-light`, `h2`, `body-md`, `link` (a `/[edicion]/mision-vision`).
- **Contenido:** `{edition.description}`
- **Imagen:** Imagen contextual de la edición.

### 3. Invitados
- **Descripción:** Card con enlace a la página de invitados de esta edición.
- **Componentes:** `card`, `h3`, `body-md`, `button-secondary`.
- **Contenido:** "Conoce a nuestros invitados internacionales y nacionales del festival." → enlace: `/[edicion]/invitados`
- **Imagen:** Foto grupal o collage de invitados de la edición.

### 4. Cronograma
- **Descripción:** Card con enlace al cronograma de esta edición.
- **Componentes:** `card`, `h3`, `body-md`, `button-secondary`.
- **Contenido:** "Entérate del cronograma de actividades del festival." → enlace: `/[edicion]/cronograma`
- **Imagen:** Imagen alusiva a la programación.

### 5. Inscríbete
- **Descripción:** Card con enlace al formulario de inscripción de esta edición.
- **Componentes:** `card`, `h3`, `body-md`, `button-primary`.
- **Contenido:** "Puedes inscribirte si deseas participar en el festival." → enlace: `/[edicion]/inscripciones`
- **Imagen:** Imagen del festival.

### 6. Navegación entre ediciones (Footer de sección)
- **Descripción:** Si hay múltiples ediciones, mostrar cards pequeñas o links a otras ediciones ("También te puede interesar: I Edición 2023").
- **Componentes:** `section-light`, `card` (compacta), `body-sm`, `button-ghost`.

## Datos estructurados

```ts
// src/data/festival-editions.ts
export interface FestivalGuest {
  id: string;
  name: string;
  country?: string;
  specialty: string;
  bio: string;
  image: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface FestivalScheduleItem {
  day: string;         // "Miércoles 10 de septiembre"
  date: string;        // "2025-09-10"
  events: {
    time: string;      // "10:00 AM"
    activity: string;
    location?: string;
    artist?: string;
  }[];
}

export interface FestivalEdition {
  id: string;                          // "2025", "2027"
  name: string;                        // "II Festival Internacional de Música Rubato"
  year: number;
  active: boolean;                     // true para la edición actual/vigente
  dates: string;                       // "10 al 13 de septiembre"
  description: string;                 // Texto introductorio de la edición
  heroImage: string;
  mission: string;
  vision: string;
  guests: FestivalGuest[];
  schedule: FestivalScheduleItem[];
  registrationOpen: boolean;           // si el formulario de inscripción está abierto
  registrationDeadline?: string;       // "12 de septiembre de 2025"
  benefits?: string[];                 // beneficios de inscripción
  sponsors?: { name: string; logo: string }[];
}

export const festivalEditions: FestivalEdition[] = [
  {
    id: "2025",
    name: "II Festival Internacional de Música Rubato",
    year: 2025,
    active: true,
    dates: "10 al 13 de septiembre",
    description: "...",
    heroImage: "/images/festival-rubato/2025/hero.jpg",
    mission: "...",
    vision: "...",
    guests: [ /* ... */ ],
    schedule: [ /* ... */ ],
    registrationOpen: false,
    registrationDeadline: "12 de septiembre de 2025",
    benefits: [ /* ... */ ],
    sponsors: [ /* ... */ ],
  },
  // Ediciones futuras y pasadas...
];

// Helper: obtener la edición activa
export const activeEdition = festivalEditions.find(e => e.active);
```

## Notas de implementación

- **Selector de edición:** UI limpia. En desktop, tabs horizontales bajo el hero con el nombre corto de cada edición. En mobile, dropdown `<select>`. Estilo `label-nav` sobre fondo oscuro. El cambio de edición navega a la URL canónica de esa edición (navegación real, no solo cambio de estado).
- La ruta `/festival-rubato` (sin edición) redirige 302 a `/{activeEdition.id}`. Esto se implementa en `festival-rubato/index.astro` con `Astro.redirect()`.
- Las páginas `[edicion]/invitados.astro`, `[edicion]/cronograma.astro`, etc. reciben `{ edition }` como prop desde `getStaticPaths` y renderizan condicionalmente según los datos de esa edición.
- Si una edición tiene `active: false`, el formulario de inscripción muestra "Inscripciones cerradas" (a menos que el campo `registrationOpen` esté explícitamente en `true` para una edición futura que ya abrió).
- Las imágenes deben organizarse por edición: `public/images/festival-rubato/{edicionId}/`.
- La misión y visión son específicas de cada edición (pueden evolucionar entre ediciones). Si el cliente decide que son fijas para todas las ediciones, extraer a un data file compartido.
- Las cards de invitados, cronograma e inscripción forman un grid de 3 columnas en desktop, 1 en móvil.
