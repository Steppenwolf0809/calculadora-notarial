import React from 'react';
import BackgroundVideo from './BackgroundVideo';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden performance-improvements">
      <BackgroundVideo />
      
      {/* Contenido principal */}
      <div className="video-content relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32 text-center text-white">
        <div className="space-y-8 mb-16">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <h1 className="font-jakarta text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              RAPIDEZ, COMPROMISO Y<br className="hidden sm:block" />PROFESIONALIDAD
            </h1>
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-inter text-white/90">
              Simplificamos tus trámites notariales con asesoría profesional y calculadora de costos en tiempo real
            </p>
          </div>
        </div>
        
        {/* CTA Principal con animación */}
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a 
              href="#calculadora"
              className="btn btn-primary hover-scale group relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 interactive-element"
            >
              <span className="relative z-10 flex items-center">
                <span>Calcular Costos Notariales</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>
          </div>
        </div>
        
        {/* Estadísticas con animación */}
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: "+1000", label: "Clientes Satisfechos" },
              { number: "15+", label: "Años de Experiencia" },
              { number: "24/7", label: "Soporte Online" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-105 transition-all duration-300 p-4 rounded-lg hover:bg-white/5 interactive-element progressive-load loaded"
              >
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-sm font-medium text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in opacity-0 z-20" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
        <a href="#servicios" className="animate-bounce interactive-element block p-2 hover:text-accent transition-colors">
          <svg className="w-6 h-6 text-white/75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="sr-only">Desplazar hacia abajo</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
