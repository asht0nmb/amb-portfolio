"use client";

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isOverGallery, setIsOverGallery] = useState(false);
  const [isOverCustom, setIsOverCustom] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hover states
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest interactive parent, including elements inside pointer-events-none containers
      const galleryParent = target.closest('.diagonal-carousel-container');
      const customParent = target.closest('.project-card') || target.closest('a.section-title');
      
      setIsOverGallery(galleryParent !== null);
      setIsOverCustom(customParent !== null);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Base cursor - always visible */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '8px',
          height: '8px',
          backgroundColor: 'black',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: isOverGallery || isOverCustom ? 0 : 1,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}
      />
      
      {/* Gallery cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '97.5px',
          height: '55px',
          backgroundColor: 'black',
          borderRadius: '30px',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.5px',
          willChange: 'transform',
          opacity: isOverGallery ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isOverGallery ? 1 : 0.2})`,
          transformOrigin: '50% 50%',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        }}
      >
        <div style={{
          opacity: isOverGallery ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          transitionDelay: '0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>Gallery</span>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none"
            style={{ marginTop: '-2px' }}
          >
            <path 
              d="M2 12L12 2M12 2V8.5M12 2H5.5" 
              stroke="currentColor" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Custom cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '32px',
          height: '32px',
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          opacity: isOverCustom ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isOverCustom ? 1 : 0.2})`,
          transformOrigin: '50% 50%',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ 
            transform: 'translateX(1px)',
          }}
        >
          <path 
            d="M4 12h12M16 12l-4 -4M16 12l-4 4" 
            stroke="black" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
} 