# Layout (`src/components/layout`)

Define la estructura persistente y recurrente de la aplicación.

## Componentes

- `Navbar.tsx`: Navegación principal con estados de scroll y adaptabilidad móvil.
- `Footer.tsx`: Pie de página con enlaces legales y corporativos.
- `MainLayout.tsx`: Orquestador global que envuelve el contenido de `App`.

## Reglas

- Todos los elementos que se repiten en cada página deben estar aquí.
- Mantener la jerarquía semántica (header, main, footer).
