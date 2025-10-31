'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import GlassNavBar from '@/components/layout/GlassNavBar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/features/cursor/CustomCursor';
import PageTransition from '@/components/transitions/PageTransition';
import ScrollToTop from '@/components/navigation/ScrollToTop';

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
      <ScrollToTop />
      <CustomCursor />
      <GlassNavBar />
      <main className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
} 