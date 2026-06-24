# Invitados

- **Ruta:** /festival-rubato/[edicion]/invitados
- **Fase:** 4
- **Tipo:** estática
- **Multi-edición:** Sí — invitados por edición desde `src/data/festival-editions.ts`

## Secciones

### 1. Hero
- **Descripción:** Título de la página con el nombre de la edición.
- **Componentes:** `h1`, `Badge` (edición).
- **Contenido:** "Artistas Invitados — {edition.name}"
- **Imagen:** `{edition.heroImage}` o imagen grupal de invitados.

### 2. Lista de Artistas
- **Descripción:** Listado de artistas invitados de esta edición, con foto, nombre, especialidad y biografía. Cada artista en una card expandible o sección con layout imagen-texto.
- **Componentes:** `section-light`, `h2`, `h3` (nombre artista), `body-md` (bio), `card`.
- **Contenido:** Itera sobre `{edition.guests}`. Cada `FestivalGuest` tiene:
  - `name` — Nombre completo
  - `country` — País de origen (opcional, se muestra como badge)
  - `specialty` — Especialidad (ej: "Director de orquesta, violinista")
  - `bio` — Biografía (puede ser extensa; usar colapsable "Leer más")
  - `image` — Foto del artista
  - `socialLinks` — Enlaces a redes/web (opcional, iconos pequeños al pie de la card)

### 3. Artistas de ejemplo (II Edición 2025)
- **Descripción:** Datos de referencia para la edición 2025. Estos van en `src/data/festival-editions.ts` dentro del objeto de la edición 2025.

1. **Camilo Esteban Giraldo Duque** — Director de orquesta, violinista y conferencista internacional. Formado en París y Moscú. Concertino asociado Orchestre Symphonique de Lyon. Productor de bandas sonoras. Coach de Greeicy Rendón, Mike Bahía.
2. **Daniel Simbaña Ruiz** (Ecuador) — Pianista, 21 años. Ganador Pianissimo 2024, Weltmusik Piano Festival 2025.
3. **Ana María Orduz** — Pianista y gestora. Fundadora Piano Festival of the Americas. Carnegie Hall. Artista Yamaha. Doctorado Univ. of Iowa.
4. **RioMar Quartet** — Cuarteto de cuerdas de Barranquilla. Gira con Lido Pimienta 2023.
5. **Basilio Bernardo Márquez Richards** (Cuba) — Trompetista, ex-Irakere. Grammy. 40+ producciones discográficas.
6. **Pedro Mejía** — Pianista colombiano. Doctor Univ. of Miami. Docente Univ. del Atlántico.
7. **Andrés Luquetta Cediel** — Flautista. Congo de Oro 2022. Docente Univ. del Atlántico.
8. **Marisol Córdoba** — Directora coral. Doctorante Univ. Nacional de Rosario. Profesora Univ. del Atlántico.
9. **Alexis Trejos** — Bajo colombiano, solista internacional. Óperas de Verdi, Puccini, Mozart. Condecoración del Congreso de Colombia.
10. **Carlos Parra** — Violista. Bogotá Chamber Orchestra. Asesor Filarmónica Joven de Colombia.
11. **Michell Lopez** — Contrabajista. Orquesta Metropolitana de Barranquilla. Jazz.

### 4. Patrocinadores (por edición)
- **Descripción:** Logos de entidades patrocinadoras de esta edición.
- **Componentes:** `section-light`, grid de logos.
- **Contenido:** Itera sobre `{edition.sponsors}` — nombre + logo.

### 5. Navegación
- **Descripción:** Breadcrumb y selector de edición.
- **Componentes:** `link`, selector de edición.
- **Contenido:** `← Volver al {edition.name}` → `/festival-rubato/{edition.id}`

## Variante por edición

- Cada edición tiene su propio array de `guests` en `FestivalEdition`. Los invitados cambian completamente entre ediciones, aunque algunos artistas pueden repetirse.
- El título del hero incluye el nombre completo de la edición (`{edition.name}`) para contexto inmediato.
- Si una edición tiene `guests: []` (vacío, edición futura sin invitados confirmados), mostrar: "Invitados por confirmar — Te mantendremos informado".
- El selector de edición permite alternar entre ediciones para ver los invitados de cada una.
- Las imágenes de cada artista pueden reutilizarse entre ediciones si el artista repite (referenciar la misma ruta de imagen en el objeto `FestivalGuest`).

## Datos estructurados

- `{edition.guests}: FestivalGuest[]` desde `src/data/festival-editions.ts`
- `{edition.sponsors}` desde `src/data/festival-editions.ts`

## Notas de implementación

- Cada artista es una sección con layout imagen + texto. Imagen a la izquierda, bio a la derecha (alternar en desktop).
- Las biografías extensas (Camilo Giraldo, Basilio Márquez) usan texto colapsable (`<details>` o estado React) con botón "Leer más".
- Las imágenes deben ser consistentes en tamaño dentro de la misma sección. Aspect ratio sugerido: 3:4 o 1:1 para retratos.
- Si un artista tiene `socialLinks`, mostrar iconos pequeños (Instagram, web personal, YouTube) al pie de su card.
- El selector de edición debe mantener al usuario en la misma subpágina (si está en `/2025/invitados` y cambia a `2023`, navegar a `/2023/invitados`).
