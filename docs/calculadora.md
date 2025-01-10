# Documentación Técnica - Calculadora Notarial

## Estructura de Datos

### Valores Base
```json
{
  "remuneracionBasica": 470.00,  // Salario Básico Unificado (SBU)
  "iva": 0.15                    // IVA para servicios notariales
}
```

### Tipos de Servicios

1. **Transferencia de Dominio**
   - Rangos de valores desde $0 hasta $4,000,000
   - Fórmula para excedentes: 20 SBU + 0.1% del excedente
   - Tarifas escalonadas según el monto

2. **Hipotecas**
   - Rangos similares a transferencia de dominio
   - Fórmula para excedentes: 9 SBU + 0.1% del excedente
   - Tarifas reducidas en comparación con transferencias

3. **Promesas**
   - Mismos rangos que transferencias e hipotecas
   - Fórmula para excedentes: 14 SBU + 0.1% del excedente
   - Tarifas intermedias entre transferencias e hipotecas

### Servicios con Tarifa Fija

#### Poderes
- Persona Natural: $56.40
  - Otorgante adicional: $14.10
- Persona Jurídica: $235.00

#### Declaraciones Juramentadas
- Persona Natural: $23.50
  - Otorgante adicional: $14.10
- Persona Jurídica: $56.40

#### Otros Servicios
- Autorización Salida País: $23.50
- Reconocimiento Firma: $14.10
- Testamento Abierto: $564.00
- Testamento Cerrado: $470.00
- Unión de Hecho: $47.00
- Disolución Sociedad Conyugal: $159.80

### Descuentos Aplicables

1. **Vivienda Social**
   - Aplica hasta $60,000
   - Descuento del 25%

2. **Adulto Mayor**
   - Actos unilaterales: 100%
   - Actos bilaterales: 50%

3. **Discapacidad**
   - Actos unilaterales: 100%
   - Actos bilaterales: 50%

## Implementación

### Componentes Principales

1. **NotaryCalculator.jsx**
   - Componente principal de la calculadora
   - Manejo de estado y lógica de cálculo
   - Integración con formularios y UI

2. **RequisitosServicio.jsx**
   - Muestra requisitos según el servicio seleccionado
   - Integración con datos de requisitos.json

3. **CertificacionesAdicionales.jsx**
   - Manejo de certificaciones extra
   - Cálculo de costos adicionales

### Lógica de Cálculo

```javascript
function calcularTarifa(monto, tipoServicio) {
  const tabla = tarifas.tablas[tipoServicio];
  
  // Buscar rango aplicable
  const rango = tabla.rangos.find(r => 
    monto >= r.min && monto <= r.max
  );
  
  if (rango) {
    return rango.tarifa;
  }
  
  // Cálculo para montos que exceden el último rango
  if (monto > tabla.excedente.limite) {
    const base = tabla.excedente.formula.base;
    const excedente = monto - tabla.excedente.limite;
    return (base * remuneracionBasica) + 
           (excedente * tabla.excedente.formula.porcentajeExcedente);
  }
}
```

### Aplicación de Descuentos

```javascript
function aplicarDescuentos(monto, descuentos) {
  let descuentoTotal = 0;
  
  // Vivienda social
  if (descuentos.viviendaSocial && monto <= 60000) {
    descuentoTotal += monto * 0.25;
  }
  
  // Adulto mayor o discapacidad
  if (descuentos.adultoMayor || descuentos.discapacidad) {
    const porcentaje = esActoUnilateral ? 1.0 : 0.5;
    descuentoTotal += monto * porcentaje;
  }
  
  return descuentoTotal;
}
```

## Integración con el Frontend

### Flujo de Usuario
1. Selección de tipo de servicio
2. Ingreso de monto (si aplica)
3. Selección de descuentos aplicables
4. Visualización de requisitos
5. Selección de certificaciones adicionales
6. Cálculo final y desglose

### Validaciones
- Montos dentro de rangos permitidos
- Compatibilidad de descuentos
- Campos requeridos según servicio
- Límites en certificaciones adicionales

### Optimizaciones
- Cálculos en tiempo real
- Caché de resultados frecuentes
- Validaciones instantáneas
- Feedback visual inmediato

## Mantenimiento

### Actualización de Tarifas
1. Modificar `tarifas.json`
2. Actualizar remuneración básica si cambia
3. Verificar cálculos con casos de prueba
4. Validar descuentos especiales

### Casos de Prueba
- Montos en límites de rangos
- Combinaciones de descuentos
- Casos especiales (0, valores máximos)
- Certificaciones múltiples

## Consideraciones Futuras

### Mejoras Planificadas
- Historial de cálculos
- Exportación de resultados
- Integración con sistema de citas
- Calculadora offline

### Mantenimiento
- Actualización anual de tarifas
- Revisión de fórmulas de cálculo
- Actualización de requisitos
- Optimización de rendimiento
