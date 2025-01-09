import { useState, useEffect } from 'react';
import tarifas from '../data/tarifas.json';
import RequisitosServicio from './RequisitosServicio';

const TIPOS_SERVICIO = {
  TRANSFERENCIA: 'transferenciaDominio',
  HIPOTECA: 'hipotecas',
  PROMESA: 'promesas',
  PODER_NATURAL: 'poder_natural',
  PODER_JURIDICO: 'poder_juridico',
  DECLARACION: 'declaracion',
  TESTAMENTO: 'testamento',
  DIVORCIO: 'divorcio',
  UNION_HECHO: 'union_hecho'
};

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
  declaracion: {
    nombre: "Declaración Juramentada",
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

export default function Calculadora() {
  const [tipoServicio, setTipoServicio] = useState(TIPOS_SERVICIO.TRANSFERENCIA);
  const [monto, setMonto] = useState('');
  const [otorgantes, setOtorgantes] = useState(1);
  const [esAdultoMayor, setEsAdultoMayor] = useState(false);
  const [resultado, setResultado] = useState(null);

  const esServicioIndeterminado = () => {
    return SERVICIOS_INDETERMINADOS.hasOwnProperty(tipoServicio);
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

    if (esServicioIndeterminado()) {
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
    if (esServicioIndeterminado() || monto) {
      calcularTotal();
    }
  }, [monto, tipoServicio, otorgantes, esAdultoMayor]);

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
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
            onChange={(e) => setTipoServicio(e.target.value)}
          >
            <optgroup label="Servicios con Cuantía">
              <option value={TIPOS_SERVICIO.TRANSFERENCIA}>Transferencia de Dominio</option>
              <option value={TIPOS_SERVICIO.HIPOTECA}>Hipoteca</option>
              <option value={TIPOS_SERVICIO.PROMESA}>Promesa de Compraventa</option>
            </optgroup>
            <optgroup label="Servicios sin Cuantía">
              <option value={TIPOS_SERVICIO.PODER_NATURAL}>Poder (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.PODER_JURIDICO}>Poder (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.DECLARACION}>Declaración Juramentada</option>
              <option value={TIPOS_SERVICIO.TESTAMENTO}>Testamento</option>
              <option value={TIPOS_SERVICIO.DIVORCIO}>Divorcio</option>
              <option value={TIPOS_SERVICIO.UNION_HECHO}>Unión de Hecho</option>
            </optgroup>
          </select>
        </div>

        {/* Monto (solo para servicios con cuantía) */}
        {!esServicioIndeterminado() && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto
            </label>
            <input
              type="number"
              className="input-field"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              min="0"
              step="0.01"
              placeholder="Ingrese el monto"
            />
          </div>
        )}

        {/* Otorgantes (solo para servicios que lo requieren) */}
        {(tipoServicio === TIPOS_SERVICIO.PODER_NATURAL || 
          tipoServicio === TIPOS_SERVICIO.DECLARACION) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Otorgantes
            </label>
            <input
              type="number"
              className="input-field"
              value={otorgantes}
              onChange={(e) => setOtorgantes(parseInt(e.target.value) || 1)}
              min="1"
              placeholder="Número de otorgantes"
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
                  <span className="font-medium">${resultado.subtotal}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">IVA (15%):</span>
                  <span className="font-medium">${resultado.iva}</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-lg">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-blue-600">${resultado.total}</span>
                </div>
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
