"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PortfolioCardProps {
  title?: string;
  description?: string;
  generalTags?: string[];
  techTags?: string[];
  status?: 'in-progress' | 'shipped';
  collaborators?: number;
  lastUpdated?: string;
  previewImage?: string;
}

export default function PortfolioCard({
  title = "Portfolio Site",
  description = "",
  generalTags = ["Design", "Personal"],
  techTags = ["Next.js", "TypeScript", "TailwindCSS"],
  status = "in-progress",
  collaborators = 1,
  lastUpdated = "today",
  previewImage
}: PortfolioCardProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  // Blink effect for status indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="project-card relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-sm 
        w-full transition-all duration-500 ease-out 
        hover:shadow-xl hover:-translate-y-1 hover:bg-white/90
        group"
      style={{ cursor: 'none' }}
    >
      <div className="flex gap-12 items-center">
        {/* Left: Content */}
        <div className="flex-1 min-w-0">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6
            transition-all duration-500 ease-out group-hover:bg-black/10">
            <div 
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-500
                ${status === 'in-progress' ? 
                  (isBlinking ? 'bg-yellow-400' : 'bg-yellow-200') : 
                  'bg-green-400'
                }`}
            />
            <span className="text-sm font-medium text-black/70">
              {status === 'in-progress' ? 'In Progress' : 'Shipped'}
            </span>
          </div>

          {/* Header */}
          <div className="mb-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
            <h2 className="text-3xl font-semibold mb-3 tracking-tight">{title}</h2>
            <p className="text-black/60 text-lg">
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
            {/* General tags - light blue */}
            {generalTags.map((tag, index) => (
              <span 
                key={`general-${index}`}
                className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-500 ease-out group-hover:bg-blue-100"
              >
                {tag}
              </span>
            ))}
            {/* Tech tags - grey */}
            {techTags.map((tag, index) => (
              <span 
                key={`tech-${index}`}
                className="bg-black/5 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-500 ease-out group-hover:bg-black/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div 
                  className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm border-2 border-white
                    transition-colors duration-500 ease-out group-hover:bg-black/15"
                />
              </div>
              <span className="text-sm text-black/60">
                {collaborators === 1 ? 'Solo Project' : `${collaborators} Collaborators`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-sm text-black/60">Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="relative w-[300px] h-[280px] bg-black/5 backdrop-blur-sm rounded-2xl overflow-hidden
          transition-all duration-500 ease-out group-hover:bg-black/10">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`Preview of ${title}`}
              fill
              className="object-cover"
              sizes="300px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center
              transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <div className="text-black/40 text-lg flex flex-col items-center gap-4">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-out group-hover:scale-110"
                >
                  <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"/>
                  <path d="M8 12L16 12M16 12L12 8M16 12L12 16"/>
                </svg>
                <span>Preview Coming Soon</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 