# Acerca de Nosotros

- **Ruta:** /acerca-de-nosotros
- **Fase:** 2
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título de página con imagen de fondo.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Acerca de Nosotros"
- **Imagen:** `scraped-content/images/acerca-de-nosotros/acerca-de-nosotros-img-1.jpg`

### 2. Objeto Social
- **Descripción:** Bloque de texto con el objeto legal de la fundación y sus principios.
- **Componentes:** `section-light`, `h2` ("Objeto Social"), `body-md`.
- **Contenido:**
  - "La Fundación Rubato tiene por objeto: La formación musical, principalmente de niños, niñas y adolescentes con fines de integración social, fomento y acceso a la cultura. La promoción y apoyo a proyectos juveniles e infantiles de práctica orquestal."
  - "La Fundación se guiará por los siguientes principios: Democracia, solidaridad, equidad, justicia, transparencia, creatividad y en general con los derechos fundamentales de los seres humanos contenidos en la Constitución Nacional y el derecho internacional."
- **Imagen:** `scraped-content/images/acerca-de-nosotros/acerca-de-nosotros-img-2.jpg`

### 3. Misión
- **Descripción:** Texto centrado con la misión de la fundación.
- **Componentes:** `section-dark`, `h2`, `body-xl`, `quote`.
- **Contenido:**
  - Título: "Brindando sueños y creando propósitos"
  - "Crear espacios musicales y sociales favoreciendo la calidad de vida en niños, niñas y adolescentes en situación de vulnerabilidad, impulsando los valores humanos en un sector más amplio de la sociedad colombiana, a partir de la organización y el apoyo a programas musicales de carácter artístico y formativo."
- **Imagen:** `scraped-content/images/acerca-de-nosotros/acerca-de-nosotros-img-3.jpg`

### 4. Visión
- **Descripción:** Bloque de texto con la visión de la fundación.
- **Componentes:** `section-light`, `h2`, `body-md`.
- **Contenido:** "La Fundación Rubato busca ser pionera en procesos musicales desde la Costa Caribe colombiana hasta extenderse al resto del país, proporcionando el desarrollo integral y la libertad de expresarse en un espacio seguro."
- **Imagen:** `scraped-content/images/acerca-de-nosotros/acerca-de-nosotros-img-4.jpg`

### 5. Equipo
- **Descripción:** Grid de cards con foto, nombre y cargo de cada miembro (2-3 columnas).
- **Componentes:** `h2`, `card`, `body-md`, `label-small` (cargo).
- **Contenido:**
  - Alfredo Reyes — Director
  - Steffin Hernandez — Gerente
  - Victoria Garcia — Asistente Administrativa
  - Sebastian Ibañez — Gerente TI
  - David Jiménez — Asistente de Dirección
- **Imágenes:** `scraped-content/images/acerca-de-nosotros/acerca-de-nosotros-img-6.jpg` a `acerca-de-nosotros-img-19.jpg` (fotos de equipo)

## Datos estructurados

- `src/data/team.ts` — Array de miembros (nombre, cargo, foto, bio corta)

## Notas de implementación

- Las fotos del equipo deben ser cuadradas o con recorte circular (`rounded: full`) para consistencia con la identidad visual.
- El objeto social y los principios pueden ir en una misma sección con layout dividido (texto legal a la izquierda, principios como lista a la derecha en desktop).
- La sección Misión usa `section-dark` para dar peso visual; la Visión vuelve a `section-light`.
- En el Wix original las fotos de equipo tienen nombres genéricos; mapear a nombres descriptivos en el build (ej. `equipo/alfredo-reyes.jpg`).
