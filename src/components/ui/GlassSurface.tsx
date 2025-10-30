'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  // New API (task requirements)
  variant?: 'subtle' | 'standard' | 'prominent';
  hover?: boolean;
  focus?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  
  // Legacy API (backward compatibility)
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  opacity?: number;
  blur?: number;
  backgroundOpacity?: number;
  brightness?: number;
  
  children: React.ReactNode;
}

const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ 
    // New API props
    variant = 'standard', 
    hover = true, 
    focus = true, 
    as: Component = 'div',
    
    // Legacy API props
    width,
    height,
    borderRadius,
    opacity,
    blur,
    backgroundOpacity,
    brightness,
    
    children, 
    className, 
    style,
    ...props 
  }, ref) => {
    // Check if using legacy API
    const isLegacyAPI = width !== undefined || height !== undefined || borderRadius !== undefined || 
                       opacity !== undefined || blur !== undefined || backgroundOpacity !== undefined;

    if (isLegacyAPI) {
      // Legacy implementation for backward compatibility
      const legacyStyle: React.CSSProperties = {
        width: width || 'auto',
        height: height || 'auto',
        borderRadius: borderRadius ? `${borderRadius}px` : '16px',
        background: `rgba(255, 255, 255, ${backgroundOpacity || 0.1})`,
        backdropFilter: `blur(${blur || 12}px)`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
        opacity: opacity || 1,
        filter: brightness ? `brightness(${brightness}%)` : undefined,
        ...style,
      };

      return React.createElement(
        Component,
        {
          ref,
          className: cn('relative transition-all duration-300 ease-out', className),
          style: legacyStyle,
          ...props,
        },
        children
      );
    }

    // New API implementation
    const baseClasses = [
      // Base glass styling
      'relative',
      'rounded-2xl',
      'border',
      'transition-all',
      'duration-300',
      'ease-out',
      
      // Fallback for browsers without backdrop-filter support
      'bg-white/10',
      
      // Glass effect (will override fallback if supported)
      'supports-[backdrop-filter]:bg-white/[var(--glass-opacity)]',
      'supports-[backdrop-filter]:backdrop-blur-[var(--glass-blur)]',
      'supports-[backdrop-filter]:border-white/20',
      
      // Shadow
      'shadow-[0_8px_32px_rgba(31,38,135,0.2)]',
    ];

    const variantClasses = {
      subtle: [
        '[--glass-opacity:0.05]',
        '[--glass-blur:8px]',
        'border-white/10',
      ],
      standard: [
        '[--glass-opacity:0.1]',
        '[--glass-blur:12px]',
        'border-white/20',
      ],
      prominent: [
        '[--glass-opacity:0.15]',
        '[--glass-blur:16px]',
        'border-white/30',
      ],
    };

    const hoverClasses = hover ? [
      'hover:supports-[backdrop-filter]:bg-white/[calc(var(--glass-opacity)+0.05)]',
      'hover:-translate-y-0.5',
      'hover:shadow-[0_12px_40px_rgba(31,38,135,0.25)]',
    ] : [];

    const focusClasses = focus ? [
      'focus-within:outline-none',
      'focus-within:ring-2',
      'focus-within:ring-blue-500',
      'focus-within:ring-offset-2',
      'focus-within:ring-offset-transparent',
    ] : [];

    // Reduce motion for accessibility
    const reducedMotionClasses = [
      'motion-reduce:transition-none',
      'motion-reduce:hover:transform-none',
    ];

    const allClasses = cn(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      focusClasses,
      reducedMotionClasses,
      className
    );

    return React.createElement(
      Component,
      {
        ref,
        className: allClasses,
        style,
        ...props,
      },
      children
    );
  }
);

GlassSurface.displayName = 'GlassSurface';

export default GlassSurface;