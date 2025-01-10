import React, { useState, useEffect, useRef } from 'react';

const BackgroundVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Precargar el video
  useEffect(() => {
    const preloadVideo = async () => {
      try {
        const video = videoRef.current;
        if (video) {
          // Intentar precargar el video
          await new Promise((resolve, reject) => {
            video.load();
            video.oncanplaythrough = resolve;
            video.onerror = reject;
          });
          setIsPreloading(false);
        }
      } catch (error) {
        console.error('Error al precargar el video:', error);
        setHasError(true);
        setIsPreloading(false);
      }
    };

    preloadVideo();
  }, []);

  useEffect(() => {
    // Detectar dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar inicialmente y en cada resize
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Ajustar la velocidad de reproducción y calidad en móviles
    if (videoRef.current) {
      // Reducir velocidad en móviles para mejorar rendimiento
      videoRef.current.playbackRate = isMobile ? 0.75 : 1;
      
      // Ajustar calidad del video según el dispositivo
      if (isMobile) {
        videoRef.current.style.transform = 'scale(1.2)'; // Zoom para móviles
        videoRef.current.style.objectPosition = 'center 20%'; // Ajustar posición
      } else {
        videoRef.current.style.transform = 'scale(1)';
        videoRef.current.style.objectPosition = 'center center';
      }
    }
  }, [isMobile]);

  // Optimizar el efecto de paralaje según el dispositivo
  const getParallaxTransform = () => {
    if (isMobile) {
      return `translate3d(0, ${scrollPosition * 0.3}px, 0)`; // Menor efecto en móviles
    }
    return `translate3d(0, ${scrollPosition * 0.5}px, 0)`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const speed = 0.5; // Ajusta la velocidad del paralaje
        setScrollPosition(scrolled * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* Contenedor del video con efecto paralaje */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: getParallaxTransform(),
          transition: 'transform 0.1s linear',
          willChange: 'transform, opacity',
        }}
      >
        {/* Video de fondo */}
        <video 
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            transform: isMobile ? 'scale(1.2)' : 'scale(1.1)',
            transformOrigin: 'center center'
          }}
          onLoadedData={() => {
            setTimeout(() => setIsVideoLoaded(true), 100);
          }}
        >
          <source 
            src="/videos/hero-background.mp4" 
            type="video/mp4"
          />
        </video>

        {/* Imagen de respaldo mientras carga el video */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 video-content ${
            isVideoLoaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Gradiente animado con pulso */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-gradient animate-pulse-slow"></div>
          
          {/* Indicador de carga */}
          {isPreloading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-white opacity-20 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
          
          {/* Mensaje de error */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-white text-center px-4">
                Error al cargar el video. <br />
                <button 
                  onClick={() => window.location.reload()}
                  className="underline hover:text-primary mt-2"
                >
                  Intentar de nuevo
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Sistema de capas para el overlay */}
      <div className="video-overlay">
        {/* Textura sutil */}
        <div className="absolute inset-0 bg-texture opacity-5"></div>
        
        {/* Vignette y gradiente */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40"></div>
        
        {/* Tono de color */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
