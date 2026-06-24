# Contexto de Desarrollo — Fundación Rubato

> Documento maestro del proyecto. Punto de entrada para cualquier desarrollador.
> Proyecto: Migración Wix → Astro 7
> Fecha: 24 Jun 2026

---

## Mapa de documentos

```
docs/
├── contexto-desarrollo.md      ← ESTE ARCHIVO — punto de entrada
├── design.md                   ← Sistema de diseño (colores, tipografía, componentes)
├── implementacion.md           ← Plan de implementación (arquitectura, fases, dependencias)
├── inventario-rutas.md         ← Inventario completo del Wix actual (20 URLs)
└── vistas/                     ← Especificación por vista (21 archivos)
    ├── inicio.md
    ├── acerca-de-nosotros.md
    ├── festival-rubato.md
    ├── mision-vision.md
    ├── invitados.md
    ├── cronograma.md
    ├── inscripciones.md
    ├── conservatorio.md
    ├── cursos-libres.md
    ├── filarmonica-juvenil.md
    ├── audiciones.md
    ├── requisitos.md
    ├── preparacion-audicion.md
    ├── repertorio.md
    ├── riomar-quartet.md
    ├── orquesta-de-camara.md
    ├── apoyanos.md
    ├── eventos.md
    ├── contacto.md
    ├── portal-estudiantes.md
    └── reserva-online.md

scraped-content/
├── content/                    ← Texto extraído del Wix (20 archivos .md)
└── images/                     ← Imágenes extraídas del Wix (organizadas por página)
```

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 7 (Static Site Generation) |
| Lenguaje | TypeScript |
| Estilo | Tailwind CSS v4 |
| Iconos | Lucide |
| Formularios | React Hook Form + Zod + Resend (via Astro API routes) |
| Donaciones | Stripe (fase posterior) |
| Deploy | Cloudflare Pages o Netlify |

## Decisiones de arquitectura (no negociables)

- **No se usa CMS** — el contenido vive en archivos TypeScript en `src/data/`
- **No se usa MDX** — todo es `.astro` + data `.ts`
- **No se usa Formspree, Web3Forms ni multer** — formularios vía Astro API routes + Resend
- **Rutas anidadas** — las subpáginas cuelgan de su padre (ej. `/festival-rubato/2025/invitados`)
- **Fases secuenciales** — cada fase produce una versión desplegable

## Fases de implementación

| Fase | Contenido | Vistas |
|------|-----------|--------|
| 1 | Layout + Fundación | Layout global (Header/Footer), Inicio |
| 2 | Institucional + Eventos | Acerca de Nosotros, Contacto, Apóyanos, Eventos |
| 3 | Programas | Conservatorio, Cursos Libres, Filarmónica Juvenil + subpáginas |
| 4 | Festival + Ensembles | Festival, RioMar Quartet, Orquesta de Cámara |
| 5 | Extras + Polish | Portal Estudiantes, Reserva Online, SEO, deploy |

## Flujo de trabajo recomendado

1. Leer `design.md` (sistema de diseño)
2. Leer `implementacion.md` (arquitectura, estructura de carpetas)
3. Leer la vista específica en `vistas/[nombre].md`
4. Revisar `scraped-content/content/[nombre].md` (texto exacto del Wix)
5. Revisar `scraped-content/images/[nombre]/` (imágenes)
6. Implementar

## Features clave

### Ediciones del Festival
El Festival Internacional de Música se realiza **cada 2 años**. Cada edición tiene sus propios invitados, cronograma, misión/visión e inscripciones. Las rutas usan el patrón `/festival-rubato/[edicion]/...` (ej. `/festival-rubato/2025/invitados`). Los datos de cada edición viven en `src/data/festival-editions.ts` con una interfaz `FestivalEdition`. La landing `/festival-rubato` redirige a la edición activa.

### Venta de boletas con QR (futuro)
Feature planificada para después del lanzamiento. Los eventos podrán tener venta de boletas integrada con Stripe + generación de QR + envío por email. Documentada en `vistas/eventos.md` como "Feature futura", Fase 6 estimada.

## Contenido pendiente con el cliente

| Vista | Qué falta |
|-------|-----------|
| orquesta-de-camara | Nombres de integrantes, descripción |
| portal-estudiantes | URLs de Google Sheets/Drive |
| cronograma | Imagen o datos del cronograma real |
| contacto | Resolver inconsistencia dirección/teléfono |
| reserva-online | Definir si es placeholder o integración real |

## Enlaces rápidos

- [Sistema de diseño →](design.md)
- [Plan de implementación →](implementacion.md)
- [Inventario de rutas →](inventario-rutas.md)
- [Vista: Inicio →](vistas/inicio.md)
- [Vista: Acerca de Nosotros →](vistas/acerca-de-nosotros.md)
- [Vista: Conservatorio →](vistas/conservatorio.md)
