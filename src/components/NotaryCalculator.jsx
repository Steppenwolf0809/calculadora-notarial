import React, { useState, useEffect } from 'react';
import tarifas from '../data/tarifas.json';
import RequisitosServicio from './RequisitosServicio';

const TIPOS_SERVICIO = {
  TRANSFERENCIA: 'transferenciaDominio',
  HIPOTECA: 'hipotecas',
  PROMESA: 'promesas',
  ARRIENDO: 'contratos_arriendo',
  PODER_NATURAL: 'poder_natural',
  PODER_JURIDICO: 'poder_juridico',
  DECLARACION: 'declaracion',
  TESTAMENTO: 'testamento',
  DIVORCIO: 'divorcio',
  UNION_HECHO: 'union_hecho',
  AUTORIZACION_VIAJE: 'autorizacion_viaje',
  RECONOCIMIENTO_FIRMA: 'reconocimiento_firma'
};

const SERVICIOS_INDETERMINADOS = {
  poder_natural: {
    nombre: "Poder (Persona Natural)",
    tarifa: tarifas.serviciosIndeterminados.poderes.personaNatural.tarifa,
    otorganteAdicional: tarifas.serviciosIndeterminados.poderes.personaNatural.otorganteAdicional
  },
  poder_juridico: {
    nombre: "Poder (Persona Jurídica)",
    tarifa: tarifas.serviciosIndeterminados.poderes.personaJuridica.tarifa
  },
  declaracion: {
    nombre: "Declaración Juramentada",
    tarifa: tarifas.serviciosIndeterminados.declaracionesJuramentadas.personaNatural.tarifa,
    otorganteAdicional: tarifas.serviciosIndeterminados.declaracionesJuramentadas.personaNatural.otorganteAdicional
  },
  testamento: {
    nombre: "Testamento Abierto",
    tarifa: tarifas.serviciosIndeterminados.testamentoAbierto.tarifa
  },
  divorcio: {
    nombre: "Divorcio por Mutuo Consentimiento",
    tarifa: tarifas.serviciosIndeterminados.disolucionSociedadConyugal.tarifa
  },
  union_hecho: {
    nombre: "Unión de Hecho",
    tarifa: tarifas.serviciosIndeterminados.unionHecho.tarifa
  },
  autorizacion_viaje: {
    nombre: "Autorización de Viaje",
    tarifa: tarifas.serviciosIndeterminados.autorizacionSalidaPais.tarifa
  },
  reconocimiento_firma: {
    nombre: "Reconocimiento de Firma",
    tarifa: tarifas.serviciosIndeterminados.reconocimientoFirma.tarifa
  }
};

const NotaryCalculator = () => {
  const [tipoServicio, setTipoServicio] = useState(TIPOS_SERVICIO.TRANSFERENCIA);
  const [monto, setMonto] = useState('');
  const [otorgantes, setOtorgantes] = useState(1);
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

    // Si el tipo es contratos_arriendo, solo usamos los rangos
    if (tipo === TIPOS_SERVICIO.ARRIENDO) {
      const rango = tabla.rangos.find(r => montoNum >= r.min && montoNum <= r.max);
      return rango ? rango.tarifa : 0;
    }

    // Para otros tipos con excedente
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
  }, [monto, tipoServicio, otorgantes]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-8">
        {/* Tipo de Servicio */}
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
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
              <option value={TIPOS_SERVICIO.ARRIENDO}>Contrato de Arrendamiento</option>
            </optgroup>
            <optgroup label="Servicios sin Cuantía">
              <option value={TIPOS_SERVICIO.PODER_NATURAL}>Poder (Persona Natural)</option>
              <option value={TIPOS_SERVICIO.PODER_JURIDICO}>Poder (Persona Jurídica)</option>
              <option value={TIPOS_SERVICIO.DECLARACION}>Declaración Juramentada</option>
              <option value={TIPOS_SERVICIO.TESTAMENTO}>Testamento</option>
              <option value={TIPOS_SERVICIO.DIVORCIO}>Divorcio</option>
              <option value={TIPOS_SERVICIO.UNION_HECHO}>Unión de Hecho</option>
              <option value={TIPOS_SERVICIO.AUTORIZACION_VIAJE}>Autorización de Viaje</option>
              <option value={TIPOS_SERVICIO.RECONOCIMIENTO_FIRMA}>Reconocimiento de Firma</option>
            </optgroup>
          </select>
        </div>

        {/* Monto (solo para servicios con cuantía) */}
        {!esServicioIndeterminado() && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
              {tipoServicio === TIPOS_SERVICIO.ARRIENDO ? 'Canon Mensual' : 'Monto'}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500 text-lg">$</span>
              <input
                type="number"
                className="input-field pl-8"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                min="0"
                step="0.01"
                placeholder={tipoServicio === TIPOS_SERVICIO.ARRIENDO ? 'Ingrese el canon mensual' : 'Ingrese el monto'}
              />
            </div>
          </div>
        )}

        {/* Otorgantes (solo para servicios que lo requieren) */}
        {(tipoServicio === TIPOS_SERVICIO.PODER_NATURAL ||
          tipoServicio === TIPOS_SERVICIO.DECLARACION) && (
          <div className="max-w-2xl mx-auto">
            <label className="block text-base font-medium text-gray-700 mb-3">
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

        {/* Resultados y Requisitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {resultado && (
            <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Resultado</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium calculator-numbers text-xl">${resultado.subtotal}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">IVA (15%):</span>
                  <span className="font-medium calculator-numbers text-xl">${resultado.iva}</span>
                </div>
                <div className="flex justify-between items-center pt-3 text-lg">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-blue-600 calculator-numbers text-2xl">${resultado.total}</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
            <RequisitosServicio tramiteId={tipoServicio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaryCalculator;
