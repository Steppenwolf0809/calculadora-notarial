# Guía de Deployment y Configuración

## Ambiente de Desarrollo

### Requisitos Previos
1. **Node.js y NPM**
   - Node.js 18.x o superior
   - NPM 9.x o superior

2. **Software Adicional**
   - FFmpeg (para procesamiento de video)
   - Git

### Configuración Inicial

1. **Clonar el Repositorio**
```bash
git clone https://github.com/Steppenwolf0809/calculadora-notarial.git
cd calculadora-notarial
```

2. **Instalar Dependencias**
```bash
npm install
```

3. **Variables de Entorno**
Crear archivo `.env.local`:
```env
# Ambiente
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Media
NEXT_PUBLIC_MEDIA_BUCKET=your-media-bucket
```

4. **Iniciar Ambiente de Desarrollo**
```bash
npm run dev
```

## Estructura del Proyecto

```
abogados-online/
├── docs/                  # Documentación
├── public/               # Archivos estáticos
├── scripts/             # Scripts de utilidad
├── src/
│   ├── components/      # Componentes React
│   ├── config/         # Configuraciones
│   ├── data/           # Datos estáticos
│   ├── pages/          # Páginas y API routes
│   └── styles/         # Estilos CSS
└── tests/              # Tests
```

## Scripts Disponibles

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "optimize-media": "node scripts/optimize-media.js"
  }
}
```

## Deployment en Producción

### Plataforma: Vercel

1. **Configuración en Vercel**
   - Conectar con repositorio de GitHub
   - Configurar variables de entorno
   - Establecer dominio personalizado

2. **Variables de Entorno en Producción**
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://abogadosonlineecuador.com
NEXT_PUBLIC_API_URL=https://abogadosonlineecuador.com/api
```

3. **Configuración de Build**
```json
{
  "build": {
    "env": {
      "NEXT_PUBLIC_SITE_URL": "https://abogadosonlineecuador.com"
    }
  }
}
```

### Proceso de Deployment

1. **Pre-deployment Checklist**
   - Ejecutar tests
   - Verificar optimización de medios
   - Validar configuraciones

2. **Deployment Automático**
   - Push a rama master
   - Vercel detecta cambios
   - Build y deployment automático

3. **Verificación Post-deployment**
   - Verificar funcionalidad
   - Revisar performance
   - Monitorear errores

## Optimizaciones

### Media
1. **Imágenes**
   ```bash
   npm run optimize-media
   ```
   - Compresión de imágenes
   - Generación de WebP
   - Responsive sizes

2. **Videos**
   ```bash
   # Generar versiones optimizadas
   node scripts/optimize-media.js --type=video
   ```
   - Compresión H.264
   - Versiones móviles
   - Thumbnails

### Performance

1. **Build Optimization**
   ```bash
   ANALYZE=true npm run build
   ```
   - Bundle analysis
   - Code splitting
   - Tree shaking

2. **Runtime Optimization**
   - Lazy loading
   - Route prefetching
   - Image optimization

## Monitoreo

### Vercel Analytics
```javascript
// next.config.mjs
export default {
  analytics: {
    enabled: true,
    debug: process.env.NODE_ENV === 'development'
  }
}
```

### Error Tracking
```javascript
// pages/_app.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
})
```

## Mantenimiento

### Actualizaciones
1. **Dependencias**
   ```bash
   npm audit
   npm update
   ```

2. **Next.js**
   ```bash
   npm install next@latest react@latest react-dom@latest
   ```

### Backups
- Configuración de Vercel
- Variables de entorno
- Assets estáticos

## Seguridad

### Headers
```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'"
  }
]
```

### SSL/TLS
- Certificado automático por Vercel
- Forzar HTTPS
- HSTS preload

## Troubleshooting

### Problemas Comunes

1. **Build Failures**
   - Verificar dependencias
   - Limpiar caché
   - Revisar logs

2. **Performance Issues**
   - Analizar bundle size
   - Optimizar imágenes
   - Revisar lazy loading

3. **API Errors**
   - Verificar endpoints
   - Validar rate limits
   - Revisar logs

## Contacto y Soporte

Para soporte técnico:
- **Email:** [contacto@abogadosonlineecuador.com](mailto:contacto@abogadosonlineecuador.com)
- **WhatsApp:** +593 97 931 7579

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
