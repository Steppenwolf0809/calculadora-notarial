import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
      answer: "Sí, pueden aplicar descuentos especiales según el tipo de trámite y las características del usuario. Consulte en la notaría si su caso califica para algún descuento o exención."
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Preguntas Frecuentes
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <p className="text-lg text-gray-600 p-6 pt-0 whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
