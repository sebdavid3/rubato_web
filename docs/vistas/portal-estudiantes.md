# Portal de Estudiantes

- **Ruta:** /team
- **Fase:** 5
- **Tipo:** portal

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Portal de Estudiantes"
- **Imagen:** `scraped-content/images/portal-estudiantes/portal-estudiantes-img-0.jpg`

### 2. Información para Estudiantes
- **Descripción:** Sección con enlaces a recursos estudiantiles.
- **Componentes:** `section-light`, `h2` ("Información Estudiantes"), `card`, `body-md`.

### 3. Enlaces a Recursos
- **Descripción:** 3 cards con enlaces a recursos externos de Google.
- **Componentes:** Grid de 3 `card`, `h3`, `button-primary`.
- **Contenido:**
  1. **Horarios Conservatorio** → Google Sheets (URL por confirmar)
     - **Imagen:** `scraped-content/images/portal-estudiantes/portal-estudiantes-img-1.jpg`
  2. **Material para Estudio** → Google Drive (URL por confirmar)
     - **Imagen:** `scraped-content/images/portal-estudiantes/portal-estudiantes-img-2.jpg`
  3. **Calificaciones** → Google Sheets (URL por confirmar)

## Datos estructurados

- `src/data/estudiantes/enlaces.ts` — Array de recursos (nombre, descripción, url, icono)

## Notas de implementación

- **Fase 5** (baja prioridad): esta página es un simple portal de enlaces externos.
- Las URLs reales de Google Sheets/Drive deben ser proporcionadas por el cliente. Actualmente no están en el scrape (el Wix probablemente las tiene en botones/embebidos que el scraper no capturó).
- Si el cliente decide migrar estos recursos a una plataforma interna (ej. dashboard de estudiantes con login), esta página evolucionaría significativamente.
- Por ahora, implementar como 3 cards con iconos representativos y enlaces `target="_blank" rel="noopener noreferrer"`.
- La ruta `/team` es confusa; considerar renombrar a `/portal-estudiantes` (requiere aprobación del cliente y redirect 301 de la ruta antigua).
