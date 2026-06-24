# Cursos Libres

- **Ruta:** /cursos-libres
- **Fase:** 3
- **Tipo:** estática + formulario

## Secciones

### 1. Hero
- **Descripción:** Título de la página.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Cursos Libres"
- **Imagen:** `scraped-content/images/cursos-libres/cursos-libres-img-0.jpg`

### 2. Descripción
- **Descripción:** Texto introductorio sobre los cursos libres.
- **Componentes:** `section-light`, `h2`, `body-xl`.
- **Contenido:** "Nuestros Cursos libres ofrecen una oportunidad única para explorar tu pasión por la música de manera flexible y personalizada"

### 3. Instrumentos Disponibles
- **Descripción:** Lista de los 15 instrumentos que se pueden aprender.
- **Componentes:** `section-light`, `h2` ("Puedes aprender los siguientes instrumentos:"), grid de `card`.
- **Contenido:** Violín, Viola, Cello, Contrabajo, Piano, Percusión, Guitarra, Bajo eléctrico, Canto, Saxofón, Clarinete, Flauta traversa, Trompeta, Acordeón, Trombón, Tuba.
- **Nota:** Las clases se pueden realizar de forma presencial o virtual dependiendo la disponibilidad del estudiante.

### 4. Paquetes y Precios
- **Descripción:** Tabla de precios con dos paquetes.
- **Componentes:** `card`, `h3`, `body-md`, `label-small`.
- **Contenido:**

| Paquete | Instrumento/mes | Lenguaje musical/mes |
|---------|----------------|---------------------|
| **Paquete 1** (1h/sem instrumento + 1h lenguaje opcional) | $300.000 COP | $100.000 COP |
| **Paquete 2** (2h/sem instrumento + 1h lenguaje opcional) | $500.000 COP | $100.000 COP |

- Lenguaje musical es opcional en ambos paquetes.
- Las clases pueden ser presenciales o virtuales.

### 5. Datos Bancarios
- **Descripción:** Información de cuenta para pago.
- **Componentes:** `card`, `body-md`.
- **Contenido:**
  - No. Cuenta: **442-000033-40**
  - Tipo: Ahorros
  - Banco: Bancolombia
  - Nombre: Fundación Rubato
  - NIT: 901559056

### 6. Formulario de Inscripción
- **Descripción:** Formulario de inscripción con carga de comprobante de pago.
- **Componentes:** `input`, `input-focus`, `button-primary`.
- **Campos:**
  - Nombre completo (requerido)
  - Email (requerido)
  - Teléfono (requerido)
  - Instrumento deseado (select, requerido)
  - Paquete (select/radio: Paquete 1 o 2, requerido)
  - ¿Incluir lenguaje musical? (checkbox)
  - Modalidad (select/radio: Presencial o Virtual, requerido)
  - Comprobante de pago (file upload, requerido)
  - Mensaje adicional (textarea, opcional)
- **Validación:** Todos los campos requeridos. El archivo debe ser imagen o PDF.

## Datos estructurados

- `src/data/cursos-libres/instrumentos.ts` — Array de instrumentos (nombre, slug)
- `src/data/cursos-libres/paquetes.ts` — Array de paquetes (nombre, horas, precioInstrumento, precioLenguaje)
- `BankInfo` component + `src/utils/constants.ts` — cuenta, tipo, banco, nombre, NIT (compartido con conservatorio)

## Notas de implementación

- El formulario debe enviar el comprobante de pago como archivo adjunto al backend/email.
- Los precios deben ser editables (archivo de datos), no hardcodeados.
- Considerar un accordion o tabs para "Presencial" vs "Virtual" si la oferta de instrumentos varía por modalidad.
- Los datos bancarios son los mismos que conservatorio y apoyanos; unificar en `BankInfo` component + `src/utils/constants.ts` y reutilizar.
- El formulario probablemente requiere backend para procesar archivos.
