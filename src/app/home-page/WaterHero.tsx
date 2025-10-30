"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingSequence from '@/components/animations/LoadingSequence';
import { WaterBackground } from '@/components/ui/WaterBackground';

export default function WaterHero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [showWaterEffect, setShowWaterEffect] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setSkipAnimation(true);
      setAnimationComplete(true);
      setShowWaterEffect(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
    localStorage.setItem('hasVisitedPortfolio', 'true');
    
    // Trigger water effect after content animation
    setTimeout(() => {
      setShowWaterEffect(true);
    }, 1000);
  };

  // Hero content component with enhanced styling
  const HeroContent = ({ animated = false }: { animated?: boolean }) => (
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      {animated ? (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gray-900 relative">
              Ashton
              {/* Subtle text glow effect */}
              <div className="absolute inset-0 text-blue-500/10 blur-sm -z-10">
                Ashton
              </div>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
          >
            Student, builder, photographer — exploring the intersection of business and technology
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="text-sm text-gray-500 drop-shadow-sm">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="text-sm text-gray-500 drop-shadow-sm">Seattle, WA</div>
          </motion.div>
        </>
      ) : (
        <>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            Hi, I&apos;m
            <br />
            <span className="text-gray-900 relative">
              Ashton
              {/* Subtle text glow effect */}
              <div className="absolute inset-0 text-blue-500/10 blur-sm -z-10">
                Ashton
              </div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Student, builder, photographer — exploring the intersection of business and technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-sm text-gray-500 drop-shadow-sm">University of Washington</div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="text-sm text-gray-500 drop-shadow-sm">Seattle, WA</div>
          </div>
        </>
      )}
    </div>
  );

  // If skipping animation, show hero with water effect immediately
  if (skipAnimation) {
    return (
      <WaterBackground 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white water-surface"
        intensity="medium"
        autoStart={true}
        interactive={true}
      >
        {/* Ambient water layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-50/10 to-transparent pointer-events-none" />
        
        <HeroContent />
      </WaterBackground>
    );
  }

  return (
    <>
      {!animationComplete && <LoadingSequence onComplete={handleLoadingComplete} />}
      
      {animationComplete && (
        <WaterBackground 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white water-surface"
          intensity="medium"
          autoStart={showWaterEffect}
          interactive={true}
        >
          {/* Ambient water layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-50/10 to-transparent pointer-events-none" />
          
          {/* Enhanced background effects */}
          {showWaterEffect && (
            <>
              <div 
                className="absolute inset-0 bg-water-gradient pointer-events-none opacity-0"
                style={{
                  animation: 'fadeIn 2s ease-out 0.5s forwards'
                }}
              />
              <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-0"
                style={{
                  animation: 'fadeIn 3s ease-out 1s forwards, water-wave-0 8s ease-in-out 2s infinite'
                }}
              />
              <div 
                className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-blue-400/8 to-transparent rounded-full blur-2xl pointer-events-none opacity-0"
                style={{
                  animation: 'fadeIn 3s ease-out 1.5s forwards, water-wave-1 10s ease-in-out 2.5s infinite'
                }}
              />
            </>
          )}
          
          <HeroContent animated={true} />
        </WaterBackground>
      )}
    </>
  );
}