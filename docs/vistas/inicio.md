# Inicio

- **Ruta:** /
- **Fase:** 1
- **Tipo:** landing

## Secciones

### 1. Hero
- **Descripción:** Imagen de fondo full-width con frase principal y overlay oscuro.
- **Componentes:** `section-dark` (overlay), `h1` para frase principal, `button-primary` CTA.
- **Contenido:** "Brindamos sueños, creando propósitos y transformando vidas a través del arte, para que cada estudiante encuentre en la música una voz propia, un futuro posible y una forma de aportar al mundo"
- **Imagen:** `scraped-content/images/inicio/inicio-img-10.jpg` (hero background)

### 2. Programas
- **Descripción:** Grid de 4 cards (2x2 en escritorio, 1 columna en móvil) con imagen, título, descripción y enlace.
- **Componentes:** `card`, `card-hover`, `h3` (título), `body-md` (descripción), `link` (enlace a página del programa).
- **Contenido:**
  1. **Conservatorio Rubato** — "Acompañamos a cada estudiante en el descubrimiento de su voz, su liderazgo y su humanidad a través de la música, formando intérpretes de gran nivel capaces de compartir su arte con el mundo. El Conservatorio Rubato cree en el poder del trabajo colectivo, la disciplina y la sensibilidad para transformar vidas, construir comunidad y abrir caminos de dignidad, propósito y esperanza desde el escenario." → enlace: `/conservatorio`
  2. **Filarmónica Juvenil de Barranquilla** — "Proyectamos el talento juvenil del Caribe colombiano desde la práctica orquestal hacia escenarios nacionales e internacionales, promoviendo la convivencia, el respeto y la construcción de paz. La Filarmónica Juvenil de Barranquilla existe para abrir caminos, elevar las voces de sus jóvenes y convertir la música en un puente entre culturas, territorios y futuros posibles." → enlace: `/filarmonica-juvenil`
  3. **Festival Internacional de Música Rubato** — "Desarrollamos un espacio cultural de alto impacto educativo que acerca la música a comunidades y públicos con acceso limitado a la formación artística, generando procesos de aprendizaje, inspiración y participación activa. El Festival Internacional de Música Rubato promueve el encuentro entre artistas, estudiantes y territorios, utilizando la experiencia musical como una herramienta para ampliar oportunidades, fortalecer capacidades y contribuir a una sociedad más equitativa desde la cultura." → enlace: `/festival-rubato`
  4. **Examinador Autorizado de Trinity College London** — "Los alumnos del Conservatorio Rubato pueden presentar exámenes y certificarse internacionalmente con la validación de Trinity College London en áreas como: • Música Clásica • Jazz • Rock & Pop. Trinity College London es una institución internacionalmente regulada y reconocida, que forma parte de la red RQF (Regulated Qualifications Framework) del Reino Unido. Sus certificaciones cuentan con validez oficial y están alineadas con los estándares educativos del Reino Unido y de toda la Unión Europea." → enlace: `/conservatorio` (ancla a sección Trinity)
- **Imágenes:** `scraped-content/images/inicio/inicio-img-3.jpg` (Conservatorio), `inicio-img-4.png` (Filarmónica), `inicio-img-5.png` (Festival), `inicio-img-6.jpg` (Trinity)

### 3. Próximos Eventos
- **Descripción:** Lista de cards de evento (título, fecha, lugar) con botón "Leer más".
- **Componentes:** `card`, `h3`, `body-sm` (fecha/lugar), `button-ghost` ("Leer más").
- **Contenido:** "No hay eventos en este momento" (placeholder cuando no hay eventos activos).
- **Imagen:** `scraped-content/images/inicio/inicio-img-7.jpg`

### 4. Información Rápida (3 cards)
- **Descripción:** Grid de 3 cards con icono/título y enlace a secciones clave.
- **Componentes:** `card`, `h3`, `body-md`, `link`.
- **Contenido:**
  1. **Misión** — "Visión, meta, y compromiso" → enlace: `/acerca-de-nosotros`
  2. **Eventos** — "Y noticias de la fundación" → enlace: `/eventos`
  3. **Haz Parte** — "Donando, siendo voluntario, y participando" → enlace: `/apoyanos`
- **Imágenes:** `scraped-content/images/inicio/inicio-img-11.jpg`, `inicio-img-12.jpg`, `inicio-img-13.jpg`

### 5. CTA Final
- **Descripción:** Sección de llamado a la acción final con frase motivacional.
- **Componentes:** `section-dark`, `h2`, `body-xl`, `button-primary`.
- **Contenido:** "Únete a nosotros" / "Impulsa el futuro de la música en Barranquilla"

## Datos estructurados

- `src/data/programs.ts` — Array de 4 programas (título, descripción, slug, imagen)
- `src/data/events.ts` — Array de eventos (título, fecha, lugar, slug, imagen)

## Notas de implementación

- El hero usa imagen de fondo con `section-dark` (overlay `rgba(41, 2, 57, 0.7)` aprox) y texto centrado en blanco.
- Las cards de programas deben tener igual altura por fila (CSS grid con `align-items: stretch`).
- La sección "Próximos Eventos" debe consultarse de `src/data/events.ts`; si no hay eventos activos, mostrar mensaje placeholder.
- "No hay eventos en este momento" es un estado vacío, no un error.
