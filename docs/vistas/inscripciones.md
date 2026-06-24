# Inscripciones al Festival

- **Ruta:** /festival-rubato/[edicion]/inscripciones
- **Fase:** 4
- **Tipo:** formulario
- **Multi-edición:** Sí — inscripciones por edición desde `src/data/festival-editions.ts`

## Secciones

### 1. Hero
- **Descripción:** Título de la página con el nombre de la edición.
- **Componentes:** `h1`, `Badge` (edición).
- **Contenido:** "Inscríbete — {edition.name}"
- **Imagen:** `{edition.heroImage}` o imagen genérica del festival.

### 2. Información de Inscripción
- **Descripción:** Texto explicativo sobre el proceso de inscripción para esta edición.
- **Componentes:** `section-light`, `h2`, `body-md`.
- **Contenido (dinámico desde `edition`):**
  - "Puedes inscribirte al {edition.name} de forma individual, como estudiante activo, asistente o con tu agrupación."
  - Fecha límite: `{edition.registrationDeadline}` (ej: "12 de septiembre de 2025")
  - Beneficios (itera sobre `{edition.benefits}`):
    - "Participar activamente y como asistentes de las clases magistrales con los artistas nacionales e internacionales invitados."
    - "Participar de alguno de los conciertos de proyección organizados dentro de la programación del festival."
  - ⚠️ "La organización NO se hará cargo de gastos de transporte, alojamiento ni de alimentación. Por lo que cada grupo debe hacerse cargo."

### 3. Estados de la Inscripción
- **Descripción:** La página se comporta diferente según el estado de la inscripción para esta edición.

#### Estado: Abierta (`registrationOpen === true`)
- Muestra el formulario de inscripción completo.
- **Componentes:** `input`, `input-focus`, `button-primary`, `label-small`.
- **Campos:**
  - Nombre (requerido)
  - Apellido (requerido)
  - Email (requerido, validación email)
  - Tipo de inscripción: select/radio (Individual / Estudiante activo / Asistente / Agrupación) (requerido)
  - Nombre de agrupación (condicional: visible solo si tipo = Agrupación)
  - Mensaje (textarea, opcional)
- **Validación:** Campos requeridos marcados con asterisco. Validación client-side (zod) + server-side.

#### Estado: Cerrada — Edición futura aún sin abrir
- Muestra un aviso: "Inscripciones próximamente — A partir del [fecha]."
- Sin formulario visible.

#### Estado: Cerrada — Fecha límite pasada
- Muestra un aviso: "Inscripciones cerradas — La fecha límite fue el {edition.registrationDeadline}."
- Sin formulario visible. Opcional: enlace para recibir notificaciones de la próxima edición.

### 4. Mensaje de Confirmación
- **Descripción:** Estado post-envío exitoso (solo visible tras enviar el formulario).
- **Componentes:** `section-light`, `h2`, `body-md`.
- **Contenido:** "¡Gracias por tu mensaje!"

### 5. Contacto para Dudas
- **Descripción:** Enlace a contacto si hay preguntas (siempre visible).
- **Componentes:** `body-sm`, `link`.
- **Contenido:** "Si tienes alguna duda, puedes ponerte en contacto con nosotros." → enlace: `/contactanos`

### 6. Redes Sociales
- **Descripción:** Enlaces a redes sociales del festival.
- **Componentes:** `SocialLinks`.

### 7. Navegación
- **Descripción:** Breadcrumb y selector de edición.
- **Componentes:** `link`, selector de edición.
- **Contenido:** `← Volver al {edition.name}` → `/festival-rubato/{edition.id}`

## Variante por edición

- Cada edición tiene su propio estado de inscripción (`registrationOpen`, `registrationDeadline`, `benefits`).
- El formulario es el mismo para todas las ediciones (mismos campos), pero el endpoint de envío incluye el `edition.id` para que el email recibido identifique a qué edición corresponde la inscripción.
- El selector de edición permite ver el estado de inscripciones de otras ediciones. Si se selecciona una edición con inscripciones cerradas, se muestra el aviso correspondiente.
- La fecha límite y los beneficios son específicos de cada edición y viven en `FestivalEdition`.

## Datos estructurados

- `{edition.registrationOpen}: boolean` desde `src/data/festival-editions.ts`
- `{edition.registrationDeadline}: string | undefined` desde `src/data/festival-editions.ts`
- `{edition.benefits}: string[] | undefined` desde `src/data/festival-editions.ts`

## Notas de implementación

- El formulario debe tener acción server-side: POST a `/api/festival-inscription` con `{ editionId, ...campos }`. El endpoint incluye el `editionId` en el asunto o cuerpo del email enviado vía Resend.
- El campo "Nombre de agrupación" se muestra/oculta condicionalmente según el tipo de inscripción seleccionado (lógica client-side en la isla React).
- Los 3 estados de inscripción (abierta, próximamente, cerrada) son mutuamente excluyentes. La lógica se resuelve en el `.astro` page antes de renderizar:
  ```
  if (edition.registrationOpen) → formulario
  else if (edition.registrationDeadline && new Date() < new Date(edition.registrationDeadline)) → "Próximamente"
  else → "Cerradas"
  ```
- La lógica de fechas es solo informativa (SSG no tiene acceso a la fecha real del usuario). Se puede refinar con una isla React que verifique `Date.now()` client-side para precisión.
- Las imágenes de la página de inscripciones no están en el scrape; reutilizar imágenes del festival-rubato por edición.
