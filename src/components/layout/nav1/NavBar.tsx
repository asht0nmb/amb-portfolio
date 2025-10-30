"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavProgress from '@/components/layout/nav1/NavProgress';
import WeatherWidget from '@/components/ui/WeatherWidget';

const navLinks = [
  { name: 'About', href: '/about-page' },
  { name: 'Workspace', href: '/workspace-page' },
  { name: 'Gallery', href: '/gallery-page' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 h-16 flex items-center justify-between px-6 z-50">
        {/* Left: Logo Section */}
        <div className={`w-32 flex items-center transition-all duration-700 ease-in-out transform ${
          isScrolled ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          <Link href="/" className="relative flex items-center" onClick={closeMenu}>
            <Image
              src="/photos/logos/amb1.png"
              alt="AMB Logo"
              width={82}
              height={82}
              className="rounded-lg"
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
        </div>

        {/* Center: Navigation Progress - Desktop */}
        <NavProgress links={navLinks} />

        {/* Center: Mobile Menu Button */}
        <div className="md:hidden flex justify-center items-center">
          <button
            onClick={toggleMenu}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}

          >
            <span 
              className={`w-5 h-[1px] bg-current opacity-80 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`} 
            />
            <span 
              className={`w-5 h-[1px] bg-current opacity-80 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`} 
            />
            <span 
              className={`w-5 h-[1px] bg-current opacity-80 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`} 
            />
          </button>
        </div>

        {/* Right: Time and Weather Widget */}
        <div className={`w-32 flex justify-end items-center gap-4 transition-all duration-700 ease-in-out transform ${
          isScrolled ? 'opacity-0 translate-y-[-2rem]' : 'opacity-100 translate-y-0'
        }`}>
          <WeatherWidget />
          <div className="text-sm font-medium text-neutral-800">
            {time}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-1 z-40 flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="inline-flex flex-col items-start">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-3xl text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-out"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
