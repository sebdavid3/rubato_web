# Reserva Online

- **Ruta:** /book-online
- **Fase:** 5
- **Tipo:** integración externa

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`.
- **Contenido:** "Reserva Online"

### 2. Estado Actual
- **Descripción:** Mensaje de placeholder cuando no hay reservas disponibles.
- **Componentes:** `section-light`, `card`, `body-xl`.
- **Contenido:** "Nada que reservar ahora. Vuelve a intentarlo pronto."

## Datos estructurados

- Ninguno. El contenido depende de la integración externa que el cliente elija.

## Notas de implementación

- **Fase 5** (baja prioridad): En el Wix actual esta página es un placeholder. No hay funcionalidad real.
- Esta página está destinada a ser una integración con un sistema de reservas externo (ej. Calendly, SimplyBook.me, o un widget de Wix Bookings que no está activo).
- Para la nueva web, si el cliente necesita reservas online (clases, salas de ensayo, etc.), integrar con un servicio de scheduling. Si no, eliminar esta ruta o mantener el placeholder.
- Si se integra con un servicio externo, probablemente sea un iframe embed o un redirect. No requiere diseño propio más allá del contenedor.
- ⚠️ No hay contenido scrapeado para esta página (no existe `reserva-online.md` ni carpeta de imágenes en el scrape).
