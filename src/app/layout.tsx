import type { ReactNode } from 'react';
import './globals.css';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import CustomCursor from '@/app/components/CustomCursor';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CustomCursor />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}