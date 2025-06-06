'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import NavBar from '@/components/layout/nav1/NavBar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/features/cursor/CustomCursor';

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');
    document.body.classList.add('custom-cursor-active');
    
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
} 