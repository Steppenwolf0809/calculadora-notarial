import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué documentos necesito para realizar un trámite notarial?",
      answer: "Los documentos requeridos varían según el tipo de trámite. En general, necesitará su cédula de identidad y certificado de votación originales. La calculadora muestra los requisitos específicos para cada trámite."
    },
    {
      question: "¿Cuánto tiempo toma realizar un trámite notarial?",
      answer: "El tiempo varía según el tipo de trámite y la complejidad del caso. Algunos trámites como reconocimientos de firma pueden realizarse el mismo día, mientras otros como escrituras pueden tomar varios días."
    },
    {
      question: "¿Existen descuentos o exenciones en los trámites notariales?",
      answer: "Sí, existen descuentos especiales para ciertos grupos:\n\n- Adultos mayores: 50% de descuento en trámites bilaterales y 100% en unilaterales\n- Personas con discapacidad: 50% de descuento en trámites bilaterales y 100% en unilaterales\n- Vivienda de interés social: 25% de descuento en trámites hasta $60,000"
    },
    {
      question: "¿Puedo realizar trámites notariales en línea?",
      answer: "Algunos trámites pueden iniciarse en línea, pero la mayoría requieren su presencia física en la notaría para la firma de documentos y verificación de identidad."
    },
    {
      question: "¿Qué formas de pago aceptan?",
      answer: "Aceptamos efectivo, tarjetas de débito y crédito, y transferencias bancarias. El pago debe realizarse antes de la entrega de los documentos."
    },
    {
      question: "¿Necesito un abogado para realizar trámites notariales?",
      answer: "Para algunos trámites como escrituras, promesas de compraventa y poderes, se requiere una minuta firmada por un abogado. Para otros trámites más simples como reconocimientos de firma, no es necesario."
    },
    {
      question: "¿Qué pasa si no tengo todos los documentos requeridos?",
      answer: "No se puede proceder con el trámite hasta tener toda la documentación requerida. Le recomendamos revisar la lista de requisitos en nuestra calculadora antes de visitar la notaría."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Preguntas Frecuentes
      </h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {faq.question}
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
