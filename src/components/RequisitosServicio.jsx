import React from 'react';
import requisitos from '../data/requisitos.json';

const RequisitosServicio = ({ tramiteId }) => {
  const listaRequisitos = requisitos[tramiteId];

  if (!listaRequisitos) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Requisitos
      </h3>
      
      <div className="space-y-4">
        <ul className="space-y-3">
          {listaRequisitos.map((requisito, index) => (
            <li key={index} className="flex items-start space-x-3 text-base text-gray-600 leading-relaxed">
              <span className="text-blue-500 mt-1.5">•</span>
              <span>{requisito}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequisitosServicio;
