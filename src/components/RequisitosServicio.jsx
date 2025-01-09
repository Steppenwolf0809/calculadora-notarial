import requisitos from '../data/requisitos.json';

const MAPEO_SERVICIOS = {
  'transferenciaDominio': 'transferencia_dominio',
  'poder_natural': 'poder_persona_natural',
  'poder_juridico': 'poder_persona_juridica',
  'hipotecas': 'hipoteca',
  'testamento': 'testamento',
  'declaracion': 'declaracion_juramentada',
  'union_hecho': 'union_hecho',
  'divorcio': 'divorcio',
  'promesas': 'promesa_compraventa'
};

export default function RequisitosServicio({ tipoServicio }) {
  const servicioKey = MAPEO_SERVICIOS[tipoServicio];
  
  if (!servicioKey || !requisitos[servicioKey]) {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Requisitos Necesarios
      </h3>
      <ul className="space-y-2">
        {requisitos[servicioKey].map((requisito, index) => (
          <li key={index} className="flex items-start text-sm text-blue-800">
            <svg 
              className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
            {requisito}
          </li>
        ))}
      </ul>
    </div>
  );
}
