# Apóyanos

- **Ruta:** /apoyanos
- **Fase:** 2
- **Tipo:** estática + CTA

## Secciones

### 1. Hero
- **Descripción:** Título con imagen.
- **Componentes:** `h1`, `section-dark`.
- **Contenido:** "Apóyanos"
- **Imagen:** `scraped-content/images/apoyanos/apoyanos-img-0.jpg`

### 2. Introducción
- **Descripción:** Texto sobre la importancia del apoyo comunitario.
- **Componentes:** `section-light`, `h2` ("¿Quieres hacer parte de nuestro equipo?"), `body-xl`.
- **Contenido:** "Este lindo proyecto no sería posible sin el apoyo y el amor de la comunidad desde Barranquilla y el resto del mundo, en el cual brindamos distintos canales de ayuda."

### 3. Donaciones
- **Descripción:** Sección sobre donaciones monetarias y cómo apoyar.
- **Componentes:** `section-light`, `h2` ("Donaciones"), `h3` ("¿Cómo hacerlo?"), `body-md`.
- **Contenido:**
  - "La Fundación Rubato es la institución que auspicia y brinda ayuda a los jóvenes y niños de escasos recursos para que puedan estudiar música y tocar en nuestra filarmónica. Para que este lindo proyecto siga creciendo cada día, necesitamos tu apoyo, ya sea que estés aquí en Barranquilla, Colombia o en otro lugar del mundo."
  - "¿Cómo puedes apoyarnos?"
    - ✅ Con donación de dinero a través de este sitio.
    - ✅ Participando en nuestros conciertos y actividades de recaudación de fondos.
    - ✅ Compartiendo y difundiendo nuestras publicaciones y actividades.
  - "Asimismo, con tu donación puedes darle la oportunidad a que un niño disponga de un instrumento para sus clases y prácticas, tenga acceso a una movilidad confiable a la sede la fundación, cuente con un buen refrigerio en sus recesos, estos entre otros beneficios."

### 4. Datos Bancarios
- **Descripción:** Información de cuenta para donaciones.
- **Componentes:** `card`, `body-md`, `label-small`.
- **Contenido:**
  - No. Cuenta: **442-000033-40**
  - Tipo: Ahorros
  - Banco: Bancolombia
  - Nombre: Fundación Rubato
  - NIT: 901559056

### 5. Voluntariado
- **Descripción:** Información sobre cómo ser voluntario.
- **Componentes:** `section-dark`, `h2` ("Voluntarios"), `body-md`, `button-secondary`.
- **Contenido:** "Puedes apoyarnos siendo parte del comité de Staff y de esa forma colaborar a la organización de nuestros conciertos."

### 6. CTA Donación en Línea
- **Descripción:** Botón destacado para donación en línea.
- **Componentes:** `section-dark`, `h2` ("En Línea"), `button-donate`.
- **Contenido:** "Haz tu donación aquí." → enlace: `/donaciones` (o pasarela de pagos externa)

## Datos estructurados

- `BankInfo` component + `src/utils/constants.ts` — cuenta, tipo, banco, nombre, NIT (compartido con conservatorio y cursos-libres)

## Notas de implementación

- Los datos bancarios se repiten en conservatorio, cursos-libres y apoyanos. Centralizar en `BankInfo` component + `src/utils/constants.ts` y reutilizar.
- El botón "Haz tu donación aquí" debe usar `button-donate` (variante compacta del primario, 40px alto) y enlazar a una pasarela de pagos (Stripe, PayPal, etc.).
- Las 3 formas de apoyar (dinero, conciertos, difusión) pueden presentarse como cards con iconos (check verde, ícono de música, ícono de compartir).
- La sección de voluntariado en `section-dark` y la de donación en línea en `section-dark` crean un llamado a la acción fuerte al final de la página.
