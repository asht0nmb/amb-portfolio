'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedGlassNavBar from '@/components/layout/AnimatedGlassNavBar';
import Footer from '@/components/layout/Footer';

interface AnimatedClientLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function AnimatedClientLayout({ children, showNav = false }: AnimatedClientLayoutProps) {
  const [showFooter, setShowFooter] = useState(false);



  useEffect(() => {
    if (showNav) {
      // Show footer after nav animation completes
      const timer = setTimeout(() => setShowFooter(true), 900);
      return () => clearTimeout(timer);
    }
  }, [showNav]);

  return (
    <>
      <AnimatedGlassNavBar show={showNav} />
      <main className="flex-1">
        {children}
      </main>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={showFooter ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </>
  );
}