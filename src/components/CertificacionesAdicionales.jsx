import { useState, useEffect } from 'react';

const TIPOS_CERTIFICACION = {
  COMPULSA: {
    nombre: 'Certificación de compulsas y copias certificadas (por hoja)',
    tarifa: 1.79
  },
  DOC_ELECTRONICO: {
    nombre: 'Materialización de documentos electrónicos (por hoja)',
    tarifa: 1.34
  },
  FIRMA_REGISTRADA: {
    nombre: 'Certificación de firma registrada de funcionarios',
    tarifa: 18.80
  },
  PLANOS: {
    nombre: 'Certificación de planos',
    tarifa: 3.00
  }
};

export default function CertificacionesAdicionales({ onCertificacionesChange }) {
  const [certificaciones, setCertificaciones] = useState([]);
  const [tipoCertificacion, setTipoCertificacion] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const agregarCertificacion = (e) => {
    e.preventDefault();
    if (!tipoCertificacion) return;

    const tarifa = TIPOS_CERTIFICACION[tipoCertificacion].tarifa;
    const subtotal = tarifa * cantidad;

    const nuevaCertificacion = {
      id: Date.now(),
      tipo: tipoCertificacion,
      cantidad: cantidad,
      subtotal: subtotal
    };

    const nuevasCertificaciones = [...certificaciones, nuevaCertificacion];
    setCertificaciones(nuevasCertificaciones);

    // Calcular y notificar el nuevo total inmediatamente
    const nuevoTotal = nuevasCertificaciones.reduce((sum, cert) => {
      return sum + (TIPOS_CERTIFICACION[cert.tipo].tarifa * cert.cantidad);
    }, 0);
    
    onCertificacionesChange(nuevoTotal);
    
    // Resetear campos
    setTipoCertificacion('');
    setCantidad(1);
  };

  const eliminarCertificacion = (id) => {
    const nuevasCertificaciones = certificaciones.filter(cert => cert.id !== id);
    setCertificaciones(nuevasCertificaciones);

    // Recalcular y notificar el nuevo total inmediatamente
    const nuevoTotal = nuevasCertificaciones.reduce((sum, cert) => {
      return sum + (TIPOS_CERTIFICACION[cert.tipo].tarifa * cert.cantidad);
    }, 0);
    
    onCertificacionesChange(nuevoTotal);
  };

  // Debugging
  useEffect(() => {
    const total = certificaciones.reduce((sum, cert) => {
      const subtotal = TIPOS_CERTIFICACION[cert.tipo].tarifa * cert.cantidad;
      console.log(`Certificación ${cert.tipo}:`, {
        cantidad: cert.cantidad,
        tarifa: TIPOS_CERTIFICACION[cert.tipo].tarifa,
        subtotal
      });
      return sum + subtotal;
    }, 0);
    console.log('Total certificaciones:', total);
  }, [certificaciones]);

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Certificaciones Adicionales
      </h3>

      <div className="space-y-4">
        <form onSubmit={agregarCertificacion} className="space-y-4">
          {/* Selector de certificación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <select
                className="select-field"
                value={tipoCertificacion}
                onChange={(e) => setTipoCertificacion(e.target.value)}
                required
              >
                <option value="">Seleccione una certificación</option>
                {Object.entries(TIPOS_CERTIFICACION).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.nombre} (${value.tarifa})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                className="input-field"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                required
                placeholder="Cantidad"
              />
            </div>
          </div>

          {/* Botón agregar */}
          <button
            type="submit"
            className="btn w-full md:w-auto"
            disabled={!tipoCertificacion}
          >
            Agregar Certificación
          </button>
        </form>

        {/* Lista de certificaciones agregadas */}
        {certificaciones.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Certificaciones Agregadas:</h4>
            <ul className="space-y-2">
              {certificaciones.map((cert) => (
                <li key={cert.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {TIPOS_CERTIFICACION[cert.tipo].nombre}
                    </p>
                    <p className="text-xs text-gray-600">
                      Cantidad: {cert.cantidad} | Subtotal: ${(TIPOS_CERTIFICACION[cert.tipo].tarifa * cert.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => eliminarCertificacion(cert.id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium text-blue-800">
                Total Certificaciones: ${certificaciones.reduce((sum, cert) => 
                  sum + (TIPOS_CERTIFICACION[cert.tipo].tarifa * cert.cantidad), 0).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
