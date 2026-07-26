# Studio Ohana — Sitio Web de Sublimación Personalizada

Landing page premium con scroll storytelling para **Studio Ohana**, negocio de sublimación personalizada (playeras, tazas, gorras, termos, vasos de vidrio, tarros y rompecabezas).

---

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Astro 5** | Meta-framework, generación estática, SEO nativo |
| **React 19 + TypeScript** | Componentes interactivos (Islands) |
| **Tailwind CSS v4** | Estilos utilitarios + dark/light mode |
| **Anime.js v4** | **Todas** las animaciones: revelaciones scroll (`onScroll`), split de texto, stagger, parallax, micro-interacciones |
| **Three.js** | Escena 3D iridiscente del Hero (icosfera deformable + luces neón) |
| **Lenis** | Smooth scrolling (detectado nativamente por `onScroll` de anime.js) |
| **@astrojs/sitemap** | Sitemap automático para SEO |

> **Dirección de diseño:** Bold / maximalista — negro profundo + neón saturado (cian, magenta, lima, violeta, naranja), tipografía gigante (Anton + Space Grotesk), grano, marquees y 3D. La paleta full-color refleja que la sublimación imprime **cualquier** color.

> **Nota:** Se eliminó GSAP/ScrollTrigger. El scroll-driven ahora usa la API `onScroll()` de anime.js v4, que detecta el scroll real de Lenis sin la desincronización que causaba tirones.

---

## Requisitos

- **Node.js** >= 18 (recomendado 20+)
- **pnpm** >= 8

## Instalación y desarrollo

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor de desarrollo
pnpm dev

# 3. Abrir en navegador
# http://localhost:4321
```

## Comandos

| Comando | Acción |
|---------|--------|
| `pnpm dev` | Servidor de desarrollo con hot-reload |
| `pnpm build` | Build estático en `dist/` |
| `pnpm preview` | Vista previa del build local |
| `pnpm astro` | CLI de Astro (diagnóstico, checks) |

---

## Estructura del proyecto

```
studio-ohana/
├── public/                          # Archivos estáticos (imágenes, fuentes)
│   └── images/
│       ├── logo.svg                 # Logo actual
│       ├── og-image.svg             # Open Graph preview
│       ├── placeholder.svg          # Placeholder genérico
│       ├── productos/               # ← COLOCA AQUÍ LAS IMÁGENES REALES
│       └── proceso/                 # Íconos del proceso
├── src/
│   ├── components/
│   │   ├── react/                   # Componentes interactivos (React Islands)
│   │   │   ├── HeroScene.tsx        # Fondo 3D con Three.js
│   │   │   ├── Navbar.tsx           # Navegación glassmorphism
│   │   │   ├── ThemeToggle.tsx      # Switch dark/light mode
│   │   │   ├── AboutSection.tsx     # Historia de la marca
│   │   │   ├── StatsSection.tsx     # Contadores animados
│   │   │   ├── ProductSection.tsx   # Showcase de cada producto (×7)
│   │   │   ├── ProcessTimeline.tsx  # Línea de tiempo del proceso
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── ContactForm.tsx      # Formulario con validación
│   │   │   ├── FAQ.tsx              # Preguntas frecuentes
│   │   │   ├── CTASection.tsx       # Call to action final
│   │   │   ├── Footer.tsx           # Footer completo
│   │   │   └── SmoothScroll.tsx     # Lenis wrapper
│   │   └── ui/                      # Componentes atómicos
│   ├── layouts/
│   │   └── BaseLayout.astro         # SEO, fonts, Schema.org, OG
│   ├── pages/
│   │   └── index.astro              # Landing page (scroll único)
│   ├── styles/
│   │   └── globals.css              # Tailwind v4 + variables dark/light
│   ├── hooks/
│   │   ├── useTheme.tsx             # Context + localStorage
│   │   └── useScrollAnimations.ts   # Hooks GSAP reutilizables
│   ├── lib/
│   │   └── animations.ts            # Utilidades de animación GSAP
│   └── data/
│       └── data.json                # ← TODOS LOS CONTENIDOS EDITABLES
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Cómo modificar contenidos

### 1. Textos, productos y datos de la empresa

Todo el contenido se maneja desde un solo archivo:

**`src/data/data.json`**

```json
{
  "company": {
    "name": "Studio Ohana",
    "tagline": "Donde tus ideas cobran vida",
    "contact": {
      "address": "Tu dirección aquí",
      "phone": "+52 555 123 4567",
      "email": "hola@studioohana.com",
      "social": {
        "instagram": "https://instagram.com/tu-cuenta",
        "facebook": "https://facebook.com/tu-cuenta",
        "tiktok": "https://tiktok.com/@tu-cuenta"
      }
    }
  },
  "products": [
    {
      "id": "playeras",
      "name": "Playeras",
      "description": "Tu descripción aquí...",
      "images": ["/images/productos/playeras-1.jpg"],
      "features": ["Característica 1", "Característica 2"],
      "animation": "slideLeft"
    }
    // Agrega más productos siguiendo esta estructura
  ]
}
```

### 2. Imágenes

Coloca las imágenes reales en `public/images/productos/` con los nombres que referencias en `data.json`. Formatos recomendados: **WebP** o **JPG**, 1200×900px mínimo.

### 3. Colores y estilos globales

Edita **`src/styles/globals.css`**:

- Variables CSS en `:root` (light) y `.dark` (dark)
- Color acento: `--color-accent: #C9A96E` (dorado)
- Tipografía: Playfair Display (títulos) + Inter (cuerpo)

### 4. Agregar/quitar productos

1. Agrega o remueve objetos del array `products` en `data.json`
2. Los productos se renderizan automáticamente en orden
3. Las imágenes placeholder aparecen si no hay imagen disponible

### 5. Dark/Light mode

El toggle está en la navbar. Tema se guarda en `localStorage`. Para ajustar colores por tema, edita las variables CSS en `globals.css`.

---

## SEO

El layout incluye automáticamente:

- **Meta tags** — description, keywords, author, theme-color
- **Open Graph** — título, descripción, imagen OG para redes sociales
- **Twitter Card** — vista previa en X/Twitter
- **Schema.org** — datos estructurados de tipo `LocalBusiness`
- **Sitemap** — generado automáticamente con `@astrojs/sitemap`

Para modificar los valores SEO, edita `data.json` → `seo`.

---

## Animaciones

Todas las animaciones viven en **`src/lib/anime.ts`** (helpers reutilizables sobre anime.js v4) y respetan `prefers-reduced-motion`.

### Helpers principales

| Helper | Uso |
|--------|-----|
| `reveal(targets, opts)` | Revelación al entrar al viewport (`onScroll`), con `stagger` opcional |
| `splitReveal(el)` | Divide el título en caracteres y los revela con efecto cortina (máscara `clip`) |
| `parallaxY(el, dist)` | Parallax ligado al progreso de scroll (`sync`) |
| `scrubScale(el, trigger)` | Barra de progreso escalada con el scroll |
| `glitchIn(el)` | Aparición tipo glitch (jitter de transform) |

### Anti-bugs respecto a la versión anterior

- **Lenis ↔ scroll sincronizado:** `onScroll()` de anime.js escucha el scroll real de Lenis → sin tirones.
- **Sin animaciones en conflicto:** cada elemento se anima una sola vez (antes el tagline se animaba con GSAP *y* anime.js a la vez).
- **Sin contenido invisible:** `html:not(.js) [data-anim]` deja todo visible si el JS no carga.
- **Easing v4 correcto:** se usa `ease` (no el `easing` de v3, que estaba roto).

### Escena 3D (Three.js)

El `HeroScene` renderiza una **icosfera iridiscente deformable** iluminada por 3 luces neón orbitando (los colores "bailan" sobre la superficie = sublimación full-color), wireframe brillante, anillo y campo de partículas multicolor con parallax de mouse.

---

## Build y despliegue

```bash
pnpm build
```

El output estático se genera en `dist/`. Puedes desplegarlo en cualquier hosting estático:

- **Vercel** — conectar repo, zero config
- **Netlify** — `pnpm build`, publish dir: `dist`
- **Cloudflare Pages** — `pnpm build`, output: `dist`
- **GitHub Pages** — action simple de deploy

### Deploy rápido con Vercel

```bash
npx vercel --prod
```

---

## Notas técnicas

- Los componentes React se cargan como **Astro Islands** con `client:only="react"` (sin SSR, solo cliente)
- Esto mantiene el HTML inicial liviano y con carga progresiva
- Three.js solo se carga cuando el Hero entra en viewport
- GSAP y Three.js son las únicas librerías pesadas (~120KB gzipped entre ambas)
