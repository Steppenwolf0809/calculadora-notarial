import React from 'react';

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-col items-center text-center">
      <img src={icon} alt={title} className="w-16 h-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      icon: '/icons/transferencia.svg',
      title: 'Transferencia de Dominio',
      description: 'Gestión profesional de escrituras y documentación legal para transferencias de propiedad'
    },
    {
      icon: '/icons/poderes.svg',
      title: 'Poderes y Mandatos',
      description: 'Elaboración y gestión de poderes generales y especiales'
    },
    {
      icon: '/icons/declaraciones.svg',
      title: 'Declaraciones Juramentadas',
      description: 'Trámite rápido y seguro de declaraciones bajo juramento'
    },
    {
      icon: '/icons/promesa.svg',
      title: 'Promesa de Compraventa',
      description: 'Elaboración y gestión de promesas de compraventa de bienes inmuebles'
    },
    {
      icon: '/icons/contratos.svg',
      title: 'Contratos de Arrendamiento',
      description: 'Elaboración y registro de contratos de alquiler'
    },
    {
      icon: '/icons/viaje.svg',
      title: 'Autorizaciones de Viaje',
      description: 'Gestión de permisos de viaje para menores'
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Nuestros Servicios Notariales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
