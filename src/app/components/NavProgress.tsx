'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProgressProps {
  links: Array<{ name: string; href: string; }>;
}

export default function NavProgress({ links }: NavProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 
        ? Math.min((window.scrollY / totalHeight) * 100, 100)
        : 0;
      setScrollProgress(progress);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const isActive = (path: string) => pathname === path;

  const getProgressPath = () => {
    const width = 320;
    const height = 40;
    const radius = 20;

    return `
      M ${radius} 0
      H ${width - radius}
      C ${width - radius} 0, ${width} 0, ${width} ${radius}
      V ${height - radius}
      C ${width} ${height}, ${width - radius} ${height}, ${width - radius} ${height}
      H ${radius}
      C ${radius} ${height}, 0 ${height}, 0 ${height - radius}
      V ${radius}
      C 0 0, ${radius} 0, ${radius} 0
    `;
  };

  if (!isMounted) {
    return (
      <div className="fixed left-1/2 top-4 -translate-x-1/2 z-50 hidden md:block">
        <div className="w-[320px] h-[40px] relative">
          <div className="absolute inset-0 rounded-[20px] backdrop-blur-sm bg-white/5" />
          <div className="absolute inset-0 flex items-center justify-center gap-12">
            {links.map((link) => (
              <span
                key={link.name}
                className="text-neutral-800 cursor-none"
              >
                {link.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-1/2 top-4 -translate-x-1/2 z-50 hidden md:block">
      <div className="w-[320px] h-[40px] relative">
        {/* Background with blur */}
        <div className="absolute inset-0 rounded-[20px] backdrop-blur-sm bg-white/5" />
        
        <svg 
          className="w-full h-full relative"
          viewBox="0 0 320 40"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background track */}
          <path
            d={getProgressPath()}
            className="fill-none stroke-black/20"
            strokeWidth={2}
          />
          {/* Progress indicator */}
          <path
            d={getProgressPath()}
            className="fill-none stroke-black/70 transition-all duration-500"
            strokeWidth={2}
            strokeDasharray={1000}
            strokeDashoffset={1000 - ((scrollProgress / 100) * 1000)}
            strokeLinecap="round"
          />
        </svg>

        {/* Navigation links */}
        <div className="absolute inset-0 flex items-center justify-center gap-12">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-neutral-800 hover:text-black transition-all duration-500 ease-in-out cursor-none transform hover:-translate-y-1 relative z-10 ${
                isActive(link.href) ? 'font-medium' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 