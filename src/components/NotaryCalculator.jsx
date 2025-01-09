import { useState, useEffect } from 'react';
import tarifas from '../data/tarifas.json';
import RequisitosServicio from './RequisitosServicio';

const TIPOS_SERVICIO = {
  // Servicios con cuantía
  TRANSFERENCIA: 'transferenciaDominio',
  HIPOTECA: 'hipotecas',
  PROMESA: 'promesas',
  BAJA_INVENTARIOS: 'baja_inventarios',
  // Servicios sin cuantía
  PODER_NATURAL: 'poder_natural',
  PODER_JURIDICO: 'poder_juridico',
  DECLARACION_NATURAL: 'declaracion_natural',
  DECLARACION_JURIDICA: 'declaracion_juridica',
  TESTAMENTO: 'testamento',
  DIVORCIO: 'divorcio',
  UNION_HECHO: 'union_hecho',
  // Servicios por firma/hoja
  RECONOCIMIENTO_VEHICULO: 'reconocimiento_vehiculo',
  PROTOCOLIZACION: 'protocolizacion',
  // Servicios por menor
  AUTORIZACION_SALIDA: 'autorizacion_salida',
  // Servicios con tarifa fija
  POSESION_EFECTIVA: 'posesion_efectiva',
  DISOLUCION_SOCIEDAD: 'disolucion_sociedad',
  GARANTIA_ECONOMICA_NATURAL: 'garantia_economica_natural',
  GARANTIA_ECONOMICA_JURIDICA: 'garantia_economica_juridica'
};

// Servicios con tarifa por firma/hoja
const TARIFAS_POR_FIRMA = {
  reconocimiento_vehiculo: {
    nombre: "Reconocimiento de Firma Vehículo",
    tarifaPorFirma: 14.10,
    descripcion: "Reconocimiento de firma en contrato de compraventa de vehículo"
  },
  protocolizacion: {
    nombre: "Protocolización",
    tarifaPorFirma: 14.10,
    descripcion: "Protocolización de documentos (por hoja)"
  }
};

// Servicios con tarifa fija
const TARIFAS_FIJAS = {
  posesion_efectiva: {
    nombre: "Posesión Efectiva",
    tarifa: 235.00,
    descripcion: "Posesión efectiva de bienes"
  },
  disolucion_sociedad: {
    nombre: "Disolución de Sociedad Conyugal",
    tarifa: 159.80,
    descripcion: "Disolución de sociedad conyugal"
  },
  garantia_economica_natural: {
    nombre: "Garantía Económica (Persona Natural)",
    tarifa: 70.50,
    descripcion: "Garantía económica persona natural"
  },
  garantia_economica_juridica: {
    nombre: "Garantía Económica (Persona Jurídica)",
    tarifa: 235.00,
    descripcion: "Garantía económica persona jurídica"
  },
  declaracion_juridica: {
    nombre: "Declaración Juramentada (Persona Jurídica)",
    tarifa: 56.40,
    descripcion: "Declaración juramentada persona jurídica"
  }
};

// Tabla de baja de inventarios
const TABLA_BAJA_INVENTARIOS = {
  rangos: [
    {min: 0, max: 10000, multiplicadorSBU: 0.12},
    {min: 10000.01, max: 30000, multiplicadorSBU: 0.18},
    {min: 30000.01, max: 60000, multiplicadorSBU: 0.25},
    {min: 60000.01, max: 90000, multiplicadorSBU: 0.40},
    {min: 90000.01, max: 150000, multiplicadorSBU: 0.68},
    {min: 150000.01, max: 300000, multiplicadorSBU: 1.00},
    {min: 300000.01, max: 600000, multiplicadorSBU: 2.00},
    {min: 600000.01, max: 1000000, multiplicadorSBU: 2.50},
    {min: 1000000.01, max: 2000000, multiplicadorSBU: 5.00},
    {min: 2000000.01, max: 3000000, multiplicadorSBU: 7.50},
    {min: 3000000.01, max: 4000000, multiplicadorSBU: 10.00}
  ],
  excedente: {
    limite: 4000000,
    multiplicadorSBU: 10.00,
    porcentajeExcedente: 0.001
  }
};

// Servicios con tarifa por menor
const TARIFAS_POR_MENOR = {
  autorizacion_salida: {
    nombre: "Autorización de Salida del País",
    tarifaPorMenor: 23.50,
    descripcion: "Autorización de salida del país para menores de edad"
  }
};

// Servicios sin cuantía
const SERVICIOS_INDETERMINADOS = {
  poder_natural: {
    nombre: "Poder (Persona Natural)",
    tarifa: 56.40,
    otorganteAdicional: 14.10
  },
  poder_juridico: {
    nombre: "Poder (Persona Jurídica)",
    tarifa: 235.00
  },
  declaracion_natural: {
    nombre: "Declaración Juramentada (Persona Natural)",
    tarifa: 23.50,
    otorganteAdicional: 14.10
  },
  testamento: {
    nombre: "Testamento Abierto",
    tarifa: 564.00
  },
  divorcio: {
    nombre: "Divorcio por Mutuo Consentimiento",
    tarifa: 183.30
  },
  union_hecho: {
    nombre: "Unión de Hecho",
    tarifa: 47.00
  }
};

export default function NotaryCalculator() {
  const [tipoServicio, setTipoServicio] = useState(TIPOS_SERVICIO.TRANSFERENCIA);
  const [monto, setMonto] = useState('');
  const [otorgantes, setOtorgantes] = useState(1);
  const [esAdultoMayor, setEsAdultoMayor] = useState(false);
  const [resultado, setResultado] = useState(null);

  const esServicioIndeterminado = () => {
    return SERVICIOS_INDETERMINADOS.hasOwnProperty(tipoServicio);
  };

  const esTarifaPorFirma = () => {
    return TARIFAS_POR_FIRMA.hasOwnProperty(tipoServicio);
  };

  const esTarifaPorMenor = () => {
    return TARIFAS_POR_MENOR.hasOwnProperty(tipoServicio);
  };

  const esTarifaFija = () => {
    return TARIFAS_FIJAS.hasOwnProperty(tipoServicio);
  };

  const esBajaInventarios = () => {
    return tipoServicio === TIPOS_SERVICIO.BAJA_INVENTARIOS;
  };

  const calcularTarifaBajaInventarios = (monto) => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) return 0;

    if (montoNum > TABLA_BAJA_INVENTARIOS.excedente.limite) {
      const excedente = montoNum - TABLA_BAJA_INVENTARIOS.excedente.limite;
      const base = TABLA_BAJA_INVENTARIOS.excedente.multiplicadorSBU * tarifas.remuneracionBasica;
      return base + (excedente * TABLA_BAJA_INVENTARIOS.excedente.porcentajeExcedente);
    }

    const rango = TABLA_BAJA_INVENTARIOS.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
    return rango ? rango.multiplicadorSBU * tarifas.remuneracionBasica : 0;
  };

  const calcularTarifaIndeterminada = () => {
    const servicio = SERVICIOS_INDETERMINADOS[tipoServicio];
    let subtotal = servicio.tarifa;
    
    if (servicio.otorganteAdicional && otorgantes > 1) {
      subtotal += servicio.otorganteAdicional * (otorgantes - 1);
    }
    
    return subtotal;
  };

  const calcularTarifaDeterminada = (monto, tipo) => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) return 0;

    const tabla = tarifas.tablas[tipo];
    if (!tabla) return 0;

    // Si el monto excede el límite, usar fórmula especial
    if (montoNum > tabla.excedente.limite) {
      const excedente = montoNum - tabla.excedente.limite;
      const baseSBU = parseInt(tabla.excedente.formula.base) * tarifas.remuneracionBasica;
      return baseSBU + (excedente * tabla.excedente.formula.porcentajeExcedente);
    }

    // Buscar en rangos
    const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
    return rango ? rango.tarifa : 0;
  };

  const calcularTotal = () => {
    let subtotal = 0;

    if (esTarifaPorFirma()) {
      subtotal = TARIFAS_POR_FIRMA[tipoServicio].tarifaPorFirma * otorgantes;
    } else if (esTarifaPorMenor()) {
      subtotal = TARIFAS_POR_MENOR[tipoServicio].tarifaPorMenor * otorgantes;
    } else if (esTarifaFija()) {
      subtotal = TARIFAS_FIJAS[tipoServicio].tarifa;
    } else if (esBajaInventarios()) {
      subtotal = calcularTarifaBajaInventarios(monto);
    } else if (esServicioIndeterminado()) {
      if (!SERVICIOS_INDETERMINADOS[tipoServicio]) return;
      subtotal = calcularTarifaIndeterminada();
    } else {
      if (!monto) return;
      subtotal = calcularTarifaDeterminada(monto, tipoServicio);
    }

    // Aplicar descuento de adulto mayor
    if (esAdultoMayor) {
      subtotal *= (1 - tarifas.descuentos.adultoMayor.bilaterales);
    }

    const iva = subtotal * tarifas.iva;
    const total = subtotal + iva;

    setResultado({
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2)
    });
  };

  useEffect(() => {
    calcularTotal();
  }, [monto, tipoServicio, otorgantes, esAdultoMayor]);

  const handleTipoServicioChange = (e) => {
    setTipoServicio(e.target.value);
    setMonto('');
    setOtorgantes(1);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Calculadora de Tarifas Notariales
      </h2>

      <div className="space-y-6">
        {/* Tipo de Servicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Servicio
          </label>
          <select
            className="select-field"
            value={tipoServicio}
            onChange={handleTipoServicioChange}
          >
            <optgroup label="Servicios con Cuantía">
              <option value={TIPOS_SERVICIO.BAJA_INVENTARIOS}>Baja de Inventarios</option>
              <option value={TIPOS_SERVICIO.HIPOTECA}>Hipoteca</option>
              <option value={TIPOS_SERVICIO.PROMESA}>Promesa de Compraventa</option>
              <option value={TIPOS_SERVICIO.TRANSFERENCIA}>Transferencia de Dominio</option>
            </optgroup>
            <optgroup label="Servicios sin Cuantía">
              <option value={TIPOS_SERVICIO.DECLARACION_NATURAL}>Declaración Juramentada (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.DECLARACION_JURIDICA}>Declaración Juramentada (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.DIVORCIO}>Divorcio</option>
              <option value={TIPOS_SERVICIO.PODER_JURIDICO}>Poder (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.PODER_NATURAL}>Poder (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.TESTAMENTO}>Testamento</option>
              <option value={TIPOS_SERVICIO.UNION_HECHO}>Unión de Hecho</option>
            </optgroup>
            <optgroup label="Servicios por Firma/Hoja">
              <option value={TIPOS_SERVICIO.PROTOCOLIZACION}>Protocolización (por hoja)</option>
              <option value={TIPOS_SERVICIO.RECONOCIMIENTO_VEHICULO}>Reconocimiento de Firma Vehículo</option>
            </optgroup>
            <optgroup label="Autorizaciones y Otros">
              <option value={TIPOS_SERVICIO.AUTORIZACION_SALIDA}>Autorización de Salida del País</option>
              <option value={TIPOS_SERVICIO.DISOLUCION_SOCIEDAD}>Disolución de Sociedad Conyugal</option>
              <option value={TIPOS_SERVICIO.GARANTIA_ECONOMICA_JURIDICA}>Garantía Económica (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.GARANTIA_ECONOMICA_NATURAL}>Garantía Económica (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.POSESION_EFECTIVA}>Posesión Efectiva</option>
            </optgroup>
          </select>
        </div>

        {/* Monto (solo para servicios con cuantía) */}
        {(esBajaInventarios() || (!esServicioIndeterminado() && !esTarifaPorFirma() && !esTarifaPorMenor() && !esTarifaFija())) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto
            </label>
            <input
              type="number"
              className="input-field calculator-numbers"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              min="0"
              step="0.01"
              placeholder="Ingrese el monto"
            />
          </div>
        )}

        {/* Otorgantes/Firmas/Menores */}
        {(tipoServicio === TIPOS_SERVICIO.PODER_NATURAL || 
          tipoServicio === TIPOS_SERVICIO.DECLARACION_NATURAL ||
          esTarifaPorFirma() ||
          esTarifaPorMenor()) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tipoServicio === TIPOS_SERVICIO.PROTOCOLIZACION ? 'Número de Hojas' :
               tipoServicio === TIPOS_SERVICIO.RECONOCIMIENTO_VEHICULO ? 'Número de Firmas' :
               esTarifaPorMenor() ? 'Número de Menores' : 
               'Número de Otorgantes'}
            </label>
            <input
              type="number"
              className="input-field calculator-numbers"
              value={otorgantes}
              onChange={(e) => setOtorgantes(parseInt(e.target.value) || 1)}
              min="1"
              placeholder={tipoServicio === TIPOS_SERVICIO.PROTOCOLIZACION ? "Número de hojas" :
                          tipoServicio === TIPOS_SERVICIO.RECONOCIMIENTO_VEHICULO ? "Número de firmas" :
                          esTarifaPorMenor() ? "Número de menores" :
                          "Número de otorgantes"}
            />
          </div>
        )}

        {/* Descuento Adulto Mayor */}
        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <input
            type="checkbox"
            id="adultoMayor"
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
            checked={esAdultoMayor}
            onChange={(e) => setEsAdultoMayor(e.target.checked)}
          />
          <label htmlFor="adultoMayor" className="ml-2 text-sm font-medium text-blue-800">
            Adulto Mayor (50% de descuento)
          </label>
        </div>

        {/* Resultados y Requisitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resultado && (
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium amount">${resultado.subtotal}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">IVA (15%):</span>
                  <span className="font-medium amount">${resultado.iva}</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-lg">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-blue-600 amount">${resultado.total}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">
                  * Este es un cálculo estimado. No incluye certificaciones u otros valores adicionales que pudieran aplicar según el caso específico.
                </p>
              </div>
            </div>
          )}
          
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <RequisitosServicio tipoServicio={tipoServicio} />
          </div>
        </div>
      </div>
    </div>
  );
}
