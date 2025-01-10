import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / maxScroll) * 100;
      setScrollWidth(scrollPercent);
    };

    // Actualizar en el scroll
    window.addEventListener('scroll', updateScrollProgress);
    // Actualizar en resize para recalcular maxScroll
    window.addEventListener('resize', updateScrollProgress);
    
    // Limpieza de event listeners
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${scrollWidth}%` }}
      role="progressbar"
      aria-valuenow={scrollWidth}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  );
};

export default ScrollProgress;
