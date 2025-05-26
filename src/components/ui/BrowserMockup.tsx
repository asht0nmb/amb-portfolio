// src/components/BrowserMockup.tsx
"use client";

import Image from 'next/image';

interface BrowserMockupProps {
  imageUrl: string;
  alt?: string;
}

export default function BrowserMockup({ imageUrl, alt = "Browser screenshot" }: BrowserMockupProps) {
  return (
    <div 
      className="relative w-full h-full"
      style={{ 
        transform: 'rotate(2deg)',
        transformOrigin: 'center center',
      }}
    >
      {/* Browser Window */}
      <div className="relative w-full h-full rounded-xl bg-white shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="relative h-8 bg-neutral-100 border-b border-neutral-200 flex items-center px-3">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          
          {/* URL Bar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-neutral-200/80 rounded-md px-2 py-1 text-xs text-neutral-600 font-mono
            min-w-[120px] sm:min-w-[160px]">
            ashtonmb.me
          </div>
        </div>

        {/* Browser Content */}
        <div className="relative w-full h-[calc(100%-2rem)]">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
          />
        </div>
      </div>

      {/* Shadow Effect */}
      <div 
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[98%] h-[15px] blur-xl opacity-20 bg-black rounded-full"
        style={{ transform: 'rotateX(45deg)' }}
      />
    </div>
  );
}
