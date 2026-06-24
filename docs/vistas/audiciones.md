# Audiciones

- **Ruta:** /filarmonica-juvenil/audiciones
- **Fase:** 3
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Audiciones"
- **Imagen:** `scraped-content/images/audiciones/audiciones-img-0.jpg`

### 2. Estado de Convocatoria
- **Descripción:** Aviso de convocatoria cerrada.
- **Componentes:** `section-light`, `card`, `body-xl`.
- **Contenido:** "Las audiciones para el segundo semestre del 2023 se encuentran cerradas. Muchas gracias por su interés."
- **Nota:** ⚠️ Contenido congelado desde 2023. Verificar con el cliente si se mantiene como histórico o se elimina/actualiza.

### 3. Mensaje Motivacional
- **Descripción:** Texto de ánimo para futuros aspirantes.
- **Componentes:** `section-light`, `body-md`.
- **Contenido:** "No dejes pasar esta oportunidad en esta convocatoria de hacer parte de la Filarmónica Juvenil de Barranquilla." / "¡Estamos muy entusiasmados de tenerlos con nosotros!"
- **Imagen:** `scraped-content/images/audiciones/audiciones-img-1.jpg`

### 4. Enlaces a Recursos
- **Descripción:** 3 cards que enlazan a las páginas de información para aspirantes.
- **Componentes:** Grid de 3 `card`, `h3`, `body-md`, `button-secondary`.
- **Contenido:**
   1. **Requisitos** — Información sobre los requisitos para audicionar. → enlace: `/filarmonica-juvenil/requisitos`
   2. **¿Cómo preparar mi audición?** — Guía paso a paso para la grabación del video de audición. → enlace: `/filarmonica-juvenil/preparacion`
   3. **Repertorio** — Lista de obras que la filarmónica ha interpretado. → enlace: `/filarmonica-juvenil/repertorio`
- **Imagen:** `scraped-content/images/audiciones/audiciones-img-2.jpg`

## Datos estructurados

- `src/data/filarmonica/convocatoria.ts` — estado (abierta/cerrada), semestre, año, fecha cierre

## Notas de implementación

- Si la convocatoria está cerrada, mostrar el aviso prominentemente y posiblemente deshabilitar o atenuar los enlaces a requisitos/preparación/repertorio.
- Si se reabre, esta página se convierte en un hub con fecha límite destacada y enlaces activos.
- Las 3 cards de enlace usan `button-secondary` (outline púrpura) para consistencia visual.
- Los textos scrapeados están duplicados en el Wix original (cada ítem aparece 2 veces); usar la versión limpia del inventario de rutas.
