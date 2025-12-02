'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from '@/components/ui/GlassSurface';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-lg z-[200]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-5xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassSurface
                variant="standard"
                hover={false}
                className="relative w-full"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white
                    transition-all duration-200 flex items-center justify-center
                    hover:scale-110 group shadow-lg"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 group-hover:text-gray-900 transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="p-6 md:p-10 space-y-8">
                  {/* Hero Image */}
                  {project.previewImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={project.previewImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        priority
                      />
                    </motion.div>
                  )}

                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          project.status === 'in-progress'
                            ? 'bg-yellow-400 animate-pulse'
                            : 'bg-green-400'
                        }`}
                      />
                      <span className="text-sm font-medium text-black/70">
                        {project.status === 'in-progress' ? 'In Progress' : 'Shipped'}
                      </span>
                      <span className="text-sm text-black/40">•</span>
                      <span className="text-sm text-black/60">
                        Updated {project.lastUpdated}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.generalTags.map((tag, index) => (
                      <span
                        key={`general-${index}`}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.techTags.map((tag, index) => (
                      <span
                        key={`tech-${index}`}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-semibold">Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-black/70"
                          >
                            <svg
                              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Additional Images */}
                  {project.images && project.images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-semibold">Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden bg-gray-100"
                          >
                            <Image
                              src={image}
                              alt={`${project.title} screenshot ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Links */}
                  {project.links && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="flex flex-wrap gap-4 pt-4"
                    >
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium
                            hover:bg-blue-700 transition-all duration-200
                            hover:scale-105 hover:shadow-lg"
                        >
                          View Live Demo →
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium
                            hover:bg-gray-800 transition-all duration-200
                            hover:scale-105 hover:shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            />
                          </svg>
                          View on GitHub
                        </a>
                      )}
                      {project.links.caseStudy && (
                        <a
                          href={project.links.caseStudy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-white/80 text-gray-900 rounded-full font-medium
                            hover:bg-white transition-all duration-200
                            hover:scale-105 hover:shadow-lg border border-gray-200"
                        >
                          Read Case Study →
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </GlassSurface>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
