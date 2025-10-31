"use client";

import { motion, LayoutGroup } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingSequence from '@/components/animations/LoadingSequence';
import Shuffle from '@/components/text/Shuffle';

export default function SimpleHero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setSkipAnimation(true);
      setAnimationComplete(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
    localStorage.setItem('hasVisitedPortfolio', 'true');
  };

  // Hero content component
  const HeroContent = ({ animated = false }: { animated?: boolean }) => (
    <div className="relative z-10 px-6 max-w-lg mx-auto">
      {animated ? (
        <>
          <motion.h1
            layoutId="ashton-text"
            className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight"
          >
            Ashton
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="w-16 h-px bg-gray-300 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed italic"
          >
            Always in{' '}
            <Shuffle
              text="motion"
              tag="span"
              shuffleDirection="right"
              duration={0.5}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.05}
              threshold={0.1}
              triggerOnce={false}
              triggerOnHover={true}
              respectReducedMotion={true}
              className="inline-block"
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontStyle: 'inherit',
                color: 'inherit'
              }}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="text-xs text-gray-400">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full mt-1.5"></div>
            <div className="text-xs text-gray-400">Seattle, WA</div>
          </motion.div>
        </>
      ) : (
        <>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Ashton
          </h1>

          <div className="w-59 h-px bg-gray-300 mb-6" />

          <p className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed italic">
            Always in{' '}
            <Shuffle
              text="motion"
              tag="span"
              shuffleDirection="right"
              duration={0.5}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.05}
              threshold={0.1}
              triggerOnce={false}
              triggerOnHover={true}
              respectReducedMotion={true}
              className="inline-block"
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontStyle: 'inherit',
                color: 'inherit'
              }}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="text-xs text-gray-400">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full mt-1.5"></div>
            <div className="text-xs text-gray-400">Seattle, WA</div>
          </div>
        </>
      )}
    </div>
  );

  // If skipping animation, show hero immediately
  if (skipAnimation) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-visible bg-white">
        <HeroContent />
      </div>
    );
  }

  return (
    <LayoutGroup>
      {/* Loading sequence */}
      {!animationComplete && <LoadingSequence onComplete={handleLoadingComplete} />}

      {/* Hero - render as soon as loading completes to enable layoutId transition */}
      {animationComplete && (
        <div className="relative min-h-screen flex items-center justify-center overflow-visible bg-white">
          <HeroContent animated={true} />
        </div>
      )}
    </LayoutGroup>
  );
}