# Requisitos de Audición

- **Ruta:** /filarmonica-juvenil/requisitos
- **Fase:** 3
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`.
- **Contenido:** "Requisitos"

### 2. Lista de Requisitos
- **Descripción:** 5 requisitos presentados como lista numerada con iconos.
- **Componentes:** `section-light`, `h2`, `body-md`, `card` (cada requisito en su card).
- **Contenido:**
  1. Vivir en la ciudad de Barranquilla o en municipios aledaños.
  2. Tener entre 14 y 25 años de edad.
  3. Contar con el nivel técnico y musical.
  4. Diligenciar el formulario llenando todos los campos.
  5. Recordar la fecha de cierre.

### 3. Contacto para Dudas
- **Descripción:** Información de contacto si hay preguntas.
- **Componentes:** `body-sm`, `link`.
- **Contenido:** "Si tienes alguna duda o consulta, puedes ponerte en contacto con nuestras líneas de atención" → enlace: `/contactanos`

## Datos estructurados

- `src/data/filarmonica/requisitos.ts` — Array de requisitos (texto, icono opcional)

## Notas de implementación

- Página ultra simple: 5 cards en columna con numeración.
- Los requisitos son estáticos, pero almacenarlos en .ts facilita futuras ediciones.
- Los textos están duplicados en el scrape del Wix (bug del scraper); usar cada requisito una sola vez.
- Si la convocatoria está cerrada, esta página igual debe ser accesible (los requisitos no cambian), pero con un banner que indique que actualmente no hay convocatoria activa.
