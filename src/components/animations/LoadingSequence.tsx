"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [phase, setPhase] = useState<'loading' | 'shrinking' | 'sliding' | 'complete'>('loading');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('shrinking'), 1500);
    const timer2 = setTimeout(() => setPhase('sliding'), 2000);
    const timer3 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Loading Phase - Start with full name */}
            {phase === 'loading' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-2xl md:text-4xl font-bold text-gray-900"
              >
                I&apos;m Ashton Meyer-Bibbins
              </motion.div>
            )}

            {/* Shrinking Phase - Scale down */}
            {phase === 'shrinking' && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl md:text-4xl font-bold text-gray-900"
              >
                I&apos;m Ashton Meyer-Bibbins
              </motion.div>
            )}

            {/* Sliding Phase - Transform to final text */}
            {phase === 'sliding' && (
              <div className="text-2xl md:text-4xl font-bold text-gray-900">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block mr-3"
                >
                  I&apos;m
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="inline-block mr-3"
                >
                  Hi, I&apos;m
                </motion.span>
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Ashton
                </motion.span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}