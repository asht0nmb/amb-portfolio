'use client';

import type { ReactNode } from 'react';
import TopHeader from '@/components/layout/TopHeader';
import FloatingNav from '@/components/layout/FloatingNav';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/transitions/PageTransition';
import ScrollToTop from '@/components/navigation/ScrollToTop';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <TopHeader />
      <FloatingNav />
      <main className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
} 