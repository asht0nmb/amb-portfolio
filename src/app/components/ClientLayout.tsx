'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import NavBar from '@/app/components/layout/NavBar';
import Footer from '@/app/components/layout/Footer';
import CustomCursor from '@/app/components/ui/CustomCursor';

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