"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Blink effect for status indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    router.push('/workspace');
  };

  return (
    <div 
      onClick={handleClick}
      className="project-card relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-10 shadow-sm 
        w-full transition-all duration-500 ease-out
        hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      style={{ cursor: 'none' }}
    >
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-12 lg:items-center">
        {/* Left: Content */}
        <div className="flex-1 min-w-0 lg:max-w-[60%]">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6
            transition-colors duration-500 ease-out group-hover:bg-black/10">
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
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 tracking-tight">{title}</h2>
            <p className="text-black/60 text-base sm:text-lg">{description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {/* General tags - light blue */}
            {generalTags.map((tag: string, index: number) => (
              <span 
                key={`general-${index}`}
                className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
            {/* Tech tags - grey */}
            {techTags.map((tag: string, index: number) => (
              <span 
                key={`tech-${index}`}
                className="bg-black/5 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex -space-x-2">
                <div 
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/10 backdrop-blur-sm border-2 border-white"
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
        <div className="relative w-full lg:w-[400px] h-[180px] sm:h-[200px] lg:h-[280px] bg-black/5 backdrop-blur-sm rounded-2xl overflow-hidden
          transition-all duration-500 ease-out group-hover:bg-black/10">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`Preview of ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-black/40 text-base sm:text-lg flex flex-col items-center gap-4">
                <svg 
                  width="28"
                  height="28"
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