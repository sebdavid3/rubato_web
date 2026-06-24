# Filarmónica Juvenil de Barranquilla

- **Ruta:** /filarmonica-juvenil
- **Fase:** 3
- **Tipo:** estática

## Secciones

### 1. Hero
- **Descripción:** Título con imagen de fondo.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Filarmónica Juvenil de Barranquilla"
- **Imagen:** `scraped-content/images/filarmonica-juvenil/filarmonica-juvenil-img-0.jpg`

### 2. ¿Quiénes Somos?
- **Descripción:** Texto sobre el proyecto orquestal.
- **Componentes:** `section-light`, `h2` ("¿Quiénes Somos?"), `body-xl`.
- **Contenido:** "La Filarmónica Juvenil de Barranquilla es un proyecto que busca brindar la oportunidad a jóvenes de Barranquilla y los municipios aledaños, que hacen parte de diferentes procesos musicales de la ciudad, para conformar la orquesta y ser parte del mundo sinfónico."

### 3. Objetivo
- **Descripción:** Texto sobre el objetivo de la filarmónica.
- **Componentes:** `section-dark`, `h2` ("Objetivo"), `body-md`.
- **Contenido:** "Nuestro objetivo es formar jóvenes que con excelencia musical y de forma colectiva, la música les ayude a cambiar vidas, ser mejores personas y compartir todos sus conocimientos con los demás."

### 4. Temporadas de Conciertos
- **Descripción:** Información sobre las temporadas nacionales e internacionales.
- **Componentes:** `section-light`, `h2`, `body-md`, `card` (galería de conciertos).
- **Contenido:** "Con nuestra orquesta se realizarán diferentes temporadas de conciertos en el territorio nacional e internacional."
- **Imágenes:** `scraped-content/images/filarmonica-juvenil/filarmonica-juvenil-img-1.jpg` a `filarmonica-juvenil-img-8.jpg`

### 5. Contacto
- **Descripción:** Email de contacto de la filarmónica.
- **Componentes:** `card`, `body-md`, `link`.
- **Contenido:** "Si tienes dudas o quieres ponerte en contacto con nosotros, puedes comunicarte al correo filarmonicajuvenilbaq@gmail.com"

### 6. Donación para Insumos
- **Descripción:** CTA para donar y apoyar con instrumentos e insumos.
- **Componentes:** `section-dark`, `h2`, `body-md`, `button-donate`.
- **Contenido:** "Puedes contribuir con tu donación para insumos e instrumentos" → enlace: `/apoyanos`

### 7. Enlace a Audiciones
- **Descripción:** Enlace a la sección de audiciones.
- **Componentes:** `card`, `h3`, `body-md`, `button-primary`.
- **Contenido:** Información sobre convocatorias de audición → enlace: `/filarmonica-juvenil/audiciones`

## Datos estructurados

- `src/data/filarmonica/info.ts` — descripción, correo contacto, estado de convocatoria

## Notas de implementación

- Las imágenes de conciertos/giras pueden mostrarse como galería o carrusel.
- La CTA de donación usa `button-donate` (variante pequeña del primario) en lugar del botón primario estándar.
- El email `filarmonicajuvenilbaq@gmail.com` debe ser un `mailto:` clickeable.
- Las audiciones están cerradas desde 2023 según el Wix actual. Verificar con el cliente si se reactiva la convocatoria.
- Si no hay convocatoria activa, el enlace a `/filarmonica-juvenil/audiciones` debe mostrar un badge "Cerrado" o similar.
