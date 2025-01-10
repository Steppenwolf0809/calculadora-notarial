import React, { useState, useEffect, useRef } from 'react';

const AdaptiveVideo = ({ 
  sources,
  poster,
  fallbackImage,
  className = '',
  onLoad = () => {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Detectar la conexión y capacidades del dispositivo
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection?.effectiveType || '4g';
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isHighEnd = devicePixelRatio > 1 && effectiveType === '4g';
    const isMobile = window.innerWidth < 768;

    // Seleccionar la mejor fuente basada en las capacidades
    let bestSource;
    if (isMobile) {
      bestSource = sources.find(s => s.quality === 'low') || sources[0];
    } else if (isHighEnd) {
      bestSource = sources.find(s => s.quality === 'high') || sources[0];
    } else {
      bestSource = sources.find(s => s.quality === 'medium') || sources[0];
    }

    setSelectedSource(bestSource);
  }, [sources]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    console.error('Error loading video');
  };

  if (hasError || !selectedSource) {
    return (
      <div 
        className={`${className} bg-cover bg-center`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />
    );
  }

  return (
    <>
      <div 
        className={`${className} bg-cover bg-center transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${poster})` }}
      />
      <video
        ref={videoRef}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        onLoadedData={handleLoad}
        onError={handleError}
      >
        <source src={selectedSource.src} type={selectedSource.type} />
      </video>
    </>
  );
};

export default AdaptiveVideo;
