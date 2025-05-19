'use client';

import type { ReactNode } from 'react';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import CustomCursor from '@/app/components/CustomCursor';

export default function ClientLayout({ children }: { children: ReactNode }) {
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