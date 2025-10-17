# Migración a shadcn/ui

Este documento describe los cambios realizados para integrar shadcn/ui en el proyecto.

## Cambios Realizados

### 1. Instalación de Dependencias

Se instalaron las siguientes dependencias:

```bash
npm install -D @astrojs/react react react-dom @types/react @types/react-dom
npm install class-variance-authority clsx tailwind-merge lucide-react
```

### 2. Configuración

#### astro.config.mjs
- Agregado soporte para React
- Configurado Tailwind para no aplicar estilos base (para evitar conflictos con shadcn)

#### tailwind.config.mjs
- Agregado darkMode
- Configurado el sistema de colores de shadcn usando variables CSS
- Agregado sistema de border radius personalizado

#### tsconfig.json
- Agregado alias `@/*` que apunta a `./src/*`

#### Estilos Globales
- Creado `src/styles/globals.css` con variables CSS de shadcn
- Actualizado `src/styles/global.css` eliminando la clase `.card` antigua

### 3. Componentes de shadcn/ui Creados

#### src/lib/utils.ts
Utilidad `cn()` para combinar clases de Tailwind

#### src/components/ui/button.tsx
Componente Button de shadcn con variantes:
- default, destructive, outline, secondary, ghost, link
- Tamaños: sm, default, lg, icon

#### src/components/ui/card.tsx
Componente Card de shadcn con subcomponentes:
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

#### src/components/ui/table.tsx
Componente Table de shadcn con subcomponentes:
- Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### 4. Componentes de Aplicación Actualizados

#### src/components/ui/JoinButton.tsx
Botón "Join Now" usando shadcn Button con soporte de traducción

#### src/components/ui/FeatureCard.tsx
Card de características usando shadcn Card con soporte de traducción

#### src/components/ui/Leaderboard.tsx
Tabla de leaderboard usando shadcn Table con soporte de traducción

### 5. Componentes Reemplazados

Los siguientes archivos fueron actualizados para usar los nuevos componentes:

- **src/components/Hero.astro**: Usa `JoinButton` en lugar de botón HTML
- **src/components/Section2.astro**: Usa `FeatureCard` en lugar de divs con clase `.card`
- **src/components/Section3.astro**: Usa `Leaderboard` en lugar de `LeaderboardTable`

### 6. Componentes Eliminados

Los siguientes componentes antiguos fueron eliminados:

- `src/components/Info-Cards.astro`
- `src/components/LeaderboardCard.astro`
- `src/components/LeaderboardTable.astro`

## Características

### Componentes Reactivos
Todos los componentes de shadcn son componentes React que se integran con Astro usando la directiva `client:load`.

### Soporte de Traducción
Los componentes mantienen el soporte de i18n del proyecto original, escuchando cambios en localStorage.

### Estilos Consistentes
Los componentes usan el sistema de diseño de shadcn pero mantienen los colores y estilos del tema oscuro del proyecto.

### Accesibilidad
Los componentes de shadcn vienen con soporte de accesibilidad incorporado.

## Uso

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">Click me</Button>
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Próximos Pasos

Si deseas agregar más componentes de shadcn/ui:

1. Visita https://ui.shadcn.com/
2. Copia el código del componente que necesites
3. Créalo en `src/components/ui/`
4. Ajusta los estilos si es necesario para que coincidan con el tema del proyecto
