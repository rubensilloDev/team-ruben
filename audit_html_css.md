# Auditoría Técnica HTML & CSS — Team Rubén

---

## 🔴 ERRORES CRÍTICOS

---

### `formulario.html` — Líneas 16–38 y 39–141

**Problema: `<header>` anidado dentro de `<header>`**

```html
<body>
  <header class="header-formulario">       <!-- Padre -->
    <header class="container-menu">        <!-- ❌ Hijo: header dentro de header -->
      <nav class="menu">...</nav>
    </header>
    <main>                                 <!-- ❌ main dentro de header -->
      <section class="hero-formulario">
        ...
      </section>
    </main>
    ...
    <footer>...</footer>                   <!-- ❌ footer dentro de header -->
  </header>
</body>
```

**Por qué está mal:** `<header>`, `<main>` y `<footer>` son elementos de sección de nivel de página. Anidar un `<header>` dentro de otro `<header>`, y colocar `<main>` y `<footer>` dentro de un `<header>`, rompe completamente el modelo de contenido HTML5. El `<header>` exterior `header-formulario` no tiene ningún uso semántico real y su única función es agrupar todo el `<body>`, lo que es incorrecto.

**Cómo arreglarlo:** Eliminar el `<header class="header-formulario">` completamente. La estructura debe ser plana:

```html
<body>
  <header class="container-menu">
    <nav class="menu">...</nav>
  </header>
  <main>
    <section class="hero-formulario">...</section>
    <div class="contenido-formulario">...</div>
  </main>
  <footer>...</footer>
</body>
```

---

### `formulario.html` — Líneas 121–138

**Problema: `<footer>` dentro de `<header>` (consecuencia del error anterior)**

El `<footer>` está anidado dentro del `<header class="header-formulario">`. Un footer nunca puede ser hijo de un header.

---

### `formulario.html` — Líneas 39–54

**Problema: `<main>` dentro de `<header>`**

El elemento `<main>` representa el contenido principal del documento. Nunca puede estar dentro de un `<header>`. El validador W3C marcará esto como error.

---

### `servicios.html` — Líneas 509–512

**Problema: `</div>` cierra mal el `<article>` de nutrición**

```html
        </div>        <!-- Cierra .contenido-servicio-cursos que abrió en línea 131 -->
        </article>    <!-- ❌ Pero el article de nutricion cierra DESPUÉS del div -->
    </section>
</div>
```

La indentación y estructura real es:
```
article#nutricion abre en línea 391
  div.contenido-servicio-cursos cierra en línea 511
</div>
</article>  ← ❌ article cierra fuera de donde debería
```

**Por qué está mal:** El `</div>` de la línea 511 pertenece a `.contenido-servicio-cursos` que se abrió en la línea 131, fuera del `<article>`. Eso significa que el `<article>` del curso de nutrición no está correctamente cerrado en su interior. Verifica con el validador HTML — hay una ruptura de árbol DOM aquí.

---

### `index.html` — Línea 450

**Problema: Espacio en blanco inútil al inicio del valor de clase**

```html
<div class=" legal">
```

Hay un espacio antes de `legal`. Aunque los navegadores lo toleran, es un error de escritura que puede fallar en selectores CSS estrictos y denota descuido. El mismo error aparece en **`servicios.html` línea 547** y **`formulario.html` línea 123**.

---

### `index.html` — Líneas 461–463 / `servicios.html` 558–560 / `formulario.html` 134–136

**Problema: `<a href="">` vacío en los iconos de RRSS**

```html
<a href=""><i class="ri-instagram-fill ..."></i></a>
```

**Por qué está mal:** Un `href=""` vacío hace que el enlace apunte a la misma página actual, recargándola al hacer clic. Si las redes sociales aún no tienen URL, usa `href="#"` o, mejor aún, `aria-disabled="true"` y gestiona el clic con JS, o elimina el `<a>` temporalmente.

---

## 🟠 ERRORES MEDIOS

---

### `style.css` — Líneas 711–718

**Problema: `display: inline-block` declarado dos veces en el mismo bloque**

```css
.servicio-tarjeta-boton a {
    display: inline-block;   /* ← primera vez */
    font-size: var(--texto-p);
    color: black;
    font-weight: bold;
    background-color: var(--acento-amarillo);
    border: 1px solid var(--acento-amarillo);
    display: inline-block;   /* ← segunda vez, línea 718 */
    ...
}
```

**Por qué está mal:** La propiedad `display` está declarada dos veces. La segunda sobreescribe a la primera. Es código duplicado sin sentido.

**Fix:** Eliminar la segunda declaración (línea 718).

---

### `style.css` — Líneas 1279–1300

**Problema: Selectores duplicados para animaciones de scroll del formulario**

```css
/* Ambos bloques tienen el MISMO selector */
.img-formulario.oculto,
.img-formulario.oculto { ... }   /* oculto dos veces */

.img-formulario.visible,
.img-formulario.visible { ... }  /* visible dos veces */

.formulario.oculto,
.formulario.oculto { ... }

.formulario.visible,
.formulario.visible { ... }
```

**Por qué está mal:** Los 4 bloques de CSS tienen el selector repetido en la coma (`.img-formulario.oculto, .img-formulario.oculto`). Es completamente redundante: selecciona el mismo elemento dos veces. Además, `.img-formulario.visible` anima con `translateY(0)` cuando el estado oculto era `translateX(-100px)` — los ejes no coinciden, lo que significa que la animación de entrada es incorrecta (el elemento vendrá de la izquierda pero terminará en Y:0, lo que puede producir un salto).

**Fix:**
```css
.img-formulario.oculto {
    opacity: 0;
    transform: translateX(-100px);
}
.img-formulario.visible {
    opacity: 1;
    transform: translateX(0);   /* ← coherente con el oculto */
}
```

---

### `style.css` — Líneas 1086–1121

**Problema: `.cta a` tiene `animation: cta-animation` que no existe definida**

```css
.cta a {
    animation: cta-animation 2s infinite;  /* ← keyframe NO existe en el archivo */
}
```

**Por qué está mal:** El keyframe `cta-animation` no está definido en ningún lugar de `style.css`. La animación simplemente no funciona y genera un warning en DevTools.

**Fix:** Define el keyframe o elimina la declaración `animation` de `.cta a`.

---

### `index.html` — Línea 62

**Problema: `.encabezados` usados con `<h3>` pero semánticamente son labels de sección decorativos**

```html
<h3 class="encabezados">- Nuestro Método -</h3>
<h2 class="titulos-secciones titulo-section1">¿Por qué el Team Rubén?</h2>
```

**Por qué está mal:** El `<h3>` viene antes del `<h2>` en el mismo bloque. En jerarquía de headings, `h3` implica que es hijo de un `h2` previo. Aquí se usa al revés: el `h3` es un "label decorativo" y el `h2` es el título real. Esto confunde a lectores de pantalla y bots de SEO que construyen el outline del documento.

**Fix:** Para los labels decorativos tipo "- Nuestro Método -" usa `<p class="encabezados">` o `<span>` en lugar de `<h3>`. Así el outline de headings queda limpio: `h1 → h2 → h3`.

El mismo problema aparece en múltiples secciones: líneas 93, 200, 244 de `index.html`, y `servicios.html` líneas 47, 61, 133.

---

### `servicios.html` — Línea 49

**Problema: Errores tipográficos en texto visible al usuario**

```
"ofreco" → "ofrezco"
"eleegir" → "elegir"
```

**Por qué está mal:** Son errores ortográficos en el texto de la página visible por los usuarios y motores de búsqueda.

---

### `servicios.html` — Línea 127

**Problema: `<br>` para separar secciones**

```html
</section>
<br>   <!-- ❌ -->
<section class="servicio cursos" ...>
```

**Por qué está mal:** `<br>` no debe usarse para crear espacio entre bloques. Es un elemento de flujo de texto, no un elemento de layout. El espacio entre secciones debe controlarse con CSS (`margin`, `padding`).

**Fix:** Eliminar el `<br>` y añadir `margin-top` a `.servicio.cursos` en CSS.

---

### `formulario.html` — Líneas 62–68

**Problema: Inconsistencia en clases de los campos del formulario**

```html
<!-- Campo 1: usa clase "input-campos" -->
<input class="input-campos input-requerido" type="text" id="nombre-apellidos" ...>

<!-- Campo 2: usa clase "campos" (que es la clase del contenedor div, no del input) -->
<input class="campos input-requerido" type="email" id="email" ...>

<!-- Campo 3: igual, clase "campos" en el input -->
<input class="campos input-requerido" value="+34 " type="tel" id="telefono" ...>
```

**Por qué está mal:** El primer `<input>` tiene clase `input-campos` (correcta). Los inputs de email y teléfono tienen clase `campos` — la misma clase que tienen los `<div>` contenedores. Esto mezcla estilos de contenedor con estilos de input. En CSS, `.campos` tiene `display: flex; flex-direction: column` que se aplicaría al `<input>`, lo cual es incorrecto.

**Fix:** Unificar todos los inputs con la clase `input-campos`.

---

### `style.css` — Líneas 908–921

**Problema: Doble declaración de `font-size` en `.planes ul li`**

```css
.planes ul {
    font-size: var(--texto-p);  /* ← declarado en el padre */
    ...
}

.planes ul li {
    color: rgb(220, 220, 220);
    font-family: var(--fuente-textos);
    font-size: var(--texto-p);  /* ← repetido en el hijo (hereda del padre igualmente) */
    margin: 15px auto;
}
```

**Por qué está mal:** `font-size` se hereda del padre, por lo que declararlo igual en el hijo es redundante. Además hay un `gap: 15px` en `ul` y también `margin: 15px auto` en `li`, acumulando espacio de forma innecesaria.

---

### `index.html` — Línea 281

**Problema: Clase `.container-titulo-sections` (sin "s") en lugar de `.container-titulos-sections`**

```html
<div class="container-titulo-sections">   <!-- ← typo: falta la "s" -->
```

En el resto de secciones se usa `.container-titulos-sections`. En CSS no existe definida `.container-titulo-sections`, por lo que esta sección (section5/Planes) no hereda ningún estilo del contenedor de títulos.

---

### `style.css` — Línea 272–278

**Problema: `background-color` sobreescrito inmediatamente por `background`**

```css
.hero {
    background-color: #1e1e1e;               /* ← declarado */
    background: linear-gradient(...);        /* ← sobreescribe el anterior */
}
```

**Por qué está mal:** `background` es shorthand que resetea todas las sub-propiedades de background, incluyendo `background-color`. La primera declaración es completamente inútil.

**Fix:** Eliminar `background-color: #1e1e1e` ya que `background` ya define el fondo.

---

### `formulario.html` — Líneas 531–537 (popup en `servicios.html`)

**Problema: Inputs del popup sin `<label>` asociado**

```html
<input type="text" id="popup-nombre" placeholder="Nombre" />
<input type="text" id="popup-apellidos" placeholder="Apellidos" />
<input type="email" id="popup-email" placeholder="Tu correo Gmail" />
```

**Por qué está mal:** Los inputs no tienen `<label>` asociado. Confiar únicamente en `placeholder` es una mala práctica de accesibilidad: los `placeholder` desaparecen al escribir, no son leídos de forma consistente por lectores de pantalla, y tienen bajo contraste por defecto.

**Fix:**
```html
<div class="campo-popup">
  <label for="popup-nombre">Nombre</label>
  <input type="text" id="popup-nombre" placeholder="Nombre" />
</div>
```

---

### `servicios.html` — Línea 391

**Problema: Acento en nombre de clase CSS**

```html
<article id="nutricion" class="contenido-curso curso-nutrición">
```

En CSS, líneas 1603 y 1612:
```css
.curso-nutrición { ... }
```

**Por qué está mal:** Usar caracteres acentuados (`ó`) en nombres de clase CSS es técnicamente válido en CSS3 pero es una pésima práctica: puede causar problemas en ciertos entornos, editores que no guarden en UTF-8, y herramientas de build. Los selectores con caracteres especiales requieren escape en algunos contextos de JS (`querySelector`).

**Fix:** Renombrar a `.curso-nutricion` (sin tilde) en HTML y CSS.

---

## 🟡 MEJORAS RECOMENDADAS

---

### `style.css` — General

**Problema: Archivo de 2651 líneas sin arquitectura clara**

El CSS está organizado por sección de página, pero mezcla estilos base, componentes, layouts y media queries de forma que escala mal. Por ejemplo:
- Los keyframes están al inicio ✅
- Pero los estilos de formulario, popup y legales están intercalados entre los responsivos
- El responsive está todo al final en un único bloque `@media` ✅, lo cual es correcto, pero los estilos de cada página están mezclados sin separación visual clara entre páginas

**Mejora sugerida:** Añadir un índice comentado al inicio del archivo o dividir en múltiples archivos CSS importados (`base.css`, `components.css`, `pages/index.css`, etc.) si el proyecto crece.

---

### `style.css` — Líneas 119–131

**Problema: Fuentes declaradas sin comillas simples consistentes y sin fallback genérico en `<i>`**

```css
h1, h2, h3, h4 {
    font-family: 'Montserrat';   /* ← sin fallback genérico */
}
p, span, a {
    font-family: 'Inter';        /* ← sin fallback genérico */
}
```

La regla en `:root` sí tiene `sans-serif` como fallback (`var(--fuente-titulos)`), pero aquí se usan los literales sin fallback.

**Fix:**
```css
h1, h2, h3, h4 {
    font-family: var(--fuente-titulos);
}
p, span, a {
    font-family: var(--fuente-textos);
}
```

---

### `index.html` / `servicios.html` / `formulario.html` — Botones del carrusel y acordeón

**Problema: Falta `aria-label` en botones sin texto visible**

```html
<button class="carrusel-btn botonAnterior-carrusel">
    <i class="ri-arrow-left-s-line"></i>   <!-- solo icono, sin texto -->
</button>
```

**Por qué está mal:** Un lector de pantalla leerá este botón como "botón" sin más información. Los usuarios con discapacidad visual no sabrán qué hace.

**Fix:**
```html
<button class="carrusel-btn botonAnterior-carrusel" aria-label="Anterior">
    <i class="ri-arrow-left-s-line" aria-hidden="true"></i>
</button>
```

---

### `style.css` — Líneas 1593–1618

**Problema: Conflicto semántico entre clase `.visible` del scroll y `.visible` de las pestañas de cursos**

```css
/* Clase de scroll (scroll observer) */
.visible {
    opacity: 1;
    transition: opacity 1s ease, transform 1s ease;
}

/* Clase de pestaña activa */
.pestaña-curso.visible {
    background: var(--acento-amarillo);
    color: black;
    font-weight: bold;
}
```

**Por qué está mal:** La clase `.visible` se usa tanto para el sistema de scroll animations como para indicar la pestaña de curso activa. Son dos conceptos completamente distintos compartiendo el mismo nombre. Esto puede generar colisiones imprevistas si en algún momento el Intersection Observer pone `.visible` en un botón de pestaña.

**Fix:** Renombrar la clase de pestaña activa a `.pestaña-activa` tanto en CSS como en JS.

---

### `servicios.html` — Líneas 22–25 / `index.html` líneas 23–26

**Problema: El menú hamburguesa usa `<div>` donde semánticamente debería ser `<button>`**

```html
<div id="menu-hamburguesa" class="svg-menu-hamburguesa">
    <div class="linea-menu"></div>
    <div class="linea-menu"></div>
</div>
```

**Por qué está mal:** Un `<div>` no es interactivo por defecto. Para que sea accesible debería tener `role="button"`, `tabindex="0"` y manejadores de teclado. Un `<button>` ya incluye todo esto nativamente.

**Fix:**
```html
<button id="menu-hamburguesa" class="svg-menu-hamburguesa" aria-label="Abrir menú" aria-expanded="false">
    <span class="linea-menu"></span>
    <span class="linea-menu"></span>
</button>
```

---

### `index.html` — Línea 43

**Problema: El `id="inicio"` está en el `<h1>`, no en la sección**

```html
<h1 id="inicio">Asesoría Fitness Online...</h1>
```

El menú enlaza a `href="#inicio"` y también el logo del nav `href="#inicio"`. El ancla apunta al `<h1>` directamente. Aunque funciona, es más correcto poner el `id` en la `<section class="hero">` para que el scroll lleve al inicio completo de esa sección.

---

### `style.css` — Línea 100–106

**Problema: `max-width: 100%` en el reset universal**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100%;   /* ← en el selector universal */
}
```

**Por qué está mal:** Aplicar `max-width: 100%` a todos los elementos puede producir comportamientos inesperados en elementos como `<table>`, `<svg>`, elementos posicionados absolutamente, etc. La intención es evitar overflow horizontal en imágenes, pero la práctica correcta es aplicarlo solo a `img, video, iframe`.

**Fix:**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

img, video, iframe {
    max-width: 100%;
}
```

---

### `style.css` — Líneas 241–243

**Problema: `!important` innecesario en `.boton-importante`**

```css
.boton-importante {
    background-color: var(--acento-amarillo) !important;
}
```

No hay ningún estilo más específico que compita con `.boton-importante` para `background-color`. El `!important` es innecesario y dificulta el mantenimiento.

---

### `servicios.html` — Línea 27

**Problema: `width` y `height` con unidades `px` en atributos HTML**

```html
<img class="logo" src="..." alt="Logo" width="300px" height="200px">
```

**Por qué está mal:** Los atributos HTML `width` y `height` no aceptan unidades. El valor debe ser un número sin `px`. Con unidades, el atributo es ignorado como hint de proporción para el navegador, lo que puede causar CLS (Cumulative Layout Shift).

**Fix:** `width="300" height="200"` (sin `px`).

---

### `style.css` — Línea 1567

**Problema: Nombre de clase con caracteres especiales en CSS**

```css
.pestañas-cursos { ... }
.pestaña-curso { ... }
```

La `ñ` es un carácter no-ASCII en nombres de selectores. Aunque CSS3 lo permite, es una práctica desaconsejada por los mismos motivos que los acentos.

**Fix:** Renombrar a `.pestanas-cursos` y `.pestana-curso`.

---

### `style.css` — Líneas 1695–1707

**Problema: `color: black !important` innecesario**

```css
.container-dossierCursos-pdf button {
    color: black !important;
}
.container-dossierCursos-pdf a {
    color: black !important;
}
```

El `!important` aquí sugiere que hay algún estilo global que pisa el color. La causa es la regla global `footer a { color: var(--acento-amarillo) }`. Si el botón no está dentro de un footer, el `!important` es innecesario. Si está dentro, sería mejor aumentar la especificidad en lugar de usar `!important`.

---

## ✅ COSAS BIEN HECHAS

- **Sistema de custom properties en `:root`** bien estructurado con tokens para colores, tipografías y tamaños.
- **Keyframes al inicio del CSS**, antes de los estilos, correcta organización.
- **Uso de `backdrop-filter: blur()`** en el menú, buen efecto glassmorphism.
- **`clip-path` en hero y footer** para dar forma dinámica, bien ejecutado.
- **Animaciones de scroll con Intersection Observer** en lugar de eventos `scroll`, correcta elección de performance.
- **`<meta name="description">` y `<meta name="keywords">`** presentes en todas las páginas.
- **`lang="es"` en `<html>`**, correcto.
- **`<label for="">` vinculados a inputs** en `formulario.html` (los del formulario principal, no del popup).
- **Alt text en imágenes** — la mayoría tienen alt descriptivo correcto.
- **Separación de JS en módulos** (`type="module"`) y archivos separados por página.
- **CSS responsive bien organizado** en bloques `@media` al final del archivo con comentarios.

---

## 📋 RESUMEN EJECUTIVO

### 🔴 Errores Críticos (3)
| # | Archivo | Problema |
|---|---------|---------|
| 1 | `formulario.html` L16-141 | `<header>` anidado dentro de `<header>`, con `<main>` y `<footer>` dentro del header exterior |
| 2 | `servicios.html` L509-512 | Ruptura del árbol DOM en el cierre del `<article>` del curso de nutrición |
| 3 | `style.css` L1119 | Keyframe `cta-animation` referenciado pero no definido — animación rota |

### 🟠 Errores Medios (10)
| # | Archivo | Problema |
|---|---------|---------|
| 1 | `style.css` L711-718 | `display: inline-block` declarado dos veces |
| 2 | `style.css` L1279-1300 | Selectores duplicados + ejes de animación incoherentes |
| 3 | `index.html` L62 + varios | `<h3>` antes de `<h2>` en mismo bloque — jerarquía de headings incorrecta |
| 4 | `formulario.html` L62-68 | Clases inconsistentes en inputs (`campos` vs `input-campos`) |
| 5 | `index.html`/`servicios.html`/`formulario.html` | `href=""` vacío en enlaces de RRSS |
| 6 | `index.html` L450 + 2 más | Espacio inicial en valor de clase (`class=" legal"`) |
| 7 | `style.css` L272 | `background-color` declarado antes de `background` (shorthand sobreescribe) |
| 8 | `servicios.html` L391 | Acento en nombre de clase CSS (`curso-nutrición`) |
| 9 | `servicios.html` L127 | `<br>` para separar secciones |
| 10 | `servicios.html` L49 | Errores tipográficos en texto visible: "ofreco", "eleegir" |

### 🟡 Mejoras Recomendadas (8)
| # | Área | Mejora |
|---|------|--------|
| 1 | Accesibilidad | Botones del carrusel y hamburguesa sin `aria-label` |
| 2 | Accesibilidad | Inputs del popup sin `<label>` |
| 3 | CSS | `max-width: 100%` en selector `*` — aplicar solo a `img, video, iframe` |
| 4 | CSS | `!important` innecesario en `.boton-importante` y botones de dossier |
| 5 | CSS | Conflicto semántico de clase `.visible` (scroll vs pestañas) |
| 6 | CSS | Fuentes tipográficas sin usar las variables CSS definidas en `:root` |
| 7 | HTML | `<div>` para menú hamburguesa en lugar de `<button>` |
| 8 | HTML/CSS | Nombres de clase con `ñ` y tildes (`pestañas-cursos`, `curso-nutrición`) |
