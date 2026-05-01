# Brand Assets

Coloca aquí las imágenes de branding para la app.

## Archivos soportados

- `logo.png` - Logo principal (recomendado: 200x200px, fondo transparente)
- `logo.svg` - Logo en formato vectorial (preferido para mejor calidad)

## Uso

El componente `BrandLogo` busca automáticamente `/brand/logo.png`.

Para usar una imagen diferente:

```tsx
<BrandLogo src="/brand/mi-logo.png" size="lg" />
```

## Tamaños disponibles

- `sm` - 48x48px
- `md` - 80x80px (default)
- `lg` - 128x128px

## Recomendaciones

- Usa imágenes con fondo transparente (PNG o SVG)
- Tamaño mínimo recomendado: 200x200px
- Formatos: PNG, SVG, WebP
