import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import NotaryCalculator from '../components/NotaryCalculator';
import AppointmentForm from '../components/AppointmentForm';
import ScrollProgress from '../components/ScrollProgress';
import WhatsAppButton from '../components/WhatsAppButton';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Abogados Online Ecuador | Servicios Notariales y Asesoría Legal</title>
        <meta name="description" content="Servicios notariales en línea en Ecuador. Calculadora de costos notariales, asesoría legal especializada, trámites eficientes y seguros. ¡Contáctanos ahora!" />
        <meta name="keywords" content="abogados online, servicios notariales, Ecuador, calculadora notarial, asesoría legal, trámites notariales" />
        <meta property="og:title" content="Abogados Online Ecuador | Servicios Notariales" />
        <meta property="og:description" content="Servicios notariales en línea en Ecuador. Calculadora de costos y asesoría legal especializada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abogadosonlineecuador.com" />
      </Head>

      <main className="min-h-screen bg-white relative">
        <ScrollProgress />
        <Header onShowForm={() => setShowForm(true)} />

        {/* Hero Section */}
        <HeroSection />

        {/* Sección de Valores */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">CONOCIMIENTOS Y EXPERIENCIA</h3>
                <p className="text-gray-600">Respaldados por años de experiencia y conocimiento profundo en trámites notariales.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">RAPIDEZ Y EFICIENCIA</h3>
                <p className="text-gray-600">Optimizamos cada proceso para brindarte el servicio más rápido sin comprometer la calidad.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">ATENCIÓN PERSONALIZADA</h3>
                <p className="text-gray-600">Te acompañamos en cada paso con asesoría profesional y dedicada.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios Notariales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transferencia de Dominio",
                  description: "Gestión profesional de escrituras y documentación legal para transferencias de propiedad",
                  icon: "🏠"
                },
                {
                  title: "Poderes y Mandatos",
                  description: "Elaboración y gestión de poderes generales y especiales",
                  icon: "📋"
                },
                {
                  title: "Declaraciones Juramentadas",
                  description: "Trámite rápido y seguro de declaraciones bajo juramento",
                  icon: "✍️"
                },
                {
                  title: "Promesa de Compraventa",
                  description: "Elaboración y gestión de promesas de compraventa de bienes inmuebles",
                  icon: "📝"
                },
                {
                  title: "Contratos de Arrendamiento",
                  description: "Elaboración y registro de contratos de alquiler",
                  icon: "🏢"
                },
                {
                  title: "Autorizaciones de Viaje",
                  description: "Gestión de permisos de viaje para menores",
                  icon: "✈️"
                }
              ].map((servicio) => (
                <div key={servicio.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                  <div className="text-4xl mb-4">{servicio.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{servicio.title}</h3>
                  <p className="text-gray-600">{servicio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculadora Section */}
        <section id="calculadora" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <NotaryCalculator />
          </div>
        </section>

        {/* Contacto Section */}
        <section id="contacto" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Información de Contacto</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p>+593 XX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Correo Electrónico</h3>
                    <p>contacto@abogadosonlineecuador.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p>Quito, Ecuador</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Horario de Atención</h3>
                    <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127635.40268158697!2d-78.57419419999999!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sQuito!5e0!3m2!1ses!2sec!4v1708482800000!5m2!1ses!2sec"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Abogados Online Ecuador</h3>
                <p className="text-gray-400">
                  Servicios notariales profesionales y eficientes en todo Ecuador.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li><a href="#servicios" className="text-gray-400 hover:text-white">Servicios</a></li>
                  <li><a href="#calculadora" className="text-gray-400 hover:text-white">Calculadora</a></li>
                  <li><a href="#contacto" className="text-gray-400 hover:text-white">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  {/* Aquí irían los íconos de redes sociales */}
                </div>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-gray-800">
              <p>© {new Date().getFullYear()} AbogadosOnlineEcuador. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Formulario flotante */}
        {showForm && <AppointmentForm onClose={() => setShowForm(false)} />}

        {/* Botones flotantes */}
        <div className="floating-buttons">
          <button
            onClick={() => setShowForm(true)}
            className="appointment-button"
            aria-label="Agendar cita"
          >
            <Calendar className="w-6 h-6" />
            <span>Agendar Cita</span>
          </button>
          <WhatsAppButton phoneNumber="593XXXXXXXXX" />
        </div>
      </main>
    </>
  );
};

// Schema.org markup para SEO
export const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Abogados Online Ecuador",
  "description": "Servicios notariales en línea en Ecuador. Calculadora de costos notariales y asesoría legal especializada.",
  "url": "https://abogadosonlineecuador.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Quito",
    "addressRegion": "Pichincha",
    "addressCountry": "EC"
  },
  "openingHours": "Mo-Fr 09:00-18:00"
};

export default Home;
