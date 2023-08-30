import { useState, useEffect } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      // самовызывающаяся функция throttle для уменьшения 
      // количества срабатываний resize
      (function throttle() { 
        setTimeout(() => {
          setWidth(event.target.innerWidth)
      }, 5000);
      }())
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isWideScreen: width >= 1200,
    isMiddleScreen: width >= 720 && width <= 1199,
    isNarrowScreen: width <= 719,
  };
};