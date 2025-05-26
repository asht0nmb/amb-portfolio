"use client";

import Link from 'next/link';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="w-full max-w-[85vw] mx-auto mb-12">
      <Link 
        href="/workspace" 
        className="section-title inline-flex items-center gap-3"
        style={{ cursor: 'none' }}
      >
        <h2 className="text-sm uppercase tracking-widest text-gray-400/80">
          {title}
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            className="ml-3 translate-y-[1px] inline-block"
          >
            <path 
              d="M3 11L11 3M11 3V8M11 3H6" 
              stroke="currentColor" 
              strokeWidth="1.25" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </h2>
      </Link>
    </div>
  );
} 