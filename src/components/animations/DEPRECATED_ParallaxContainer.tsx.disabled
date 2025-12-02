"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  enableFloat?: boolean;
  floatIntensity?: number;
}

export default function ParallaxContainer({
  children,
  speed = 0.5,
  className = '',
  enableFloat = false,
  floatIntensity = 5
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection observer to only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Float animation
  useEffect(() => {
    if (!enableFloat || !isVisible) return;

    let animationId: number;
    const animate = () => {
      setFloatOffset(Math.sin(Date.now() * 0.001) * floatIntensity);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enableFloat, isVisible, floatIntensity]);

  // Calculate transforms
  const parallaxTransform = (isVisible && !prefersReducedMotion) ? scrollY * speed : 0;
  const totalTransform = parallaxTransform + (prefersReducedMotion ? 0 : floatOffset);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: `translateY(${totalTransform}px)`,
        transition: enableFloat ? 'none' : 'transform 0.1s ease-out',
        willChange: isVisible ? 'transform' : 'auto'
      }}
    >
      {children}
    </div>
  );
}