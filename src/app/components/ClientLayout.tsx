'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import CustomCursor from '@/app/components/CustomCursor';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [hasCustomCursor, setHasCustomCursor] = useState(false);

  useEffect(() => {
    // Check if we should use custom cursor
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateCursorState = (e: MediaQueryListEvent | MediaQueryList) => {
      setHasCustomCursor(e.matches);
      // Add or remove class from body
      if (e.matches) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    // Initial check
    updateCursorState(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', updateCursorState);
    
    return () => {
      mediaQuery.removeEventListener('change', updateCursorState);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {hasCustomCursor && <CustomCursor />}
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
} 