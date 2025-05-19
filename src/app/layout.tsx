import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/app/components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Ashton's Portfolio",
  description: 'Personal portfolio and blog',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}