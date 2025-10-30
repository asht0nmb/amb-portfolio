'use client';

import { useEffect, useState, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  isVisible: boolean;
  isOverGlass: boolean;
  isOverInteractive: boolean;
  glassIntensity: number;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isOverGlass: false,
    isOverInteractive: false,
    glassIntensity: 0,
  });

  // Advanced glass detection algorithm
  const detectGlassElement = useCallback((element: Element): { isGlass: boolean; intensity: number } => {
    let current = element;
    let maxIntensity = 0;
    let isGlass = false;

    // Traverse up the DOM tree to detect glass properties
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      
      // Method 1: Check for backdrop-filter CSS property
      const backdropFilter = styles.backdropFilter || (styles as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter;
      if (backdropFilter && backdropFilter !== 'none') {
        isGlass = true;
        // Extract blur value and convert to intensity (0-1)
        const blurMatch = backdropFilter.match(/blur\((\d+(?:\.\d+)?)px\)/);
        if (blurMatch) {
          const blurValue = parseFloat(blurMatch[1]);
          const intensity = Math.min(blurValue / 20, 1); // Normalize to 0-1 scale
          maxIntensity = Math.max(maxIntensity, intensity);
        }
      }

      // Method 2: Check for glass-related CSS classes
      if (current.className && typeof current.className === 'string') {
        const classNames = current.className.toLowerCase();
        
        // Glass component classes
        if (classNames.includes('glass') || 
            classNames.includes('backdrop-blur') ||
            classNames.includes('glasssurface') ||
            classNames.includes('fluidglasscard')) {
          isGlass = true;
          
          // Determine intensity based on class variants
          if (classNames.includes('subtle')) {
            maxIntensity = Math.max(maxIntensity, 0.3);
          } else if (classNames.includes('prominent')) {
            maxIntensity = Math.max(maxIntensity, 0.9);
          } else {
            maxIntensity = Math.max(maxIntensity, 0.6); // standard
          }
        }
      }

      // Method 3: Check for data attributes indicating glass elements
      if (current.hasAttribute('data-glass') || 
          current.hasAttribute('data-glass-surface') ||
          current.hasAttribute('data-backdrop-blur')) {
        isGlass = true;
        const intensityAttr = current.getAttribute('data-glass-intensity');
        if (intensityAttr) {
          const intensity = parseFloat(intensityAttr);
          if (!isNaN(intensity)) {
            maxIntensity = Math.max(maxIntensity, Math.min(intensity, 1));
          }
        } else {
          maxIntensity = Math.max(maxIntensity, 0.7);
        }
      }

      // Method 4: Check for CSS custom properties
      const glassOpacity = styles.getPropertyValue('--glass-opacity');
      if (glassOpacity) {
        isGlass = true;
        const opacity = parseFloat(glassOpacity);
        if (!isNaN(opacity)) {
          maxIntensity = Math.max(maxIntensity, opacity * 5); // Convert opacity to intensity
        }
      }

      current = current.parentElement as Element;
    }

    return { isGlass, intensity: maxIntensity };
  }, []);

  // Interactive element detection
  const detectInteractiveElement = useCallback((element: Element): boolean => {
    const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
    const interactiveRoles = ['button', 'link', 'tab', 'menuitem', 'option'];
    
    // Check tag names
    if (interactiveTags.includes(element.tagName)) return true;
    
    // Check ARIA roles
    const role = element.getAttribute('role');
    if (role && interactiveRoles.includes(role)) return true;
    
    // Check for event handlers
    if (element.getAttribute('onclick') || 
        element.getAttribute('onmousedown') ||
        element.getAttribute('onkeydown')) return true;
    
    // Check CSS cursor property
    const styles = window.getComputedStyle(element);
    if (styles.cursor === 'pointer') return true;
    
    // Check for common interactive class patterns
    const className = element.className;
    if (typeof className === 'string') {
      const classNames = className.toLowerCase();
      if (classNames.includes('clickable') || 
          classNames.includes('interactive') ||
          classNames.includes('hover:') ||
          classNames.includes('cursor-pointer') ||
          classNames.includes('project-card') ||
          classNames.includes('nav-link')) return true;
    }

    // Check for data attributes indicating interactivity
    if (element.hasAttribute('data-clickable') ||
        element.hasAttribute('data-interactive') ||
        element.hasAttribute('tabindex')) return true;

    return false;
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target) return;

      const { isGlass, intensity } = detectGlassElement(target);
      const isInteractive = detectInteractiveElement(target);

      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isOverGlass: isGlass,
        isOverInteractive: isInteractive,
        glassIntensity: intensity,
      }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ 
        ...prev, 
        isVisible: false,
        isOverGlass: false,
        isOverInteractive: false,
        glassIntensity: 0,
      }));
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [detectGlassElement, detectInteractiveElement]);

  const getCursorClasses = () => {
    const baseClasses = [
      'fixed top-0 left-0 pointer-events-none z-50',
      'water-surface-tension', // Use water-inspired easing
    ];

    if (!cursorState.isVisible) {
      return [...baseClasses, 'opacity-0'].join(' ');
    }

    // Glass-aware styling with intensity-based variations
    if (cursorState.isOverGlass) {
      const size = cursorState.isOverInteractive ? 'w-8 h-8' : 'w-6 h-6';
      const intensity = cursorState.glassIntensity;
      
      let glassEffect;
      if (intensity > 0.7) {
        glassEffect = 'bg-white/25 backdrop-blur-md border-2 border-white/40';
      } else if (intensity > 0.4) {
        glassEffect = 'bg-white/20 backdrop-blur-sm border border-white/30';
      } else {
        glassEffect = 'bg-white/15 backdrop-blur-sm border border-white/20';
      }
      
      return [
        ...baseClasses,
        size,
        'rounded-full',
        glassEffect,
        'shadow-lg',
        'opacity-100',
      ].join(' ');
    }

    // Interactive element styling
    if (cursorState.isOverInteractive) {
      return [
        ...baseClasses,
        'w-6 h-6',
        'bg-blue-500/40',
        'rounded-full',
        'border-2 border-blue-500/60',
        'shadow-md',
        'scale-110',
        'opacity-100',
      ].join(' ');
    }

    // Default styling
    return [
      ...baseClasses,
      'w-4 h-4',
      'bg-blue-500/30',
      'rounded-full',
      'opacity-100',
    ].join(' ');
  };

  const getTransform = () => {
    const offsetX = cursorState.isOverGlass ? (cursorState.isOverInteractive ? -16 : -12) : 
                   cursorState.isOverInteractive ? -12 : -8;
    const offsetY = cursorState.isOverGlass ? (cursorState.isOverInteractive ? -16 : -12) : 
                   cursorState.isOverInteractive ? -12 : -8;
    
    return `translate(${cursorState.x + offsetX}px, ${cursorState.y + offsetY}px)`;
  };

  return (
    <div
      className={getCursorClasses()}
      style={{
        transform: getTransform(),
      }}
    />
  );
}