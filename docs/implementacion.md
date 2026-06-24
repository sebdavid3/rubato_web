# Plan de Implementación — Fundación Rubato

> Migración de Wix → Astro 7 + TypeScript + Tailwind CSS v4
> Fecha: 24 Jun 2026

---

## 1. Resumen Ejecutivo

Se migrarán las ~20 URLs del sitio Wix actual de la Fundación Rubato a un sitio **estático generado con Astro 7**, deployado en **Cloudflare Pages**.

| Dimensión | Decisión |
|-----------|----------|
| **Framework** | Astro 7 (SSG, sin SSR) |
| **Lenguaje** | TypeScript (strict) |
| **Estilos** | Tailwind CSS v4 con design tokens del `design.md` |
| **Íconos** | Lucide (tree-shakeable, SVG inline) |
| **Formularios** | React Hook Form (islas React en Astro) |
| **Envío de correos** | Resend (API vía serverless function) |
| **Donaciones** | Fase posterior (Stripe, datos bancarios visibles mientras tanto) |
| **Tipografías** | Libre Baskerville (Google Fonts), Avenir (system font stack) |
| **Contenido** | Estático inline en `.astro` y objetos TypeScript — sin CMS ni MDX |
| **Deploy** | Cloudflare Pages (`git push` → build → deploy) |

**Lo que NO se construye ahora:**
- CMS / panel de administración
- Pasarela de donaciones con Stripe (solo datos bancarios)
- i18n / multi-idioma
- Autenticación / área de miembros
- Blog dinámico con base de datos

---

## 2. Arquitectura del Proyecto

### 2.1 Stack técnico

```
Astro 7 (SSG)
  ├── TypeScript (strict mode)
  ├── Tailwind CSS v4 (@tailwindcss/vite plugin)
  ├── @astrojs/react (islas para formularios interactivos)
  ├── react-hook-form + zod (validación de formularios)
  ├── resend (envío de correos desde endpoints serverless)
  ├── lucide-react (íconos)
  └── astro-seo / astro-sitemap (SEO y sitemap.xml)
```

### 2.2 Estructura de carpetas

```
rubato_web/
├── public/
│   ├── favicon.svg
│   ├── og-default.jpg          # Open Graph default image
│   └── images/
│       ├── inicio/             # Imágenes organizadas por página
│       ├── acerca-de-nosotros/
│       ├── conservatorio/
│       ├── cursos-libres/
│       ├── eventos/
│       ├── festival-rubato/
│       │   ├── mision-vision/
│       │   ├── invitados/
│       │   ├── cronograma/
│       │   └── inscripciones/
│       ├── filarmonica-juvenil/
│       │   ├── audiciones/
│       │   ├── requisitos/
│       │   ├── preparacion/
│       │   └── repertorio/
│       ├── riomar-quartet/
│       ├── orquesta-de-camara/
│       ├── apoyanos/
│       ├── contactanos/
│       └── team/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Base.astro           # <html>, <head>, SEO meta, fonts
│   │   │   ├── Header.astro         # Logo + nav + botón Donar + social icons
│   │   │   └── Footer.astro         # Dirección, email, teléfonos, social links
│   │   ├── ui/
│   │   │   ├── Button.astro         # Variantes: primary, secondary, donate, ghost
│   │   │   ├── Card.astro           # Card con imagen, título, descripción
│   │   │   ├── Input.astro          # Input con label, error, help text
│   │   │   ├── Select.astro         # Dropdown con label
│   │   │   ├── Textarea.astro       # Textarea con label
│   │   │   ├── Section.astro        # Contenedor de sección (light/dark)
│   │   │   ├── Container.astro      # max-w-[1200px] mx-auto px-6
│   │   │   ├── Badge.astro          # Etiqueta pequeña (ej: "Cerrado", "Nuevo")
│   │   │   └── Divider.astro        # Línea divisoria
│   │   ├── sections/
│   │   │   ├── Hero.astro           # Hero con imagen de fondo + texto
│   │   │   ├── ProgramCards.astro   # Grid de 2-4 cards de programas
│   │   │   ├── EventCard.astro      # Card individual de evento
│   │   │   ├── EventList.astro      # Lista de eventos con filtro/paginación
│   │   │   ├── TeamGrid.astro       # Grid de perfiles (foto, nombre, cargo)
│   │   │   ├── TeamMember.astro     # Card individual de miembro del equipo
│   │   │   ├── QuickInfoCards.astro # Grid de 3 cards (Misión, Eventos, Haz Parte)
│   │   │   ├── CtaSection.astro     # Sección de llamado a la acción
│   │   │   ├── PricingTable.astro   # Tabla de precios (cursos libres)
│   │   │   ├── BankInfo.astro       # Datos bancarios reutilizables
│   │   │   ├── InstrumentList.astro  # Grid de instrumentos con íconos
│   │   │   └── SocialLinks.astro    # Iconos de redes sociales
│   │   └── forms/
│   │       ├── ContactForm.tsx       # Formulario de contacto (React island)
│   │       ├── CourseForm.tsx        # Formulario de inscripción cursos (React island)
│   │       └── FestivalForm.tsx      # Formulario de inscripción festival (React island)
│   ├── data/
│   │   ├── site.ts                  # Nombre, tagline, redes sociales, datos de contacto
│   │   ├── navigation.ts            # Estructura del menú de navegación
│   │   ├── programs.ts              # Programas (Conservatorio, Filarmónica, etc.)
│   │   ├── events.ts                # Lista de eventos (título, fecha, lugar, descripción)
│   │   ├── team.ts                  # Miembros del equipo (nombre, cargo, foto, bio)
│   │   ├── festival-invitados.ts    # Invitados del festival
│   │   ├── festival-cronograma.ts   # Cronograma del festival
│   │   ├── courses-pricing.ts       # Precios de cursos libres
│   │   ├── instruments.ts           # Lista de instrumentos
│   │   ├── riomar-quartet.ts        # Integrantes del RioMar Quartet
│   │   ├── orquesta-camara.ts       # Integrantes Orquesta de Cámara
│   │   ├── repertorio.ts            # Repertorio de audiciones
│   │   ├── requisitos.ts            # Requisitos de audición
│   │   └── preparacion.ts           # Pasos de preparación para audición
│   ├── pages/
│   │   ├── index.astro                          # Inicio (landing page)
│   │   ├── acerca-de-nosotros.astro             # Acerca de Nosotros
│   │   ├── conservatorio.astro                  # Conservatorio Rubato
│   │   ├── cursos-libres.astro                  # Cursos Libres
│   │   ├── filarmonica-juvenil.astro            # Filarmónica Juvenil
│   │   ├── riomar-quartet.astro                 # RioMar Quartet
│   │   ├── orquesta-de-camara.astro             # Orquesta de Cámara
│   │   ├── apoyanos.astro                       # Apóyanos
│   │   ├── eventos.astro                        # Eventos
│   │   ├── contactanos.astro                    # Contáctanos
│   │   ├── team.astro                           # Portal Estudiantes
│   │   ├── book-online.astro                    # Reserva Online
│   │   ├── donaciones.astro                     # Donaciones (redirección)
│   │   ├── festival-rubato/
│   │   │   ├── index.astro                      # Festival — landing
│   │   │   ├── mision-vision.astro              # Festival — Misión y Visión
│   │   │   ├── invitados.astro                  # Festival — Invitados
│   │   │   ├── cronograma.astro                 # Festival — Cronograma
│   │   │   └── inscripciones.astro              # Festival — Inscripciones
│   │   ├── filarmonica-juvenil/
│   │   │   ├── audiciones.astro                 # Audiciones — landing
│   │   │   ├── requisitos.astro                 # Audiciones — Requisitos
│   │   │   ├── preparacion.astro                # Audiciones — Preparación
│   │   │   └── repertorio.astro                 # Audiciones — Repertorio
│   │   └── api/
│   │       ├── contact.ts                       # POST endpoint: envía email vía Resend
│   │       ├── course-inscription.ts            # POST endpoint: inscripción cursos
│   │       └── festival-inscription.ts          # POST endpoint: inscripción festival
│   ├── styles/
│   │   └── global.css                           # @import "tailwindcss", @theme, @layer
│   ├── types/
│   │   └── index.ts                             # Tipos compartidos (Event, TeamMember, etc.)
│   └── utils/
│       ├── constants.ts                         # URLs, emails, teléfonos, dirección
│       └── format.ts                            # Formateo de fechas, COP, etc.
├── astro.config.ts
├── tailwind.config.ts                           # (si se necesita para intellisense)
├── tsconfig.json
├── package.json
├── .gitignore
└── wrangler.toml                                # Config de Cloudflare Pages
```

### 2.3 Design Tokens → Tailwind v4

El `design.md` se traduce directamente al bloque `@theme` en `global.css`:

```css
@import "tailwindcss";

@theme {
  /* Colores */
  --color-primary: #814D95;
  --color-primary-hover: #6A3D7A;
  --color-primary-container: #CBAED7;
  --color-on-primary-container: #290239;
  --color-secondary: #1A1C1E;
  --color-tertiary: #F6A0A9;
  --color-background: #F6F9F5;
  --color-surface: #FFFFFF;
  --color-on-surface: #091405;
  --color-surface-variant: #F6F9F5;
  --color-on-surface-variant: #4A4C4E;
  --color-outline: #814D95;
  --color-outline-variant: #CBAED7;
  --color-error: #BA1A1A;

  /* Tipografía */
  --font-serif: "Libre Baskerville", Georgia, serif;
  --font-sans: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;

  /* Espaciado */
  --spacing-section: 6rem;       /* 96px */

  /* Radios */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Sombras */
  --shadow-card: 0 1px 4px rgba(0, 0, 0, 0.1);
  --shadow-card-hover: 0 4px 12px rgba(129, 77, 149, 0.15);
  --shadow-header: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.2);

  /* Máximo ancho */
  --max-width-site: 1200px;
  --max-width-form: 600px;
}

/* Capas utilitarias para tipografía */
@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-on-surface);
    background-color: var(--color-background);
  }
  h1, h2, h3, h4 {
    font-family: var(--font-serif);
  }
  h1 { font-size: 3rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; }
  h2 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.01em; }
  h3 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }
  h4 { font-size: 1.25rem; font-weight: 400; line-height: 1.35; }
}
```

---

## 3. Rutas y Componentes

### 3.1 Mapeo de rutas

| Ruta | Archivo | Tipo | Componentes clave |
|------|---------|------|-------------------|
| `/` | `index.astro` | Landing | Hero, ProgramCards, EventList (3 próximos), QuickInfoCards, CtaSection |
| `/acerca-de-nosotros` | `acerca-de-nosotros.astro` | Estática | Section (objeto social, principios), TeamGrid |
| `/conservatorio` | `conservatorio.astro` | Estática | Section × 5 (descripción, filosofía, trinity, instrumentos, pensum), BankInfo |
| `/cursos-libres` | `cursos-libres.astro` | Estática + Form | InstrumentList, PricingTable, BankInfo, CourseForm |
| `/filarmonica-juvenil` | `filarmonica-juvenil.astro` | Estática | Section, Cards de conciertos, CtaSection |
| `/filarmonica-juvenil/audiciones` | `audiciones.astro` | Informativa | Badge ("Cerrado"), enlaces a requisitos/preparación/repertorio |
| `/filarmonica-juvenil/requisitos` | `requisitos.astro` | Estática | Lista de requisitos |
| `/filarmonica-juvenil/preparacion` | `preparacion.astro` | Estática | Lista de pasos |
| `/filarmonica-juvenil/repertorio` | `repertorio.astro` | Estática | Lista de obras |
| `/festival-rubato` | `festival/index.astro` | Landing | Hero, Cards (misión/visión, invitados, cronograma, inscripciones) |
| `/festival-rubato/mision-vision` | `festival/mision-vision.astro` | Estática | Section (misión), Section (visión) |
| `/festival-rubato/invitados` | `festival/invitados.astro` | Estática | TeamGrid (artistas invitados) |
| `/festival-rubato/cronograma` | `festival/cronograma.astro` | Estática | Imagen de cronograma, fechas destacadas |
| `/festival-rubato/inscripciones` | `festival/inscripciones.astro` | Formulario | Beneficios, aviso legal, FestivalForm |
| `/riomar-quartet` | `riomar-quartet.astro` | Estática | TeamGrid (integrantes), texto de historia |
| `/orquesta-de-camara` | `orquesta-de-camara.astro` | Estática | TeamGrid, misión/visión |
| `/apoyanos` | `apoyanos.astro` | Estática + CTA | Section (donaciones), Section (voluntariado), BankInfo, Button (Donar) |
| `/eventos` | `eventos.astro` | Lista | EventList con todos los eventos, paginación client-side |
| `/contactanos` | `contactanos.astro` | Formulario | Info de contacto, ContactForm |
| `/team` | `team.astro` | Portal | 3 cards con enlaces externos (Google Sheets, Drive) |
| `/book-online` | `book-online.astro` | Externa | Mensaje "No disponible", o embed de calendario |
| `/donaciones` | `donaciones.astro` | Redirección | Redirige a `/apoyanos` (hasta que Stripe esté listo) |

### 3.2 Componentes compartidos

| Componente | Props | Reutilizado en |
|------------|-------|----------------|
| `Button` | `variant`, `href`, `size`, `disabled`, `icon` | Header, Hero, CTAs, formularios |
| `Card` | `image`, `title`, `description`, `href`, `tags` | Inicio (programas), Eventos, Conservatorio |
| `Section` | `variant` (light/dark), `id`, `padding` | Todas las páginas |
| `Container` | `as`, `size` | Todas las páginas |
| `Input` | `label`, `name`, `type`, `error`, `helpText`, `required` | Formularios |
| `BankInfo` | (sin props — datos fijos de `constants.ts`) | Conservatorio, Cursos Libres, Apóyanos |
| `SocialLinks` | `variant` (header/footer) | Header, Footer |
| `TeamGrid` | `members: TeamMember[]` | Acerca de, Festival/Invitados, Orquestas |
| `EventList` | `events: Event[]`, `limit?` | Inicio, Eventos |
| `CtaSection` | `title`, `description`, `buttonText`, `buttonHref` | Inicio, Filarmónica, Apóyanos |

---

## 4. Árbol de Componentes

```
Base.astro                           ← HTML shell, meta tags, fonts, global CSS
├── Header.astro
│   ├── Logo (link a /)
│   ├── Nav (desktop: horizontal, mobile: hamburger → drawer)
│   │   └── NavLink × 13
│   ├── SocialLinks (Facebook, Instagram, YouTube)
│   └── Button (variant="donate", href="/apoyanos")
│
├── <slot />                         ← Contenido de cada página
│   │
│   ├── [index.astro]
│   │   ├── Hero                     ← imagen de fondo, quote principal, CTA
│   │   ├── Section
│   │   │   └── ProgramCards         ← 4 cards de programas
│   │   ├── Section (variant="dark")
│   │   │   ├── EventCard × 3        ← próximos eventos
│   │   │   └── Button ("Ver todos")
│   │   ├── Section
│   │   │   └── QuickInfoCards       ← Misión, Eventos, Haz Parte
│   │   └── CtaSection               ← "Impulsa el futuro de la música..."
│   │
│   ├── [acerca-de-nosotros.astro]
│   │   ├── Section (objeto social)
│   │   ├── Section (principios)
│   │   ├── Section (misión + visión)
│   │   └── Section → TeamGrid
│   │       └── TeamMember × 5
│   │
│   ├── [conservatorio.astro]
│   │   ├── Section (descripción)
│   │   ├── Section (filosofía)
│   │   ├── Section (Trinity College)
│   │   ├── Section → InstrumentList
│   │   ├── Section (pénsum — lista de materias)
│   │   └── Section → BankInfo
│   │
│   ├── [cursos-libres.astro]
│   │   ├── Section → InstrumentList
│   │   ├── PricingTable
│   │   ├── BankInfo
│   │   └── Section → CourseForm (isla React)
│   │
│   ├── [festival-rubato/index.astro]
│   │   ├── Hero (festival)
│   │   └── Section → Card × 4 (subpáginas)
│   │
│   └── ... (resto de páginas)
│
└── Footer.astro
    ├── Logo (pequeño)
    ├── Dirección, Email, Teléfonos
    └── SocialLinks
```

---

## 5. Flujo de Datos

### 5.1 Contenido estático (sin CMS)

**Decisión**: No se usa CMS ni MDX. El contenido vive en archivos TypeScript dentro de `src/data/` y se importa directamente en los `.astro` pages. Esto es apropiado porque:

- El contenido cambia esporádicamente (eventos cada 2-3 meses, equipo cada año).
- Las ~20 páginas no justifican la complejidad de un CMS.
- Un cambio de contenido = PR + deploy automático en Cloudflare Pages (2 minutos).
- Si en el futuro se necesita un CMS, migrar de objetos TS a una API de contenido es trivial.

**Estructura de datos tipada:**

```ts
// src/types/index.ts
export interface Event {
  title: string;
  date: Date;
  location: string;
  description?: string;
  image?: string;
  tags?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  instrument?: string;  // para músicos
}

export interface Program {
  title: string;
  description: string;
  image: string;
  href: string;
  tags?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Instrument {
  name: string;
  icon: string; // nombre de ícono Lucide
}

// ... etc.
```

**Ejemplo de data file:**

```ts
// src/data/team.ts
import type { TeamMember } from "../types";

export const team: TeamMember[] = [
  { name: "Alfredo Reyes", role: "Director", image: "/images/acerca-de-nosotros/alfredo.jpg" },
  { name: "Steffin Hernandez", role: "Gerente", image: "/images/acerca-de-nosotros/steffin.jpg" },
  { name: "Victoria Garcia", role: "Asistente Administrativa", image: "/images/acerca-de-nosotros/victoria.jpg" },
  { name: "Sebastian Ibañez", role: "Gerente TI", image: "/images/acerca-de-nosotros/sebastian.jpg" },
  { name: "David Jiménez", role: "Asistente de Dirección", image: "/images/acerca-de-nosotros/david.jpg" },
];
```

### 5.2 Formularios → Resend

Los formularios son **islas React** (solo hidratan el componente del form, no toda la página). El flujo:

```
Usuario llena form → react-hook-form valida con zod
  → POST a /api/contact (Astro endpoint)
    → resend.emails.send() → email a fundacionrubato@gmail.com
  → Respuesta JSON { success: true }
→ UI muestra mensaje de confirmación
```

Las API routes de Astro solo se ejecutan en el servidor (no se envían al cliente):

```ts
// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  // validar con zod
  // enviar con resend
  // devolver respuesta
};
```

### 5.3 Eventos (lista dinámica)

La página `/eventos` muestra todos los eventos del array `events` en `src/data/events.ts`. No hay base de datos. Para añadir un evento se edita el archivo y se hace deploy. La paginación se hace client-side con un simple `slice()` en una isla React (o con un script vanilla).

---

## 6. Plan de Fases

### Fase 1: Fundación
**Objetivo**: Proyecto funcionando en local con Home page completa.

| Tarea | Descripción |
|-------|-------------|
| 1.1 | Inicializar proyecto Astro 7 (`npm create astro@latest`) |
| 1.2 | Configurar TypeScript strict, Tailwind v4, path aliases |
| 1.3 | Crear `global.css` con design tokens del `design.md` (§2.3) |
| 1.4 | Componente `Base.astro` (HTML shell, meta viewport, Google Fonts) |
| 1.5 | Componente `Container.astro` |
| 1.6 | Componente `Header.astro` (logo, nav desktop, botón Donar) |
| 1.7 | Componente `Footer.astro` |
| 1.8 | Componentes UI base: `Button`, `Section`, `Card` |
| 1.9 | Componente `Hero` |
| 1.10 | Componente `ProgramCards` |
| 1.11 | Componentes `EventCard`, `QuickInfoCards`, `CtaSection` |
| 1.12 | Data files: `site.ts`, `navigation.ts`, `programs.ts`, `events.ts` |
| 1.13 | Página `index.astro` (Home completa) |
| 1.14 | Menú responsive (hamburguesa) en Header |
| 1.15 | Deploy de prueba a Cloudflare Pages |

**Entregable**: Home page funcional y responsive en staging.

### Fase 2: Páginas Institucionales
**Objetivo**: Páginas de información institucional y contacto.

| Tarea | Descripción |
|-------|-------------|
| 2.1 | Data file `team.ts` |
| 2.2 | Componentes `TeamGrid`, `TeamMember` |
| 2.3 | Página `acerca-de-nosotros.astro` |
| 2.4 | Data file `site.ts` (dirección, teléfonos, emails) |
| 2.5 | Componente `SocialLinks` |
| 2.6 | Página `apoyanos.astro` (donaciones texto + datos bancarios + voluntariado) |
| 2.7 | Componente `BankInfo` (reutilizable) |
| 2.8 | Componentes de formulario: `Input`, `Textarea` (UI) |
| 2.9 | Formulario React: `ContactForm.tsx` (react-hook-form + zod) |
| 2.10 | API endpoint `api/contact.ts` (Resend) |
| 2.11 | Página `contactanos.astro` |
| 2.12 | Página `donaciones.astro` (redirige a `/apoyanos`) |
| 2.13 | Página `eventos.astro` (lista completa con todos los eventos) |

**Entregable**: Navegación institucional completa (Inicio, Acerca de, Contacto, Apóyanos, Eventos, Donar).

### Fase 3: Programas
**Objetivo**: Páginas de los 3 programas principales + audiciones.

| Tarea | Descripción |
|-------|-------------|
| 3.1 | Data files: `instruments.ts`, `courses-pricing.ts` |
| 3.2 | Componente `InstrumentList` |
| 3.3 | Componente `PricingTable` |
| 3.4 | Página `conservatorio.astro` |
| 3.5 | Formulario React: `CourseForm.tsx` (con upload de comprobante) |
| 3.6 | API endpoint `api/course-inscription.ts` |
| 3.7 | Página `cursos-libres.astro` |
| 3.8 | Página `filarmonica-juvenil.astro` |
| 3.9 | Data files: `requisitos.ts`, `preparacion.ts`, `repertorio.ts` |
| 3.10 | Página `filarmonica-juvenil/audiciones.astro` + Badge "Cerrado" |
| 3.11 | Página `filarmonica-juvenil/requisitos.astro` |
| 3.12 | Página `filarmonica-juvenil/preparacion.astro` |
| 3.13 | Página `filarmonica-juvenil/repertorio.astro` |

**Entregable**: Los 3 programas del menú principal completos con sus subpáginas.

### Fase 4: Festival y Ensembles
**Objetivo**: Ecosistema del festival y páginas de agrupaciones.

| Tarea | Descripción |
|-------|-------------|
| 4.1 | Data files: `festival-invitados.ts`, `festival-cronograma.ts` |
| 4.2 | Página `festival-rubato/index.astro` (landing con 4 cards) |
| 4.3 | Página `festival-rubato/mision-vision.astro` |
| 4.4 | Página `festival-rubato/invitados.astro` |
| 4.5 | Página `festival-rubato/cronograma.astro` |
| 4.6 | Formulario React: `FestivalForm.tsx` |
| 4.7 | API endpoint `api/festival-inscription.ts` |
| 4.8 | Página `festival-rubato/inscripciones.astro` |
| 4.9 | Data files: `riomar-quartet.ts`, `orquesta-camara.ts` |
| 4.10 | Página `riomar-quartet.astro` |
| 4.11 | Página `orquesta-de-camara.astro` |

**Entregable**: Festival completo (5 páginas) y páginas de agrupaciones.

### Fase 5: Extras y Pulido
**Objetivo**: Páginas secundarias, SEO, rendimiento, testing.

| Tarea | Descripción |
|-------|-------------|
| 5.1 | Página `team.astro` (Portal Estudiantes con enlaces externos) |
| 5.2 | Página `book-online.astro` |
| 5.3 | Sitemap automático (`@astrojs/sitemap`) |
| 5.4 | SEO: meta titles, descriptions, Open Graph tags en `Base.astro` |
| 5.5 | `public/robots.txt` |
| 5.6 | Structured data (JSON-LD): Organization, Event, BreadcrumbList |
| 5.7 | Imágenes: optimizar con `<Image />` de Astro, webp, lazy loading |
| 5.8 | Performance audit (Lighthouse → 90+ en todas las métricas) |
| 5.9 | Accesibilidad: contraste WCAG check, keyboard navigation, aria labels |
| 5.10 | Testing cross-browser (Chrome, Firefox, Safari, Edge) |
| 5.11 | Testing responsive (320px → 1920px, breakpoints del design.md) |
| 5.12 | Resolver inconsistencias del inventario de rutas con el cliente |

**Entregable**: Sitio completo, probado, optimizado y listo para producción.

---

## 7. Dependencias entre Vistas

```
                    ┌──────────────┐
                    │   Fase 1     │
                    │  Fundación   │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │   Fase 2     │ │   Fase 3     │ │   Fase 4     │
   │Institucional │ │  Programas   │ │  Festival +  │
   │              │ │              │ │  Ensembles   │
   └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                    ┌──────────────┐
                    │   Fase 5     │
                    │  Pulido      │
                    └──────────────┘
```

**Reglas de dependencia:**

- `Base.astro`, `Header.astro`, `Footer.astro` deben estar terminados antes que **cualquier página**.
- `Button.astro`, `Section.astro`, `Container.astro` deben estar listos antes de cualquier página que los use (Fase 1).
- `Card.astro` → requerido por Inicio, Eventos, Festival landing (Fase 1).
- `TeamGrid` / `TeamMember` → requerido por Acerca de (Fase 2), Festival/Invitados, Orquestas (Fase 4).
- `BankInfo` → requerido por Conservatorio (Fase 3), Cursos Libres (Fase 3), Apóyanos (Fase 2).
- `Input` / `Textarea` UI → requeridos por los formularios React (Fase 2+).
- Las Fases 2, 3 y 4 son **independientes entre sí** una vez terminada la Fase 1. Pueden ejecutarse en paralelo si hay más de un desarrollador.
- La Fase 5 depende de que todas las páginas estén construidas (Fases 1-4 completas).

---

## 8. Criterios de Aceptación por Fase

### Fase 1 ✓

- [ ] `npm run dev` arranca sin errores
- [ ] Home renderiza en < 2s en local
- [ ] Header con menú responsive funciona en mobile/tablet/desktop
- [ ] Footer renderiza correctamente
- [ ] Colores, tipografías, espaciados coinciden con `design.md`
- [ ] Deploy exitoso en Cloudflare Pages desde rama `main`

### Fase 2 ✓

- [ ] Las 5 páginas institucionales renderizan sin errores
- [ ] Navegación entre ellas funciona (todos los links del menú resuelven)
- [ ] Formulario de contacto envía email correctamente (verificar en bandeja de entrada)
- [ ] Validación de formulario muestra errores en español
- [ ] Página `/donaciones` redirige a `/apoyanos`
- [ ] Eventos muestra todos los eventos del Wix actual (los que apliquen — no eventos de años pasados)
- [ ] Datos bancarios visibles y correctos en `/apoyanos`

### Fase 3 ✓

- [ ] Las 3 páginas de programas + 4 subpáginas de audiciones renderizan
- [ ] Tabla de precios en cursos libres es legible en mobile
- [ ] Formulario de cursos permite adjuntar comprobante
- [ ] Datos bancarios consistentes en conservatorio y cursos libres
- [ ] Badge "Convocatoria cerrada" visible en audiciones
- [ ] Listas de instrumentos, materias, requisitos, pasos y repertorio se renderizan correctamente
- [ ] Navegación entre `/filarmonica-juvenil` y sus subpáginas funciona

### Fase 4 ✓

- [ ] Las 5 páginas del festival renderizan correctamente
- [ ] Cards de navegación en landing del festival enlazan a las subpáginas correctas
- [ ] Formulario de inscripción al festival funciona y envía email
- [ ] Perfiles de invitados con foto, nombre, descripción
- [ ] Páginas de RioMar Quartet y Orquesta de Cámara con integrantes y biografías
- [ ] Navegación del submenú del festival consistente

### Fase 5 ✓

- [ ] Sitemap generado y accesible en `/sitemap-index.xml`
- [ ] Todas las páginas tienen `<title>` y `<meta description>` únicos
- [ ] Open Graph tags funcionales (verificar con opengraph.xyz o similar)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95
- [ ] Imágenes usan `<Image />` de Astro con lazy loading y webp
- [ ] Navegación por teclado funciona en todas las páginas
- [ ] Colores cumplen contraste WCAG AA (verificado en axe DevTools)
- [ ] Sitio se ve correctamente en Chrome, Firefox, Safari, Edge
- [ ] Sitio se ve correctamente en 375px, 768px, 1024px, 1440px
- [ ] Portal estudiantes con enlaces externos funcionando
- [ ] Book online muestra estado "No disponible"
- [ ] Inconsistencias del inventario de rutas resueltas con el cliente
- [ ] `npm run build` completa sin errores ni warnings

---

## 9. Estrategia de Contenido

### 9.1 Fuente del contenido

Todo el contenido textual proviene de `scraped-content/content/*.md`. Estas son extracciones directas del Wix actual. El formato es **texto plano sin estructura semántica** — hay que reescribirlo en los archivos de datos y páginas.

### 9.2 Flujo de incorporación

Para cada página:

1. Leer el `.md` correspondiente en `scraped-content/content/`
2. Extraer texto relevante (títulos, párrafos, datos estructurados)
3. Separar contenido en dos destinos:
   - **Data files** (`src/data/`): datos estructurados y repetibles (eventos, equipo, instrumentos, precios)
   - **Inline en `.astro`**: texto libre, párrafos descriptivos, citas
4. Verificar consistencia con `inventario-rutas.md` (secciones, orden)
5. Verificar contra el Wix original si hay dudas

### 9.3 Imágenes

Las imágenes scraped están en `scraped-content/images/{pagina}/`. Flujo:

1. Copiar imágenes a `public/images/{pagina}/`
2. Optimizar: convertir a webp, redimensionar a tamaños razonables (hero: 1920px, cards: 800px, thumbs: 400px)
3. Usar `<Image />` de Astro con `srcset` para responsive images
4. Definir `width` y `height` explícitos para evitar CLS (Cumulative Layout Shift)
5. Agregar `alt` descriptivo en español a todas las imágenes

### 9.4 Inconsistencias por resolver

El inventario de rutas detectó 4 inconsistencias que deben resolverse con la fundación **antes de la Fase 5**:

| # | Inconsistencia | Impacto |
|---|---------------|---------|
| 1 | Dirección: Contacto dice "Calle 60", Footer dice "Calle 61" | Medio — hay que unificar |
| 2 | Teléfonos: Contacto dice "318 2808978", Footer dice dos números distintos | Alto — información de contacto debe ser única |
| 3 | `/galeria` da 404 en Wix — ¿existe o se elimina? | Bajo — no está en el inventario actual |
| 4 | Audiciones congelado desde 2023 — ¿mantener como histórico o eliminar? | Medio — decisión de contenido |

**Recomendación**: Marcar estos 4 puntos en un documento compartido con el cliente para resolver en una sola reunión de 15 minutos.

### 9.5 Contenido que cambia frecuentemente

| Contenido | Frecuencia estimada | Dónde vive | Cómo se actualiza |
|-----------|-------------------|------------|-------------------|
| Eventos | Cada 2-3 meses | `src/data/events.ts` | PR → merge → deploy |
| Precios de cursos | Anual | `src/data/courses-pricing.ts` | PR → merge → deploy |
| Equipo | Anual | `src/data/team.ts` | PR → merge → deploy |
| Invitados del festival | Por edición del festival | `src/data/festival-invitados.ts` | PR → merge → deploy |
| Cronograma del festival | Por edición | Imagen o data file | PR → merge → deploy |

Para todos los casos, el proceso es: editar archivo → PR → aprobar → merge → Cloudflare Pages hace deploy automático en < 2 minutos.

---

## 10. Estrategia de SEO

### 10.1 Metadata por página

Cada página `.astro` debe definir frontmatter o variables para:

```astro
---
// Todas las páginas deben definir al menos:
const title = "Conservatorio Rubato | Fundación Rubato";
const description = "Formación musical integral para niños y jóvenes en Barranquilla. Centro examinador autorizado de Trinity College London.";
const ogImage = "/images/conservatorio/hero.jpg";
---
```

`Base.astro` consume estas variables y genera:

```html
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href={Astro.url} />
```

### 10.2 Sitemap

Usar `@astrojs/sitemap` para generación automática. Se configura en `astro.config.ts`:

```ts
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.fundacionrubato.com",
  integrations: [sitemap()],
});
```

Esto genera `/sitemap-index.xml` con todas las rutas estáticas automáticamente.

### 10.3 Structured Data (JSON-LD)

Agregar datos estructurados en las páginas clave:

| Página | Schema | Propósito |
|--------|--------|-----------|
| Todas | `Organization` | Nombre, logo, dirección, teléfono, redes sociales |
| `/` | `WebSite` + `SearchAction` | Sitelinks search box |
| `/eventos` + `/` | `Event` (múltiple) | Rich results de eventos en Google |
| `/acerca-de-nosotros` | `Organization` (detallado) | Knowledge panel |
| `/conservatorio` | `EducationalOrganization` | Rich results educativos |

Ejemplo de implementación en `Base.astro`:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fundación Rubato",
  "url": "https://www.fundacionrubato.com",
  "logo": "https://www.fundacionrubato.com/favicon.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 61 #37-44",
    "addressLocality": "Barranquilla",
    "addressCountry": "CO"
  },
  "email": "fundacionrubato@gmail.com",
  "telephone": "+573245311718"
})} />
```

### 10.4 Performance para SEO

- **Astro SSG** → HTML plano sin JavaScript innecesario → indexación instantánea.
- **Tailwind v4** tree-shaking → solo las clases usadas van al CSS final.
- **Imágenes optimizadas** → webp, lazy loading, srcset → bajo LCP.
- **Sin fuente de datos externa** → cero waterfalls de red, HTML completo en primera carga.
- **Cloudflare Pages** → CDN global, HTTP/3, compresión brotli → TTFB bajo en Colombia y LatAm.

### 10.5 URLs canónicas

- Todas las URLs usan el dominio `https://www.fundacionrubato.com`.
- Redirigir `fundacionrubato.com` → `www.fundacionrubato.com` (configuración DNS/Cloudflare).
- Las URLs mantienen la estructura actual: `/acerca-de-nosotros`, `/festival-rubato/invitados`, etc. (sin cambios para preservar SEO existente).
- Cada página incluye `<link rel="canonical">` apuntando a sí misma.

### 10.6 Checklist SEO previo al lanzamiento

- [ ] Todas las páginas tienen `<title>` único (50-60 caracteres)
- [ ] Todas las páginas tienen `<meta description>` único (120-155 caracteres)
- [ ] Open Graph tags en todas las páginas
- [ ] `robots.txt` permite indexación completa
- [ ] Sitemap generado y accesible
- [ ] Google Search Console configurado con el nuevo dominio
- [ ] Redirecciones 301 si alguna URL cambió respecto al Wix original
- [ ] `h1` único por página, jerarquía de headings semántica (`h1` → `h2` → `h3`)
- [ ] Atributos `alt` en todas las imágenes
- [ ] Lighthouse SEO score ≥ 95
- [ ] URL canónica en cada página
- [ ] Structured data validado con [Schema Markup Validator](https://validator.schema.org/)

---

## Apéndice A: Comandos del proyecto

```bash
npm run dev          # Desarrollo local (localhost:4321)
npm run build        # Build de producción
npm run preview      # Previsualizar build de producción localmente
npm run lint         # ESLint + Astro check
npm run format       # Prettier
```

## Apéndice B: Variables de entorno necesarias

```env
# .env (NO commitear — se configura en Cloudflare Pages dashboard)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=formularios@fundacionrubato.com
```

## Apéndice C: Configuración de Cloudflare Pages

```toml
# wrangler.toml
name = "rubato-web"
compatibility_date = "2025-06-24"

[build]
command = "npm run build"
directory = "dist"

[env.production]
vars = { RESEND_API_KEY = "..." }
```
