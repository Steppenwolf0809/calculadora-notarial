import React, { useState, useEffect } from 'react';

const Header = ({ onShowForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/brand/Logo horizontal.png"
              alt="Abogados Online Ecuador"
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('servicios')}
              className={`nav-link ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-accent transition-colors`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className={`nav-link ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-accent transition-colors`}
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className={`nav-link ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-accent transition-colors`}
            >
              Contacto
            </button>
            <button
              onClick={onShowForm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Cita
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-2 space-y-1">
            <button
              onClick={() => scrollToSection('servicios')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Contacto
            </button>
            <button
              onClick={() => {
                onShowForm();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
