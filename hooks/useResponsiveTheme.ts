'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const useResponsiveTheme = () => {
  const { resolvedTheme, setTheme, theme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return
    const handleResize = () => {
      const width = window.innerWidth;
      if (resolvedTheme.includes('dark')) {
        if (width <= 640) {
          setTheme('dark-mobile');
        } else if (width <= 1025) {
          setTheme('dark-tablet');
        } else {
          setTheme('dark-desktop');
        }
      } else {
        if (width <= 640) {
          setTheme('light-mobile');
        } else if (width <= 1025) {
          setTheme('light-tablet');
        } else {
          setTheme('light-desktop');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the correct theme
    return () => window.removeEventListener('resize', handleResize);
  }, [resolvedTheme]);

};

export default useResponsiveTheme;