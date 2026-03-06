# Arquitectura del Frontend

Este proyecto sigue una arquitectura modular y escalable para React + TypeScript.

## Carpetas Principales

### `src/components/ui`

Componentes atómicos y puramente visuales (Botones, Inputs, Cards). No deben contener lógica de negocio, solo presentación y variantes de estilo.

### `src/components/layout`

Wrappers estructurales como el `Navbar`, `Footer` y el `MainLayout`. Definen la estructura global de la aplicación.

### `src/components/sections`

Componentes de alto nivel que representan secciones completas de la página (Hero, Pricing, etc.). Orquestan componentes de `ui`.

### `src/lib`

Configuraciones de librerías externas y utilidades globales (ej. `utils.ts` para Tailwind Merge).

### `src/hooks`

Hooks de React personalizados para lógica reutilizable.

### `src/types`

Definiciones de interfaces y tipos de TypeScript globales.

### `src/styles`

Archivos CSS globales y configuraciones de temas para Tailwind CSS 4.
