---
version: alpha
name: Rubato
description: Sistema de diseño para Fundación Rubato — fundación musical en Barranquilla, Colombia. Identidad visual clásica y contemporánea.

colors:
  primary: "#814D95"
  on-primary: "#FFFFFF"
  primary-container: "#CBAED7"
  on-primary-container: "#290239"
  primary-hover: "#6A3D7A"
  secondary: "#1A1C1E"
  on-secondary: "#FFFFFF"
  secondary-container: "#F6F9F5"
  on-secondary-container: "#091405"
  tertiary: "#F6A0A9"
  on-tertiary: "#290239"
  background: "#F6F9F5"
  on-background: "#091405"
  surface: "#FFFFFF"
  on-surface: "#091405"
  surface-variant: "#F6F9F5"
  on-surface-variant: "#4A4C4E"
  outline: "#814D95"
  outline-variant: "#CBAED7"
  error: "#BA1A1A"
  on-error: "#FFFFFF"

typography:
  h1:
    fontFamily: "Libre Baskerville"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  h2:
    fontFamily: "Libre Baskerville"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  h3:
    fontFamily: "Libre Baskerville"
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0em
  h4:
    fontFamily: "Libre Baskerville"
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0em
  body-xl:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-nav:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-button:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-small:
    fontFamily: "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.03em
  quote:
    fontFamily: "Libre Baskerville"
    fontSize: 1.125rem
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.6
    letterSpacing: 0em

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 96px
  container-padding: 24px
  max-width: 1200px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md} {spacing.lg}"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md} {spacing.lg}"
    border: "2px solid {colors.primary}"
    height: 48px
  button-secondary-hover:
    backgroundColor: "{colors.primary-container}"
    borderColor: "{colors.primary}"
  button-donate:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
    height: 40px
  button-donate-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.tertiary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
    height: 40px
  button-ghost-hover:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.primary}"
  button-primary-disabled:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-surface-variant}"
    cursor: not-allowed
  link:
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    textDecoration: underline
  link-hover:
    textColor: "{colors.primary-hover}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    shadow: "0 1px 4px rgba(0,0,0,0.1)"
  card-hover:
    shadow: "0 4px 12px rgba(129, 77, 149, 0.15)"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
    border: "1px solid {colors.outline-variant}"
    typography: "{typography.body-md}"
  input-focus:
    outline: "2px solid {colors.primary}"
    outlineOffset: "2px"
  input-disabled:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-surface-variant}"
    border: "1px solid {colors.surface-variant}"
    cursor: not-allowed
  divider:
    backgroundColor: "{colors.secondary}"
    height: 1px
  nav-link:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-nav}"
  nav-link-active:
    textColor: "{colors.primary}"
  section-dark:
    backgroundColor: "{colors.on-primary-container}"
    textColor: "{colors.surface-variant}"
  section-light:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
  footer:
    backgroundColor: "{colors.on-primary-container}"
    textColor: "{colors.surface-variant}"
---
## Overview

Fundación Rubato es una fundación musical con sede en Barranquilla, Colombia. Su identidad visual combina la elegancia clásica de la música académica con un estilo limpio y contemporáneo. El sistema de diseño se basa en una paleta púrpura como color institucional, complementado con neutros suaves y un acento rosa para interacciones.

### Principios de diseño

- **Elegancia accesible**: La sofisticación de una institución musical clásica, sin perder cercanía.
- **Claridad**: Tipografía limpia, generoso espacio en blanco, jerarquía visual evidente.
- **Atemporalidad**: Un diseño que se sienta vigente hoy y en 10 años.

## Colors

La paleta gira en torno al **púrpura institucional** `#814D95`, presente en el logo, botones y acentos. Los fondos oscuros usan un púrpura profundo `#290239` para generar contraste dramático con secciones claras. Los neutros se mantienen en tonos suaves y limpios (`#F6F9F5`, `#FFFFFF`) que privilegian la legibilidad.

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#814D95` | Botón primario, logo, enlaces activos, acentos |
| `primary-container` | `#CBAED7` | Fondos de sección, bordes suaves |
| `primary-hover` | `#6A3D7A` | Hover de botón primario |
| `on-primary-container` | `#290239` | Fondos oscuros (navbar, footer), texto claro |
| `background` | `#F6F9F5` | Fondo general del sitio |
| `tertiary` | `#F6A0A9` | Acentos secundarios, hover de botones ghost |

### Contraste WCAG

- `primary` sobre `on-primary` (blanco): 4.8:1 ✓ (AA para texto grande)
- `on-primary-container` sobre blanco: 14.5:1 ✓ (AAA)
- Texto cuerpo `#091405` sobre `#F6F9F5`: 16:1 ✓ (AAA)

## Typography

Se usan dos familias:

- **Libre Baskerville** (serif) — Títulos, citas, texto con énfasis. Aporta el carácter clásico y formal de la música académica.
- **Avenir** (sans-serif) — Cuerpo, navegación, botones, etiquetas. Limpio, legible, contemporáneo. Se implementa con la pila `Avenir, Helvetica Neue, Helvetica, Arial, sans-serif` para garantizar consistencia en todos los sistemas.

La jerarquía tipográfica usa 4 niveles de heading y 3 de cuerpo, más variantes para navegación, botones y texto pequeño. Las citas en cursiva de Libre Baskerville se usan para frases destacadas y testimonios.

## Layout

El layout del sitio usa un ancho máximo de `1200px` centrado para escritorio. Las secciones se separan con `96px` de espacio vertical. El contenido se organiza en columnas simples o grids de 2-3 columnas según la página.

### Puntos de quiebre

| Rango | Dispositivo |
|-------|-------------|
| < 640px | Móvil |
| 640-1024px | Tablet |
| > 1024px | Escritorio |

### Patrones de layout

- **Hero**: Imagen de fondo a ancho completo + texto centrado superpuesto
- **Cards**: Grid de 2-4 cards para programas, eventos, equipo
- **Secciones divididas**: Mitad imagen, mitad texto (alternando izquierda/derecha)
- **Formularios**: Una columna, centrados, ancho máximo 600px

## Elevation & Depth

El sitio usa sombras sutiles para elevar cards y contenedores interactivos:

- **Cards y contenedores**: Sombra ligera `0 1px 4px rgba(0,0,0,0.1)`
- **Hover de cards**: Sombra con tinte púrpura `0 4px 12px rgba(129, 77, 149, 0.15)`
- **Header/Nav**: Sombra de separación `0 1px 2px rgba(0,0,0,0.08)`
- **Modales**: Sombra elevada `0 8px 24px rgba(0,0,0,0.2)`

Las secciones usan cambios de color de fondo (claro ↔ oscuro) como alternativa a la profundidad por sombra. La transición entre secciones es plana, sin solapamiento.

## Shapes

Las esquinas son predominantemente rectas con bordes redondeados suaves:

- **Botones**: `8px`
- **Cards**: `12px`
- **Inputs**: `8px`
- **Imágenes**: Sin redondeo (rectangulares)
- **Logo/Badge**: `9999px` (círculo)

No se usan bordes decorativos ni patrones. Las líneas divisorias son rectas y sutiles.

## Components

### Header
- Fondo oscuro `#290239`, texto claro
- Logo a la izquierda, navegación al centro, botón "Donar" a la derecha
- Menú responsive con hamburguesa en móvil
- Redes sociales como iconos (Facebook, Instagram, YouTube)

### Footer
- Fondo oscuro `#290239`, texto claro
- Dirección, email, teléfono en columna
- Logo pequeño y enlaces a redes

### Cards de programa
- Imagen superior, título, descripción corta
- Diseño de grid, mismo alto por fila
- Hover con sombra púrpura

### Formularios
- Input con borde `#CBAED7`, foco con `outline: 2px solid #814D95` (sin saltos de layout)
- Botón de envío = botón primario
- Etiquetas arriba del input, texto de ayuda abajo

### Botón Donar
- Variante del botón primario, pero más pequeño (`40px` alto)
- Destacado en el header con fondo púrpura
- También presente en páginas de apoyo
- Hover: mismo comportamiento que botón primario (`#6A3D7A`)

### Botón Ghost
- Botón de acento con color rosa `#F6A0A9` para acciones secundarias
- Sin borde ni fondo por defecto
- Hover con fondo lavanda `#CBAED7`

### Estados disabled
- Botones y inputs deshabilitados usan fondo `#F6F9F5` y texto gris `#4A4C4E`
- Cursor `not-allowed` para indicar estado inactivo

### Links en cuerpo de texto
- Color púrpura `#814D95` con subrayado
- Hover: púrpura oscuro `#6A3D7A`

## Do's and Don'ts

### Do
- Usar el púrpura `#814D95` para acciones principales y el logo
- Mantener generoso espacio en blanco entre secciones
- Usar Libre Baskerville en títulos para mantener el carácter formal
- Preferir el fondo oscuro `#290239` para header y footer
- Usar fotografía de alta calidad (los conciertos reales de la fundación)

### Don't
- No mezclar más de 2 colores brillantes en una misma sección
- No usar sombras exageradas — el sitio debe sentirse limpio y plano
- No usar la rosa `#F6A0A9` como color principal — es solo acento de hover
- No saturar el header con demasiados enlaces (máximo 7-8 items en el menú)
- No usar imágenes de stock frías — las fotos reales de la fundación son parte de la identidad

### Imágenes
- Fotografía con luz natural — evitar flashes duros y filtros fríos
- Preferir fotos de conciertos, ensayos y espacios reales de la fundación
- Las proyecciones de luces de escenario (coloridas) no deben competir con la UI — usar superposiciones oscuras o degradados sutiles cuando sea necesario
- Relación de aspecto consistente dentro de cada sección (cards, hero, equipo)
