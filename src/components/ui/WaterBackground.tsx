"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WaterBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  autoStart?: boolean;
  interactive?: boolean;
}

interface WaveDisturbance {
  id: string;
  x: number;
  y: number;
  timestamp: number;
  intensity: number;
}

export function WaterBackground({
  className,
  children,
  intensity = 'medium',
  autoStart = true,
  interactive = true
}: WaterBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disturbances, setDisturbances] = useState<WaveDisturbance[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Intensity configurations
  const intensityConfig = {
    subtle: {
      waveCount: 3,
      maxOpacity: 0.1,
      animationDuration: '8s',
      disturbanceSize: 200,
      shadowIntensity: 0.05
    },
    medium: {
      waveCount: 4,
      maxOpacity: 0.15,
      animationDuration: '6s',
      disturbanceSize: 300,
      shadowIntensity: 0.08
    },
    strong: {
      waveCount: 5,
      maxOpacity: 0.2,
      animationDuration: '4s',
      disturbanceSize: 400,
      shadowIntensity: 0.12
    }
  };

  const config = intensityConfig[intensity];

  // Create wave disturbance on interaction
  const createDisturbance = useCallback((x?: number, y?: number, customIntensity?: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const disturbanceX = x !== undefined ? x : rect.width / 2;
    const disturbanceY = y !== undefined ? y : rect.height / 2;

    const newDisturbance: WaveDisturbance = {
      id: `wave-${Date.now()}-${Math.random()}`,
      x: disturbanceX,
      y: disturbanceY,
      timestamp: Date.now(),
      intensity: customIntensity || 1
    };

    setDisturbances(prev => [...prev, newDisturbance]);

    // Remove disturbance after animation
    setTimeout(() => {
      setDisturbances(prev => prev.filter(d => d.id !== newDisturbance.id));
    }, 4000);
  }, []);

  // Handle click interactions
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createDisturbance(x, y, 1.5);
  }, [interactive, createDisturbance]);

  // Auto-start effect
  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        setIsActive(true);
        createDisturbance(); // Center disturbance
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoStart, createDisturbance]);

  // Generate wave layers
  const generateWaveLayers = () => {
    return Array.from({ length: config.waveCount }, (_, index) => {
      const delay = index * 0.5;
      const scale = 1 + index * 0.2;
      const opacity = config.maxOpacity * (1 - index * 0.15);
      
      return (
        <div
          key={`wave-layer-${index}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: `water-wave-${index % 3} ${config.animationDuration} ease-in-out infinite`,
            animationDelay: `${delay}s`,
            transform: `scale(${scale})`,
            opacity: isActive ? opacity : 0,
            transition: 'opacity 1s ease-out'
          }}
        >
          {/* Primary wave */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent rounded-full blur-xl" />
          
          {/* Secondary wave with offset */}
          <div 
            className="absolute inset-0 bg-gradient-to-tl from-blue-600/15 via-transparent to-blue-300/8 rounded-full blur-lg"
            style={{
              transform: `translate(${10 + index * 5}px, ${5 + index * 3}px)`
            }}
          />
          
          {/* Shadow layer */}
          <div 
            className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-transparent to-transparent rounded-full blur-2xl"
            style={{
              transform: `translate(${-5 - index * 2}px, ${10 + index * 4}px)`
            }}
          />
        </div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        interactive && "cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {/* SVG Filter Definitions */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="water-distortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.02 0.01"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.02 0.01;0.03 0.015;0.02 0.01"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="3"
              result="displacement"
            />
            <feGaussianBlur in="displacement" stdDeviation="1" />
          </filter>
          
          <filter id="water-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background Water Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {generateWaveLayers()}
        
        {/* Interactive Disturbances */}
        {disturbances.map((disturbance) => (
          <div
            key={disturbance.id}
            className="absolute pointer-events-none"
            style={{
              left: disturbance.x - config.disturbanceSize / 2,
              top: disturbance.y - config.disturbanceSize / 2,
              width: config.disturbanceSize,
              height: config.disturbanceSize,
            }}
          >
            {/* Primary disturbance wave */}
            <div 
              className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-400/15 to-transparent rounded-full"
              style={{
                animation: `water-disturbance 3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                filter: 'blur(8px)'
              }}
            />
            
            {/* Secondary ripple */}
            <div 
              className="absolute inset-0 bg-gradient-radial from-transparent via-blue-300/20 to-transparent rounded-full"
              style={{
                animation: `water-disturbance-secondary 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: '0.2s',
                filter: 'blur(12px)'
              }}
            />
            
            {/* Shadow effect */}
            <div 
              className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent rounded-full"
              style={{
                animation: `water-shadow 4s ease-out forwards`,
                transform: 'translate(8px, 12px)',
                filter: 'blur(16px)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ filter: 'url(#water-distortion)' }}>
        {children}
      </div>
    </div>
  );
}