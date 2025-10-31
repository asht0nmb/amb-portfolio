"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GlassSurface from '@/components/ui/GlassSurface';

const navLinks = [
  { name: 'About', href: '/about-page' },
  { name: 'Workspace', href: '/workspace-page' },
  { name: 'Gallery', href: '/gallery-page' },
];

export default function GlassNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-based opacity changes
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Calculate dynamic opacity based on scroll position
  const getNavOpacity = () => {
    const maxScroll = 200; // Scroll distance for full opacity
    const baseOpacity = 0.8;
    const maxOpacity = 0.95;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    return baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
  };

  // Check if a link is active
  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
        <GlassSurface
          width="100%"
          height={60}
          borderRadius={30}
          className="px-8 max-w-6xl mx-auto fluid-transition"
          backgroundOpacity={scrollY > 50 ? 0.15 : 0.1}
          brightness={95}
          opacity={getNavOpacity()}
          blur={scrollY > 50 ? 16 : 12}
        >
          <div className="flex items-center justify-between w-full gap-8">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center" onClick={closeMenu} scroll={false}>
              <Image
                src="/photos/logos/amb1.png"
                alt="AMB Logo"
                width={40}
                height={40}
                className="rounded-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>

            {/* Center: Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  scroll={false}
                  className={`
                    text-sm font-medium transition-all duration-200
                    hover:-translate-y-0.5 focus:outline-none
                    ${isActiveLink(link.href)
                      ? 'text-blue-600 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                    }
                  `}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Time */}
            <div className="hidden md:flex items-center">
              <span className="text-sm font-medium text-neutral-700">
                {time}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1 glass-focus fluid-transition"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span 
                className={`w-4 h-[1px] bg-neutral-700 transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[5px]" : ""
                }`} 
              />
              <span 
                className={`w-4 h-[1px] bg-neutral-700 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`} 
              />
              <span 
                className={`w-4 h-[1px] bg-neutral-700 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`} 
              />
            </button>
          </div>
        </GlassSurface>
      </nav>

      {/* Mobile Menu Overlay - Enhanced with glass treatment */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center glass-standard backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center gap-8 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              scroll={false}
              onClick={closeMenu}
              className={`
                text-2xl font-medium transition-all duration-200
                hover:-translate-y-1 focus:outline-none
                ${isActiveLink(link.href)
                  ? 'text-blue-600 font-semibold'
                  : 'text-neutral-700 hover:text-neutral-900'
                }
              `}
              aria-current={isActiveLink(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 text-sm font-medium text-neutral-600">
            {time}
          </div>
        </div>
      </div>
    </>
  );
}