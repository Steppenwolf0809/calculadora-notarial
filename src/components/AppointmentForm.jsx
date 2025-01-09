import React from 'react';
import { Calendar, X } from 'lucide-react';

const AppointmentForm = ({ onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 max-w-sm w-full md:w-96 lg:w-[400px]">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-900" />
          <h3 className="text-lg font-semibold">Agendar una Cita</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
        />
        <textarea
          placeholder="Detalles de su trámite"
          rows="3"
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 resize-none"
        ></textarea>
        <button 
          type="submit"
          className="w-full bg-blue-900 text-white py-2.5 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center justify-center"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Agendar Cita
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
