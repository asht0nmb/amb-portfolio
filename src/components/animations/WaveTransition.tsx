"use client";

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface WaveTransitionProps {
  className?: string;
  intensity?: number;
  speed?: number;
  color?: string;
}

export default function WaveTransition({ 
  className = '',
  intensity = 0.3,
  speed = 2,
  color = 'rgba(59, 130, 246, 0.1)'
}: WaveTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Intersection observer to start animation when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    // Wave animation
    let time = 0;
    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      
      // Draw wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x <= width; x += 2) {
        const y = height * 0.5 + 
          Math.sin((x * 0.01) + (time * speed * 0.01)) * height * intensity +
          Math.sin((x * 0.02) + (time * speed * 0.015)) * height * intensity * 0.5;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, intensity, speed, color, prefersReducedMotion]);

  // Handle reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-out'
      }}
    />
  );
}