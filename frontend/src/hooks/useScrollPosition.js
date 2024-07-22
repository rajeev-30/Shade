import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[location.pathname] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const scrollPosition = scrollPositions.current[location.pathname] || 0;
    window.scrollTo(0, scrollPosition);
  }, [location.pathname]);
};

export default useScrollPosition;
