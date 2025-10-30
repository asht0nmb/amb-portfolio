"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'complete'>('loading');

  useEffect(() => {
    // Show "Hi, I'm Ashton" for 1.8 seconds, then fade out "Hi, I'm"
    const timer1 = setTimeout(() => setPhase('fading'), 1800);
    const timer2 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 bg-white z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Centered layout for loading text */}
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              {/* "Hi, I'm" - fades out before transition */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'loading' ? 1 : 0 }}
                transition={{
                  duration: phase === 'loading' ? 0.6 : 0.3,
                  ease: "easeOut"
                }}
                className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight inline-block mr-3"
              >
                Hi, I&apos;m
              </motion.span>

              {/* "Ashton" - shared layout element that will transition to hero */}
              <motion.span
                layoutId="ashton-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight inline-block"
              >
                Ashton
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}