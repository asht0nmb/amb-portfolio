"use client";

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Photography', href: '/photography' },
  { name: 'About', href: '/about' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 h-16 flex items-center justify-between px-6 backdrop-blur-sm bg-white/5 z-50">
        {/* Left: Logo Section */}
        <div className="w-32 flex items-center">
          <Link href="/" className="relative flex items-center" onClick={closeMenu}>
            <div className="w-8 h-8 bg-gray-200/20 rounded-lg flex items-center justify-center">
              {/* Placeholder for logo - replace with Image component when ready */}
              <span className="text-sm font-medium">amb</span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links - Desktop */}
        <div className="hidden md:flex justify-center items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-base font-medium tracking-wide py-1"
              style={{ cursor: 'none' }}
            >
              <span className="relative">
                {link.name}
                <span className="absolute left-0 top-full mt-0.5 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </Link>
          ))}
        </div>

        {/* Center: Mobile Menu Button */}
        <div className="md:hidden flex justify-center items-center">
          <button
            onClick={toggleMenu}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{ cursor: 'none' }}
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

        {/* Right: Widget Area */}
        <div className="w-32 flex justify-end">
          <div className="px-3 py-1.5 rounded-md bg-gray-200/20 text-sm">
            {/* Placeholder for weather/time widget */}
            <span className="text-sm">Widget</span>
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
              className="text-3xl font-medium tracking-wide py-3 transition-colors hover:text-blue-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
