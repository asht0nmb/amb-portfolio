'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import GlassSurface from '@/components/ui/GlassSurface';
import BrowserMockup from '@/components/ui/BrowserMockup';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  variant?: 'standard' | 'browser-mockup';
}

export default function ProjectCard({
  project,
  onClick,
  variant = 'standard'
}: ProjectCardProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  // Blink effect for status indicator
  useEffect(() => {
    if (project.status !== 'in-progress') return;

    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, [project.status]);

  return (
    <GlassSurface
      onClick={onClick}
      variant="standard"
      hover={true}
      focus={true}
      className="project-card w-full cursor-pointer group"
    >
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 lg:items-center p-4 sm:p-6 lg:p-8">
        {/* Left: Content */}
        <div className="flex-1 min-w-0 lg:max-w-[60%]">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6
            transition-colors duration-300 ease-out group-hover:bg-white/90 shadow-sm">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300
                ${project.status === 'in-progress' ?
                  (isBlinking ? 'bg-yellow-400' : 'bg-yellow-200') :
                  'bg-green-400'
                }`}
            />
            <span className="text-sm font-medium text-black/70">
              {project.status === 'in-progress' ? 'In Progress' : 'Shipped'}
            </span>
          </div>

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 tracking-tight">
              {project.title}
            </h2>
            <p className="text-black/60 text-base sm:text-lg">
              {project.shortDescription}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {/* General tags - light blue */}
            {project.generalTags.map((tag, index) => (
              <span
                key={`general-${index}`}
                className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-300 ease-out group-hover:bg-blue-100"
              >
                {tag}
              </span>
            ))}
            {/* Tech tags - grey */}
            {project.techTags.map((tag, index) => (
              <span
                key={`tech-${index}`}
                className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-300 ease-out group-hover:bg-gray-200"
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
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gray-200 border-2 border-white
                    transition-colors duration-300 ease-out group-hover:bg-gray-300"
                />
              </div>
              <span className="text-sm text-black/60">
                {project.collaborators === 1 ? 'Solo Project' : `${project.collaborators} Collaborators`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-sm text-black/60">Updated {project.lastUpdated}</span>
            </div>
          </div>

          {/* Quick Actions - shown on hover */}
          <div className="flex items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm text-black/60 font-medium">Click to view details →</span>
          </div>
        </div>

        {/* Right: Preview */}
        <div className={`relative w-full overflow-visible transition-all duration-500 ease-out lg:min-w-[280px]
          ${variant === 'browser-mockup'
            ? 'lg:w-[360px] h-[200px] sm:h-[220px] lg:h-[260px] pt-2'
            : 'lg:w-[400px] h-[180px] sm:h-[200px] lg:h-[280px]'
          }`}
        >
          {project.previewImage ? (
            variant === 'browser-mockup' ? (
              <BrowserMockup
                imageUrl={project.previewImage}
                alt={`Preview of ${project.title}`}
              />
            ) : (
              <div className="relative w-full h-full bg-gray-50 rounded-2xl overflow-hidden
                transition-all duration-300 ease-out group-hover:bg-gray-100 shadow-sm
                group-hover:shadow-md group-hover:scale-[1.02]">
                <Image
                  src={project.previewImage}
                  alt={`Preview of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            )
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl
              transition-colors duration-300 ease-out group-hover:bg-gray-100 shadow-sm">
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
                  className="transition-transform duration-300 ease-out group-hover:scale-110"
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
    </GlassSurface>
  );
}
