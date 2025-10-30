"use client";

import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
  enableParallax?: boolean;
  parallaxSpeed?: number;
}

export function useScrollAnimations(options: UseScrollAnimationsOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    enableParallax = true,
    parallaxSpeed = 0.5
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll position tracking
  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax]);

  // Intersection observer for reveal animations
  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  // Calculate parallax transform
  const getParallaxTransform = (speed: number = parallaxSpeed) => {
    if (!enableParallax || prefersReducedMotion) return {};
    
    const yOffset = scrollPosition.y * speed;
    return {
      transform: `translateY(${yOffset}px)`,
      willChange: 'transform'
    };
  };

  // Get reveal animation styles
  const getRevealStyles = (delay: number = 0) => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'translateY(0px)',
        transition: 'none'
      };
    }
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
      transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
    };
  };

  return {
    elementRef,
    scrollPosition,
    isVisible,
    hasAnimated,
    getParallaxTransform,
    getRevealStyles
  };
}

// Hook for wave-like section transitions
export function useWaveTransition() {
  const [waveProgress, setWaveProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Calculate wave progress based on intersection ratio
        const progress = Math.max(0, Math.min(1, entry.intersectionRatio));
        setWaveProgress(progress);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 steps
        rootMargin: '0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const getWaveStyles = () => {
    const waveOffset = Math.sin(waveProgress * Math.PI) * 10;
    return {
      transform: `translateY(${waveOffset}px)`,
      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  return {
    sectionRef,
    waveProgress,
    getWaveStyles
  };
}

// Hook for staggered animations
export function useStaggeredAnimation(itemCount: number, baseDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of child items
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newSet = new Set(prev);
                newSet.add(i);
                return newSet;
              });
            }, i * baseDelay);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [itemCount, baseDelay]);

  const getItemStyles = (index: number, additionalDelay: number = 0) => {
    const isVisible = visibleItems.has(index);
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${additionalDelay}ms`
    };
  };

  return {
    containerRef,
    visibleItems,
    getItemStyles
  };
}