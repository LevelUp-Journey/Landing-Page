# Internacionalización (i18n)

Esta carpeta contiene toda la configuración de internacionalización del proyecto.

## Estructura

```
i18n/
├── index.ts           # Funciones principales de i18n
├── locales/           # Archivos de traducción
│   ├── en.json       # Inglés
│   └── es.json       # Español
└── README.md         # Este archivo
```

## Uso

### En componentes Astro

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('section1.title')}</h1>
<p>{t('section1.subtitle')}</p>
```

## Agregar un nuevo idioma

1. Crea un nuevo archivo en `locales/` (ej: `pt.json`)
2. Copia la estructura de `en.json` o `es.json`
3. Traduce todos los textos
4. Importa el archivo en `index.ts`:
   ```ts
   import pt from './locales/pt.json';
   ```
5. Agrega el idioma a los objetos `languages` y `ui`:
   ```ts
   export const languages = {
     en: 'English',
     es: 'Español',
     pt: 'Português',
   };

   export const ui = {
     en,
     es,
     pt,
   } as const;
   ```

## Organización de las traducciones

Las traducciones están organizadas por sección:
- `header`: Encabezado del sitio
- `section1` - `section5`: Cada sección de la landing page
- `footer`: Pie de página

Cada sección puede tener subsecciones (ej: `section2.card1.title`)
