"use client";

import { useEffect, useRef, useState } from 'react';

interface DiagonalCarouselProps {
  images?: string[];
  angle?: number;
  width?: string;
  height?: string;
  itemWidth?: string;
  itemHeight?: string;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DiagonalCarousel: React.FC<DiagonalCarouselProps> = ({
    images = [
      '/photos/teton1.jpg',
      '/photos/pspring1.jpg',
      '/photos/wfall1.jpg',
      '/photos/rocks1.jpg',
      '/photos/wave1.jpg',
      '/photos/peak1.jpg',
    ],
    angle = 7,
    itemWidth = '350px',
    itemHeight = '275px',
    borderRadius = '12px',
    onClick = () => {},
  }) => {
    const rotation = -angle;
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const animationRef = useRef<number>(0);
    const offsetRef = useRef<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [imageSetWidth, setImageSetWidth] = useState<number>(0);

    // Track window width for full-width calculations
    useEffect(() => {
      const updateWidth = () => {
        setWindowWidth(window.innerWidth);
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Calculate width of one set of images
    useEffect(() => {
      if (carouselRef.current) {
        // Get width of one complete set of images (including gaps)
        const oneSetWidth = images.length * (parseInt(itemWidth) + 20 + 20); // width + gap + margins
        setImageSetWidth(oneSetWidth);
      }
    }, [images.length, itemWidth]);

    // Handle animation
    useEffect(() => {
      let lastTime = performance.now();
      const baseSpeed = 0.05;
      const resetThreshold = -windowWidth * 1.5; // Reset point well beyond visible area
      
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Slow down to 25% speed on hover
        const speed = isHovered ? baseSpeed * 0.35 : baseSpeed;
        offsetRef.current -= speed * deltaTime;

        // Reset when we're far enough along that the reset won't be visible
        if (offsetRef.current <= resetThreshold) {
          // Jump back by one screen width to maintain continuity
          offsetRef.current += windowWidth;
        }
        
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [isHovered, windowWidth]); // Keep dependencies minimal and stable

    // Create enough copies to fill several screen widths for smooth transition
    const loopImages = Array(8).fill(images).flat();

    return (
      <div
        style={{
          position: 'absolute',
          top: '520px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: itemHeight,
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <div 
          ref={containerRef}
          className="diagonal-carousel-container"
          style={{
            position: 'absolute',
            top: 0,
            left: '-30vw',
            width: '160vw',
            height: itemHeight,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            overflow: 'visible',
            pointerEvents: 'auto',
            cursor: 'none',
            zIndex: 5,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="diagonal-carousel-wrapper"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              overflow: 'visible',
              height: '100%',
              width: '100%',
              pointerEvents: 'auto',
            }}
          >
            <div 
              ref={carouselRef}
              className="diagonal-carousel"
              style={{
                display: 'flex',
                gap: '20px',
                transform: 'translateX(0)',
                willChange: 'transform',
                width: 'max-content',
                transition: 'transform 0.3s ease-out',
                pointerEvents: 'auto',
              }}
            >
              {loopImages.map((src, idx) => (
                <button
                  key={`${idx}-${src}`}
                  className="diagonal-carousel-item"
                  onClick={onClick}
                  style={{
                    width: itemWidth,
                    height: itemHeight,
                    borderRadius,
                    margin: '10px',
                    transform: `rotateY(${rotation * 0.5}deg)`,
                    transformStyle: 'preserve-3d',
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                  }}
                >
                  <img
                    src={src}
                    alt={`carousel-item-${idx}`}
                    className="diagonal-carousel-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.1)',
                      transformOrigin: 'center center',
                      pointerEvents: 'none',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default DiagonalCarousel;