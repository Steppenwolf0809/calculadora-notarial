import React from 'react';
import { Calendar } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, onShowForm }) => {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <a 
                  href="#servicios" 
                  className="block text-lg text-gray-600 hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Servicios
                </a>
              </li>
              <li>
                <a 
                  href="#calculadora" 
                  className="block text-lg text-gray-600 hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Calculadora
                </a>
              </li>
              <li>
                <a 
                  href="#contacto" 
                  className="block text-lg text-gray-600 hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Contacto
                </a>
              </li>
              <li className="pt-4">
                <button
                  onClick={() => {
                    onShowForm();
                    onClose();
                  }}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
