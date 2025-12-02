'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function FloatingNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const footerRef = useRef<HTMLElement | null>(null);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/workspace-page', label: 'Lab' },
    { href: '/gallery-page', label: 'Photos' },
    { href: '/about-page', label: 'About' },
  ];

  useEffect(() => {
    // Find footer element
    footerRef.current = document.querySelector('footer');

    const handleScroll = () => {
      if (!footerRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hide nav when footer is visible (top of footer enters viewport)
      if (footerRect.top < windowHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed bottom-6 left-1/2 -translate-x-1/2 z-50
      transition-all duration-300
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
    `}>
      <div className="bg-[#faf9f6]/70 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  transition-colors whitespace-nowrap
                  ${isActive
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
