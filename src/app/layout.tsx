import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/app/ClientLayout';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'leaflet/dist/leaflet.css';


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
          <Analytics />
          <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}