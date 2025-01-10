# Abogados Online Ecuador - Documentación Técnica

## Información Técnica Base

### Tecnologías y Frameworks
- **Frontend Framework:** Next.js 15.1.3
- **React:** v19.0.0
- **UI Components:**
  - Headless UI (@headlessui/react v2.2.0)
  - Hero Icons (@heroicons/react v2.2.0)
  - Lucide Icons (lucide-react v0.469.0)
- **Styling:** TailwindCSS v3.4.1
- **Media Processing:**
  - Sharp (v0.33.5) - Optimización de imágenes
  - Fluent-ffmpeg (v2.1.3) - Procesamiento de video

### Estructura de Carpetas
```
abogados-online/
├── public/               # Archivos estáticos
│   ├── brand/           # Logos e imágenes de marca
│   ├── fonts/           # Fuentes personalizadas
│   ├── images/          # Imágenes del sitio
│   └── videos/          # Videos de fondo y contenido
├── scripts/             # Scripts de utilidad
│   ├── optimize-media.js    # Optimización de medios
│   └── extract-poster.js    # Extracción de posters de video
├── src/
│   ├── components/      # Componentes React
│   ├── config/         # Configuraciones
│   ├── data/           # Datos estáticos (JSON)
│   ├── pages/          # Páginas y rutas
│   └── styles/         # Estilos CSS
```

### Requisitos del Sistema
- Node.js 18.x o superior
- NPM 9.x o superior
- FFmpeg (para procesamiento de video)

## Detalles de Implementación

### Calculadora Notarial
- Ubicación: `src/components/NotaryCalculator.jsx`
- Datos de tarifas: `src/data/tarifas.json`
- Funcionalidades:
  - Cálculo de costos notariales
  - Selección de servicios
  - Cálculo de certificaciones adicionales

### Componentes Principales
1. **Header (`src/components/Header.jsx`)**
   - Navegación responsive
   - Efectos de scroll
   - Menú móvil

2. **Hero Section (`src/components/HeroSection.jsx`)**
   - Video de fondo adaptativo
   - Optimización para móviles
   - Efectos de paralaje

3. **Formulario de Citas (`src/components/AppointmentForm.jsx`)**
   - Validación de datos
   - Integración con WhatsApp

### Scripts de Optimización
1. **optimize-media.js**
   - Compresión de imágenes
   - Optimización de videos
   - Generación de formatos responsivos

2. **extract-poster.js**
   - Extracción de thumbnails de videos
   - Generación de placeholders

## Configuración del Ambiente de Desarrollo

### Instalación
```bash
npm install
```

### Scripts Disponibles
```bash
npm run dev          # Desarrollo con Turbopack
npm run build       # Compilación para producción
npm run start       # Iniciar servidor de producción
npm run lint        # Ejecutar linter
npm run optimize-media  # Optimizar archivos multimedia
```

### Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment

### Configuración Actual
- **Plataforma:** Vercel
- **Rama principal:** master
- **URL de producción:** [abogadosonlineecuador.com](https://abogadosonlineecuador.com)

### Proceso de Deployment
1. Push a la rama master
2. Vercel detecta cambios automáticamente
3. Ejecuta build y tests
4. Deploy automático si los tests pasan

### Optimizaciones de Producción
- Compresión de imágenes automática
- Minificación de JS/CSS
- Caching agresivo de assets estáticos

## Seguridad

### Protección de Datos
- Validación de inputs
- Sanitización de datos
- Rate limiting en APIs

### Mejores Prácticas
- CSP Headers
- HTTPS forzado
- Prevención de XSS
- Sanitización de inputs

## Mantenimiento

### Actualizaciones Recomendadas
- Actualizar dependencias mensualmente
- Revisar vulnerabilidades con `npm audit`
- Mantener Next.js actualizado

### Monitoreo
- Vercel Analytics
- Error tracking
- Performance monitoring

## Optimizaciones de Rendimiento

### Media
- Lazy loading de imágenes
- Formatos modernos (WebP, AVIF)
- Videos optimizados para móvil

### Frontend
- Code splitting automático
- Prefetching de rutas
- Optimización de bundle size

## Contacto y Soporte

Para soporte técnico o consultas sobre el desarrollo:
- **Email:** [contacto@abogadosonlineecuador.com](mailto:contacto@abogadosonlineecuador.com)
- **WhatsApp:** +593 97 931 7579

---

© 2024 Abogados Online Ecuador. Todos los derechos reservados.
