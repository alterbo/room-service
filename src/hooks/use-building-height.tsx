import { useRef, useLayoutEffect, useState } from 'react';

export const useElementHeight = <T extends HTMLElement>() => {
  const elementRef = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
  }, []);

  return {
    elementRef,
    height,
  };
}
