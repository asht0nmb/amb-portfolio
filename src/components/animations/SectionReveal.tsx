"use client";

import { ReactNode } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  enableParallax?: boolean;
  parallaxSpeed?: number;
  threshold?: number;
}

export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  enableParallax = false,
  parallaxSpeed = 0.1,
  threshold = 0.1
}: SectionRevealProps) {
  const { elementRef, getRevealStyles, getParallaxTransform } = useScrollAnimations({
    threshold,
    enableParallax,
    parallaxSpeed
  });

  const revealStyles = getRevealStyles(delay);
  const parallaxStyles = enableParallax ? getParallaxTransform(parallaxSpeed) : {};

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        ...revealStyles,
        ...parallaxStyles
      }}
    >
      {children}
    </div>
  );
}