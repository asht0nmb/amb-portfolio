"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  generalTags: string[];
  techTags: string[];
  status: 'in-progress' | 'shipped';
  collaborators: number;
  lastUpdated: string;
  previewImage?: string;
}

export default function ProjectCard({
  title = "T1D Data Insight Engine",
  description = `Offline-first analytics dashboard for Type 1 diabetics, with automatic anomaly flagging, unlogged-meal detection, and daily glycemic-pattern clustering—turning raw CGM and pump data into actionable insights.`,
  generalTags = ["AI", "Health", "Personal"],
  techTags = ["Pandas", "scikit-learn", "React", "TypeScript", "TailwindCSS"],
  status = "in-progress",
  // collaborators = 1,
  lastUpdated = "today",
  previewImage
}: ProjectCardProps) {
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
        w-full max-w-[85vw] mx-auto transition-all duration-500 ease-out
        hover:shadow-xl hover:-translate-y-1"
      style={{ cursor: 'none' }}
      onMouseEnter={() => console.log('Project card hover enter')}
      onMouseLeave={() => console.log('Project card hover leave')}
    >
      <div className="flex gap-12 items-center">
        {/* Left: Content */}
        <div className="flex-1 min-w-0">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
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
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-3 tracking-tight">{title}</h2>
            <p className="text-black/60 text-lg">{description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* General tags - light blue */}
            {generalTags.map((tag: string, index: number) => (
              <span 
                key={`general-${index}`}
                className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
            {/* Tech tags - grey */}
            {techTags.map((tag: string, index: number) => (
              <span 
                key={`tech-${index}`}
                className="bg-black/5 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div 
                  className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm border-2 border-white"
                />
              </div>
              <span className="text-sm text-black/60">Solo Project</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-sm text-black/60">Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="relative w-[400px] h-[280px] bg-black/5 backdrop-blur-sm rounded-2xl overflow-hidden
          transition-all duration-500 ease-out group-hover:bg-black/10">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`Preview of ${title}`}
              fill
              className="object-cover"
              sizes="400px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
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