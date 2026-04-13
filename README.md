# ModaStyle - Frontend

Tienda de moda online construida con HTML, CSS y JavaScript vanilla. Usa Foundation Sites para el grid/utilities y Normalize.css para reset.

## Requisitos

- Node.js >= 18
- pnpm

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

Abre `http://localhost:3000` en el navegador.

## Estructura del proyecto

```
├── index.html            # Home - hero, productos destacados, testimonios
├── catalog.html          # Catálogo completo con filtros y búsqueda
├── product.html          # Detalle de producto
├── favorites.html        # Productos favoritos
├── contact.html          # Formulario de contacto con validaciones
├── css/
│   └── styles.css        # Estilos globales (variables, componentes, responsive)
├── js/
│   ├── app.js            # Home - carga productos y testimonios
│   ├── catalog.js        # Catálogo - filtros, búsqueda, ordenamiento
│   ├── product.js        # Detalle de producto
│   ├── favorites.js      # Módulo de favoritos (localStorage)
│   ├── favorites-page.js # Página de favoritos
│   └── contact.js        # Validación del formulario de contacto
├── data/
│   ├── products.json     # Productos destacados (home)
│   ├── catalog.json      # Catálogo completo (8 productos)
│   ├── testimonials.json # Testimonios de clientes
│   └── product-detail.json # Detalle de producto de ejemplo
└── assets/
    └── images/           # Imágenes e iconos SVG desde Figma
```

## Tecnologías

- HTML5 semántico
- CSS3 con custom properties
- JavaScript vanilla (ES5+, sin frameworks)
- Foundation Sites 6.9 (CSS grid/utilities)
- Normalize.css 8.0
- Google Fonts (Inter)

## Funcionalidades

- Navegación responsive (mobile hamburger / desktop nav bar)
- Productos cargados desde archivos JSON via fetch
- Templates HTML con `<template>` + `cloneNode` (sin innerHTML)
- Catálogo con búsqueda, filtro por categoría y ordenamiento
- Sistema de favoritos persistente con localStorage
- Formulario de contacto con validaciones HTML5 + JS custom
- Smooth scroll en links internos

## Notas

- No se usan frameworks JS (React, Angular, Vue, etc.)
- Las dependencias CSS se cargan desde `node_modules/` (local, no CDN)
- Las imágenes fueron extraídas directamente desde Figma via MCP
