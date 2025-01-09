import { useState } from 'react';
import requisitos from '../data/requisitos.json';

const CATEGORIAS_TRAMITES = {
  TRANSFERENCIA: 'transferencia_dominio',
  PODERES: 'poder_persona_natural',
  PODERES_JURIDICA: 'poder_persona_juridica',
  HIPOTECA: 'hipoteca',
  TESTAMENTO: 'testamento',
  DECLARACION: 'declaracion_juramentada',
  AUTORIZACION: 'autorizacion_salida_pais',
  DIVORCIO: 'divorcio',
  PROMESA: 'promesa_compraventa',
  RECONOCIMIENTO: 'reconocimiento_firma',
  UNION_HECHO: 'union_hecho'
};

const NOMBRES_TRAMITES = {
  [CATEGORIAS_TRAMITES.TRANSFERENCIA]: 'Transferencia de Dominio',
  [CATEGORIAS_TRAMITES.PODERES]: 'Poder (Persona Natural)',
  [CATEGORIAS_TRAMITES.PODERES_JURIDICA]: 'Poder (Persona Jurídica)',
  [CATEGORIAS_TRAMITES.HIPOTECA]: 'Hipoteca',
  [CATEGORIAS_TRAMITES.TESTAMENTO]: 'Testamento',
  [CATEGORIAS_TRAMITES.DECLARACION]: 'Declaración Juramentada',
  [CATEGORIAS_TRAMITES.AUTORIZACION]: 'Autorización de Salida del País',
  [CATEGORIAS_TRAMITES.DIVORCIO]: 'Divorcio',
  [CATEGORIAS_TRAMITES.PROMESA]: 'Promesa de Compraventa',
  [CATEGORIAS_TRAMITES.RECONOCIMIENTO]: 'Reconocimiento de Firma',
  [CATEGORIAS_TRAMITES.UNION_HECHO]: 'Unión de Hecho'
};

export default function Requisitos() {
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState(CATEGORIAS_TRAMITES.TRANSFERENCIA);

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Requisitos por Trámite
      </h2>

      <div className="space-y-6">
        {/* Selector de Trámite */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccione el Trámite
          </label>
          <select
            className="select-field"
            value={tramiteSeleccionado}
            onChange={(e) => setTramiteSeleccionado(e.target.value)}
          >
            {Object.entries(NOMBRES_TRAMITES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de Requisitos */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {NOMBRES_TRAMITES[tramiteSeleccionado]}
          </h3>
          <ul className="space-y-3">
            {requisitos[tramiteSeleccionado].map((requisito, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{requisito}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
