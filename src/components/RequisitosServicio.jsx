import React from 'react';
import requisitos from '../data/requisitos.json';

const RequisitosServicio = ({ tramiteId }) => {
  const listaRequisitos = requisitos[tramiteId];

  if (!listaRequisitos) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Requisitos
      </h3>
      
      <div className="space-y-4">
        <ul className="list-disc list-inside space-y-2">
          {listaRequisitos.map((requisito, index) => (
            <li key={index} className="text-sm text-gray-600 leading-relaxed">
              {requisito}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequisitosServicio;
