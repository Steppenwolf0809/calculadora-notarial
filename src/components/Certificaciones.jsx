import { useState } from 'react';
import tarifas from '../data/tarifas.json';

const TIPOS_CERTIFICACION = {
  COMPULSA: 'Certificación de compulsas y copias certificadas (por hoja)',
  DOC_ELECTRONICO: 'Certificación de documentos materializados de soporte electrónico',
  FIRMA_REGISTRADA: 'Certificación de firma registrada de funcionarios',
  PLANOS: 'Certificación de planos',
  ELECTRONICA_DESMATERIALIZADA: 'Certificación electrónica de documentos desmaterializados',
  ELECTRONICA_DOCUMENTO: 'Certificación electrónica de documento electrónico'
};

const TARIFAS_CERTIFICACIONES = {
  [TIPOS_CERTIFICACION.COMPULSA]: 1.79,
  [TIPOS_CERTIFICACION.DOC_ELECTRONICO]: 2.00,
  [TIPOS_CERTIFICACION.FIRMA_REGISTRADA]: 18.80,
  [TIPOS_CERTIFICACION.PLANOS]: 3.00,
  [TIPOS_CERTIFICACION.ELECTRONICA_DESMATERIALIZADA]: 10.00,
  [TIPOS_CERTIFICACION.ELECTRONICA_DOCUMENTO]: 5.00
};

export default function Certificaciones() {
  const [tipoCertificacion, setTipoCertificacion] = useState(TIPOS_CERTIFICACION.COMPULSA);
  const [cantidad, setCantidad] = useState(1);
  const [resultado, setResultado] = useState(null);

  const calcularTotal = () => {
    const subtotal = TARIFAS_CERTIFICACIONES[tipoCertificacion] * cantidad;
    const iva = subtotal * tarifas.iva;
    const total = subtotal + iva;

    setResultado({
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2),
      cantidadHojas: cantidad
    });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Calculadora de Certificaciones
      </h2>

      <div className="space-y-6">
        {/* Tipo de Certificación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Certificación
          </label>
          <select
            className="select-field"
            value={tipoCertificacion}
            onChange={(e) => setTipoCertificacion(e.target.value)}
          >
            {Object.entries(TIPOS_CERTIFICACION).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tipoCertificacion === TIPOS_CERTIFICACION.COMPULSA ? 'Número de Hojas' : 'Cantidad'}
          </label>
          <input
            type="number"
            className="input-field"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>

        {/* Botón Calcular */}
        <button
          className="btn w-full"
          onClick={calcularTotal}
        >
          Calcular
        </button>

        {/* Resultados */}
        {resultado && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {tipoCertificacion === TIPOS_CERTIFICACION.COMPULSA 
                  ? `Hojas: ${resultado.cantidadHojas}`
                  : `Cantidad: ${resultado.cantidadHojas}`}
              </p>
              <p className="text-sm text-gray-600">
                Subtotal: ${resultado.subtotal}
              </p>
              <p className="text-sm text-gray-600">
                IVA (15%): ${resultado.iva}
              </p>
              <p className="text-lg font-bold text-gray-800">
                Total: ${resultado.total}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
