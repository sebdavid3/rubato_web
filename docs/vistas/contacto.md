# Contacto

- **Ruta:** /contactanos
- **Fase:** 2
- **Tipo:** formulario

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`.
- **Contenido:** "Contáctanos"

### 2. Información de Contacto
- **Descripción:** Datos de contacto de la fundación (dirección, email, teléfono).
- **Componentes:** `section-light`, `h2` ("Para más información contáctanos:"), `card`, `body-md`.
- **Contenido:**
  - 📍 Dirección: **Calle 60 #37-44** (⚠️ inconsistencia: footer dice Calle 61 #37-44 — verificar con el cliente)
  - ✉️ Email general: **fundacionrubato@gmail.com**
  - ✉️ Email Filarmónica: **filarmonicajuvenilbaq@gmail.com**
  - 📞 Teléfono: **318 2808978** (⚠️ inconsistencia: footer dice 3245311718 — 3003596485 — verificar con el cliente)

### 3. Formulario de Contacto
- **Descripción:** Formulario para que visitantes envíen consultas.
- **Componentes:** `input`, `input-focus`, `button-primary`, `label-small`.
- **Campos:**
  - Primer Nombre (requerido)
  - Apellido (requerido)
  - Correo Electrónico (requerido, validación email)
  - Sujeto / Asunto (requerido)
  - Mensaje (textarea, requerido)
- **Mensaje post-envío:** "Responderemos lo más breve posible, ¡gracias!"

## Datos estructurados

- `src/data/site.ts` — dirección, emails, teléfonos

## Notas de implementación

- ⚠️ **Inconsistencias detectadas** (del inventario de rutas):
  1. Dirección en Contacto: "Calle 60 #37-44" vs Footer: "Calle 61 #37-44"
  2. Teléfono en Contacto: "318 2808978" vs Footer: "3245311718 - 3003596485"
  Resolver con el cliente antes de implementar. Sugerencia: usar los datos del footer como canónicos (son los que aparecen en todas las páginas).
- El formulario debe enviar a `fundacionrubato@gmail.com` vía Resend + Astro API route.
- Todos los campos son requeridos. El campo "Sujeto" es el asunto del email.
- Layout: dos columnas en desktop (datos de contacto a la izquierda, formulario a la derecha), una columna en móvil (datos arriba, formulario abajo).
