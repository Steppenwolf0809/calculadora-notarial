export const mediaConfig = {
  hero: {
    // Video de fondo optimizado para diferentes dispositivos
    video: {
      mobile: '/videos/hero-background-mobile.mp4',
      desktop: '/videos/hero-background.mp4',
      fallback: '/images/hero-poster.jpg',
    },
    // Imágenes de poster para diferentes dispositivos
    poster: {
      mobile: '/images/hero-poster-mobile.jpg',
      desktop: '/images/hero-poster.jpg',
    },
    // Configuración del video
    videoSettings: {
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      quality: {
        maxWidth: 1920,
        maxHeight: 1080,
        targetFileSize: '5MB', // Tamaño objetivo para optimización
      },
    },
  },
  // Otras configuraciones de medios pueden ir aquí
};

// Función helper para seleccionar la fuente correcta basada en el dispositivo
export const getMediaSource = (type, device = 'desktop') => {
  const media = mediaConfig[type];
  if (!media) return null;

  if (type === 'hero') {
    return {
      video: device === 'mobile' ? media.video.mobile : media.video.desktop,
      poster: device === 'mobile' ? media.poster.mobile : media.poster.desktop,
      fallback: media.video.fallback,
    };
  }

  return null;
};

// Función helper para verificar soporte de video
export const checkVideoSupport = () => {
  if (typeof window === 'undefined') return false;
  
  const video = document.createElement('video');
  return video.canPlayType('video/mp4') !== '';
};
