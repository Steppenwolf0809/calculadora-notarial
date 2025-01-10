import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, Calendar } from 'lucide-react';
import '../styles/header.css';

const Header = ({ onShowForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className={`top-bar ${isScrolled ? 'hidden' : ''}`}>
        <div className="top-bar-content">
          <div className="top-bar-info">
            <div className="top-bar-item">
              <Phone className="w-4 h-4" />
              <span>+593 XX XXX XXXX</span>
            </div>
            <div className="top-bar-item">
              <Clock className="w-4 h-4" />
              <span>Lun - Vie: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="main-header-content">
          {/* Logo */}
          <Link href="/" className="logo-container">
            <Image 
              src="/brand/Logo horizontal.png"
              alt="Abogados Online Ecuador Logo"
              width={180}
              height={45}
              priority
              className={`w-[180px] h-[45px] transition-all duration-300 ${
                isScrolled ? 'brightness-100' : 'brightness-[1.15]'
              }`}
              style={{
                filter: !isScrolled ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link href="#servicios" className="nav-link">
              Servicios
            </Link>
            <Link href="#calculadora" className="nav-link">
              Calculadora
            </Link>
            <Link href="#contacto" className="nav-link">
              Contacto
            </Link>
            <button 
              onClick={onShowForm}
              className="nav-cta"
            >
              <Calendar className="w-5 h-5 inline-block mr-2" />
              Agendar Cita
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-button ${isScrolled ? 'scrolled' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menú"
          >
            <span className="bg-current"></span>
            <span className="bg-current"></span>
            <span className="bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={`nav-mobile ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        style={{
          backgroundColor: isScrolled ? 'white' : 'rgba(255, 255, 255, 0.98)'
        }}
      >
        <div className="nav-mobile-links">
          <Link 
            href="#servicios" 
            className="nav-mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link 
            href="#calculadora" 
            className="nav-mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Calculadora
          </Link>
          <Link 
            href="#contacto" 
            className="nav-mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacto
          </Link>
          <button 
            onClick={() => {
              onShowForm();
              setIsMobileMenuOpen(false);
            }}
            className="nav-mobile-cta"
          >
            <Calendar className="w-5 h-5 inline-block mr-2" />
            Agendar Cita
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
