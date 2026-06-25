# Eventos

- **Ruta:** /eventos
- **Fase:** 2
- **Tipo:** listado

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Próximos Eventos"
- **Imagen:** `scraped-content/images/eventos/eventos-img-0.png`

### 2. Listado de Eventos
- **Descripción:** Lista cronológica de eventos (los más próximos primero) con paginación o "Cargar más". Cada evento en una card con imagen, título, fecha, lugar y botón "Leer más".
- **Componentes:** `card`, `h3` (título), `body-sm` (fecha y lugar), `button-ghost` ("Leer más").
- **Contenido (eventos scrapeados del Wix, orden cronológico inverso):**
  - **Universo Rubato** — dom, 07 jun — Comfamiliar Atlántico
  - **Inscripciones Conservatorio Rubato 2026-1** — vie, 09 ene — Fundación Rubato
  - **Navidad con Rubato** — jue, 11 dic — Comfamiliar Atlántico
  - **Fiesta de Disfraces Rubato** — sáb, 25 oct — Fundación Rubato
  - **Concierto Bandas Sonoras** — sáb, 13 sept — Centro Comercial Nuestro Atlántico
  - **🎶✨ Concierto Paisajes Sonoros ✨🎶** — vie, 12 sept — Colegio Alemán Barranquilla
  - **Concierto Didáctico** — vie, 12 sept — I.E. Diversificada Oriental de Santo Tomás
  - **Rachmaninoff en Barranquilla** — jue, 11 sept — Colegio Alemán Barranquilla
  - **SENDAS MUSICALES** — dom, 03 ago — Fundación Rubato
  - **Tarde de Película** — sáb, 12 jul — Cl. 61 #37-44
  - **Inscripción Conservatorio Rubato 2025-2** — jue, 19 jun — Fundación Rubato
  - **Rubato de Película** — sáb, 07 jun — Coventus
  - **Navidad con The Chosen y la Fundación Rubato** — lun, 23 dic — Cl. 61 #37-44
  - **Live Music Rubato** — jue, 13 jun — Colegio Alemán Barranquilla
  - **Le Quattro stagioni** — jue, 06 jun — Auditorio Colegio Alemán de Barranquilla
  - **Inscripciones Conservatorio Rubato 2024-1** — vie, 23 feb — Barranquilla
  - **Galas Conservatorio Rubato — Concierto de Navidad "Juntos somos más fuertes"** — sáb, 09 dic — Teatro Universidad del Atlántico
- **Imágenes:** `scraped-content/images/eventos/eventos-img-2.jpg` a `eventos-img-19.jpg` (varían por evento)

### 3. Paginación / Cargar Más
- **Descripción:** Navegación entre páginas de eventos.
- **Componentes:** `button-secondary` ("Cargar más eventos") o paginación numerada.

### 4. Feature futura: Venta de boletas con QR
- **Fase estimada:** 6 (póstuma — después del lanzamiento inicial)
- **Descripción:** Algunos eventos podrán tener venta de boletas integrada directamente en la página de detalle del evento.
- **Alcance:**
  - El evento tiene un campo `ticketing: { enabled: boolean; price: number; currency: string; capacity?: number }` en el data file.
  - Si `ticketing.enabled === true`, la página de detalle (`/eventos/[slug]`) muestra un botón "Comprar boleta(s)" y un formulario de compra con selector de cantidad.
  - Flujo de compra:
    1. Usuario selecciona cantidad de boletas.
    2. Pago procesado vía **Stripe Checkout** (redirección a Stripe o modal embebido).
    3. Al confirmarse el pago, el backend genera un **código QR único** por boleta.
    4. El QR se envía al email del comprador (vía Resend) con instrucciones para el evento.
    5. El día del evento, el personal escanea el QR para validar la entrada (app móvil simple o dashboard web).
  - **Componentes nuevos necesarios:**
    - `TicketForm.tsx` — isla React con selector de cantidad y botón de compra.
    - `QRCode` — generación server-side (librería `qrcode` en endpoint).
    - `TicketEmail` — template de email con QR embebido (Resend).
    - `TicketScanner` — página/dashboard simple para escanear QR en la entrada (web, usa `navigator.mediaDevices.getUserMedia` o librería `html5-qrcode`).
  - **Infraestructura nueva:**
    - Stripe account y webhooks para confirmación de pago.
    - Endpoint `api/tickets/purchase.ts` — inicia sesión de Stripe Checkout.
    - Endpoint `api/tickets/webhook.ts` — recibe eventos de Stripe, genera QR, envía email.
    - Endpoint `api/tickets/validate.ts` — recibe un QR code, verifica validez (usado por el scanner).
  - **No implementar aún.** Dejar documentado para planificación futura. El campo `ticketing` en el tipo `Event` debe definirse desde ahora como opcional para no romper el schema cuando se implemente.

## Datos estructurados

```ts
// content/events/ (colección TinaCMS — cada evento es un archivo .md)
// Schema definido en tina/config.ts
// Tipo inferido automáticamente por TinaCMS

export interface Event {
  title: string;
  date: Date;
  location: string;
  description?: string;
  image?: string;
  slug: string;
  tags?: string[];
  // Feature futura (Fase 6):
  ticketing?: {
    enabled: boolean;
    price: number;          // en COP
    currency: string;       // "COP"
    capacity?: number;      // cupo limitado (opcional)
  };
}
```

## Notas de implementación

- **Tipo listado dinámico**: los eventos provienen de la colección `content/events/` de TinaCMS, consumidos vía `getCollection("events")` de Astro.
- Ordenar por fecha (más próximo primero). Eventos pasados pueden ir en sección "Eventos Anteriores" o página separada.
- Los eventos scrapeados contienen fechas sin año explícito en la mayoría de los casos; los años deben inferirse o confirmarse con el cliente.
- Algunos eventos tienen emojis en el título (🎶✨). Limpiar para la nueva web o mantener solo si es intencional del cliente.
- El botón "Leer más" abre una página de detalle del evento (`/eventos/[slug]`) con descripción completa, galería de fotos y, en el futuro, el formulario de compra de boletas.
- Si es estática, SSG con rebuild periódico. Si se necesita contenido dinámico, usar SSR on-demand (`export const prerender = false`).
- Las imágenes de eventos en el scrape tienen nombres numéricos no mapeados a eventos específicos. Organizar en build.
- **Venta de boletas:** No construir ahora. El tipo `Event` debe incluir el campo `ticketing?` desde el día 1 (opcional, sin romper nada) para que cuando se implemente en Fase 6 no haya que migrar datos.
