"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: string;
  x: number;
  y: number;
  timestamp: number;
  size: number;
  type: 'click' | 'auto';
}

interface InteractiveWaterRippleProps {
  className?: string;
  children?: React.ReactNode;
  autoRipple?: boolean;
  autoRippleDelay?: number;
}

export function InteractiveWaterRipple({ 
  className, 
  children,
  autoRipple = false,
  autoRippleDelay = 1000
}: InteractiveWaterRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback((x?: number, y?: number, type: 'click' | 'auto' = 'click') => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Use provided coordinates or center for auto ripples
    const rippleX = x !== undefined ? x : rect.width / 2;
    const rippleY = y !== undefined ? y : rect.height / 2;

    const newRipple: Ripple = {
      id: `ripple-${Date.now()}-${Math.random()}`,
      x: rippleX,
      y: rippleY,
      timestamp: Date.now(),
      size: type === 'auto' ? 60 : 40,
      type
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    const duration = type === 'auto' ? 3000 : 2000;
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createRipple(x, y, 'click');
  }, [createRipple]);

  // Auto ripple effect on mount
  useEffect(() => {
    if (autoRipple) {
      const timer = setTimeout(() => {
        createRipple(undefined, undefined, 'auto');
      }, autoRippleDelay);

      return () => clearTimeout(timer);
    }
  }, [autoRipple, autoRippleDelay, createRipple]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {children}
      
      {/* Ripple effects */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => {
          const isAutoRipple = ripple.type === 'auto';
          const animationName = isAutoRipple ? 'hero-ripple' : 'water-ripple';
          const duration = isAutoRipple ? '3s' : '2s';
          
          return (
            <div
              key={ripple.id}
              className={cn(
                "absolute rounded-full",
                isAutoRipple 
                  ? "border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-blue-400/5" 
                  : "border-2 border-blue-500/30 bg-blue-500/10"
              )}
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
                animation: `${animationName} ${duration} cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}