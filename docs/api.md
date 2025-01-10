# Documentación de API y Endpoints

## Estructura de la API

La aplicación utiliza Next.js API Routes para manejar las peticiones del servidor. Los endpoints están ubicados en `src/pages/api/`.

### Endpoints Disponibles

#### 1. Búsqueda de Servicios
```typescript
GET /api/search
```
- **Descripción**: Busca servicios notariales por nombre o categoría
- **Parámetros**:
  - `q` (string): Término de búsqueda
  - `category` (string, opcional): Filtro por categoría
- **Respuesta**:
  ```json
  {
    "results": [
      {
        "id": "string",
        "name": "string",
        "category": "string",
        "basePrice": "number"
      }
    ]
  }
  ```

#### 2. Cálculo de Tarifas
```typescript
POST /api/calculate
```
- **Descripción**: Calcula el costo total de un servicio notarial
- **Body**:
  ```json
  {
    "serviceId": "string",
    "amount": "number",
    "discounts": {
      "viviendaSocial": "boolean",
      "adultoMayor": "boolean",
      "discapacidad": "boolean"
    },
    "additionalCerts": ["string"]
  }
  ```
- **Respuesta**:
  ```json
  {
    "subtotal": "number",
    "discounts": "number",
    "iva": "number",
    "total": "number",
    "breakdown": {
      "baseFee": "number",
      "additionalFees": "number",
      "discountDetails": {}
    }
  }
  ```

#### 3. Requisitos por Servicio
```typescript
GET /api/requirements/:serviceId
```
- **Descripción**: Obtiene los requisitos para un servicio específico
- **Parámetros**:
  - `serviceId` (string): ID del servicio
- **Respuesta**:
  ```json
  {
    "requirements": [
      {
        "id": "string",
        "description": "string",
        "required": "boolean"
      }
    ]
  }
  ```

## Configuración del Servidor

### Middleware

1. **CORS**
```javascript
// src/pages/api/_middleware.js
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST'],
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
})
```

2. **Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite por ventana
})
```

### Validación de Datos

Utilizamos Zod para la validación de esquemas:

```typescript
import { z } from 'zod'

const CalculateRequestSchema = z.object({
  serviceId: z.string(),
  amount: z.number().optional(),
  discounts: z.object({
    viviendaSocial: z.boolean(),
    adultoMayor: z.boolean(),
    discapacidad: z.boolean()
  }),
  additionalCerts: z.array(z.string())
})
```

### Manejo de Errores

```typescript
// src/utils/api-error.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message)
  }
}

// Middleware de manejo de errores
export function errorHandler(err: any, req: any, res: any) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details
    })
  }

  return res.status(500).json({
    error: 'Internal Server Error'
  })
}
```

## Seguridad

### Headers de Seguridad
```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

### Sanitización de Datos
```typescript
import { sanitize } from 'isomorphic-dompurify'

export function sanitizeInput(data: any): any {
  if (typeof data === 'string') {
    return sanitize(data)
  }
  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => ({
      ...acc,
      [key]: sanitizeInput(data[key])
    }), {})
  }
  return data
}
```

## Monitoreo y Logging

### Winston Logger
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### Métricas de API
```typescript
import { metrics } from '@vercel/analytics'

export function trackApiMetrics(req: any, res: any, time: number) {
  metrics.count('api_calls', 1, {
    endpoint: req.url,
    method: req.method,
    status: res.statusCode
  })
  
  metrics.timing('api_latency', time, {
    endpoint: req.url
  })
}
```

## Caché

### Redis Cache (Opcional)
```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

async function cacheResponse(key: string, data: any, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(data))
}

async function getCachedResponse(key: string) {
  const cached = await redis.get(key)
  return cached ? JSON.parse(cached) : null
}
```

## Variables de Entorno

```env
# API Configuration
API_URL=http://localhost:3000
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000

# External Services
REDIS_URL=redis://localhost:6379

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

## Consideraciones de Deployment

1. **Vercel**
   - Configuración automática de rutas API
   - Serverless Functions
   - Edge Functions para mejor rendimiento

2. **Escalabilidad**
   - Caché de respuestas frecuentes
   - Optimización de consultas
   - Distribución geográfica

3. **Monitoreo**
   - Vercel Analytics
   - Sentry para errores
   - Logs estructurados

4. **Seguridad**
   - WAF (Web Application Firewall)
   - Rate Limiting
   - Validación de entrada
   - Sanitización de salida
