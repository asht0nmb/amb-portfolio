"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassSurface from '@/components/ui/GlassSurface';

const navLinks = [
  { name: 'About', href: '/about-page' },
  { name: 'Workspace', href: '/workspace-page' },
  { name: 'Gallery', href: '/gallery-page' },
];

interface AnimatedGlassNavBarProps {
  show: boolean;
}

export default function AnimatedGlassNavBar({ show }: AnimatedGlassNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
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

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, delay: show ? 0.3 : 0, ease: "easeOut" }}
        className="fixed inset-x-0 top-6 z-50 flex justify-center px-6"
      >
        <GlassSurface
          width="100%"
          height={60}
          borderRadius={30}
          className="px-8 max-w-6xl mx-auto"
          backgroundOpacity={0.1}
          brightness={95}
          opacity={0.8}
        >
          <div className="flex items-center justify-between w-full gap-8">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center" onClick={closeMenu}>
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
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
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
              className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1"
              aria-label={isOpen ? "Close menu" : "Open menu"}
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
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-2xl font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
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