"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingSequence from '@/components/animations/LoadingSequence';
import { InteractiveWaterRipple } from '@/components/ui/InteractiveWaterRipple';

export default function RippleHero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setSkipAnimation(true);
      setAnimationComplete(true);
      setShowRipple(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
    localStorage.setItem('hasVisitedPortfolio', 'true');
    
    // Trigger ripple effect after content animation
    setTimeout(() => {
      setShowRipple(true);
    }, 800);
  };

  // Hero content component
  const HeroContent = ({ animated = false }: { animated?: boolean }) => (
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      {animated ? (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gray-900">Ashton</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Student, builder, photographer — exploring the intersection of business and technology
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="text-sm text-gray-500">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="text-sm text-gray-500">Seattle, WA</div>
          </motion.div>
        </>
      ) : (
        <>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Hi, I&apos;m
            <br />
            <span className="text-gray-900">Ashton</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Student, builder, photographer — exploring the intersection of business and technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-sm text-gray-500">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="text-sm text-gray-500">Seattle, WA</div>
          </div>
        </>
      )}
    </div>
  );

  // If skipping animation, show hero with ripple immediately
  if (skipAnimation) {
    return (
      <InteractiveWaterRipple 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
        autoRipple={true}
        autoRippleDelay={500}
      >
        <HeroContent />
      </InteractiveWaterRipple>
    );
  }

  return (
    <>
      {!animationComplete && <LoadingSequence onComplete={handleLoadingComplete} />}
      
      {animationComplete && (
        <InteractiveWaterRipple 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
          autoRipple={showRipple}
          autoRippleDelay={200}
        >
          <HeroContent animated={true} />
        </InteractiveWaterRipple>
      )}
    </>
  );
}