import requisitos from '../data/requisitos.json';

export default function RequisitosServicio({ tipoServicio }) {
  // Mapeo de tipos de servicio a las claves en requisitos.json
  const MAPEO_REQUISITOS = {
    'transferenciaDominio': 'transferencia_dominio',
    'hipotecas': 'hipoteca',
    'promesas': 'promesa_compraventa',
    'poder_natural': 'poder_persona_natural',
    'poder_juridico': 'poder_persona_juridica',
    'declaracion': 'declaracion_juramentada',
    'testamento': 'testamento',
    'divorcio': 'divorcio',
    'union_hecho': 'union_hecho',
    'reconocimiento_vehiculo': 'reconocimiento_vehiculo',
    'protocolizacion': 'protocolizacion',
    'autorizacion_salida': 'autorizacion_salida_pais',
    'posesion_efectiva': 'posesion_efectiva',
    'disolucion_sociedad': 'disolucion_sociedad_conyugal',
    'garantia_economica_natural': 'garantia_economica',
    'garantia_economica_juridica': 'garantia_economica',
    'baja_inventarios': 'baja_inventarios'
  };

  const claveRequisitos = MAPEO_REQUISITOS[tipoServicio];
  const requisitosServicio = requisitos[claveRequisitos] || [];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Requisitos</h3>
      {requisitosServicio.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          {requisitosServicio.map((requisito, index) => (
            <li key={index}>{requisito}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No hay requisitos específicos definidos para este servicio.</p>
      )}
    </div>
  );
}
