"use client";

import { motion, LayoutGroup } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingSequence from '@/components/animations/LoadingSequence';
import RotatingText from '@/components/text/RotatingText';

export default function SimpleHero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Rotating captions - add/edit these texts
  const rotatingCaptions = [
    "happy to be here",
    "currently studying informatics, business, and math @ UW",
    "probably (hopefully) on a mountain somewhere",
    "prev @ micron technology, july ai"
  ];

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
    <div className="min-h-[60vh] flex items-center justify-center px-6 bg-[#faf9f6] pt-16">
      <div className="max-w-3xl mx-auto text-center">
        {animated ? (
          <>
            <motion.h1
              layoutId="ashton-text"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 text-center tracking-tight"
            >
              Ashton Meyer Bibbins
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-base md:text-xl lg:text-2xl font-normal text-gray-700 max-w-3xl text-center mb-8 leading-relaxed"
            >
              I build things that matter to me, and share them here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-xs md:text-sm text-gray-500"
            >
              <RotatingText texts={rotatingCaptions} interval={4000} />
            </motion.div>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 text-center tracking-tight">
              Ashton Meyer Bibbins
            </h1>

            <p className="text-base md:text-xl lg:text-2xl font-normal text-gray-700 max-w-3xl text-center mb-8 leading-relaxed">
              I build things that matter to me, and share them here.
            </p>

            <div className="text-xs md:text-sm text-gray-500">
              <RotatingText texts={rotatingCaptions} interval={4000} />
            </div>
          </>
        )}
      </div>
    </div>
  );

  // If skipping animation, show hero immediately
  if (skipAnimation) {
    return <HeroContent />;
  }

  return (
    <LayoutGroup>
      {/* Loading sequence */}
      {!animationComplete && <LoadingSequence onComplete={handleLoadingComplete} />}

      {/* Hero - render as soon as loading completes to enable layoutId transition */}
      {animationComplete && <HeroContent animated={true} />}
    </LayoutGroup>
  );
}
