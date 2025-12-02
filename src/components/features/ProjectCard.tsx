'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/workspace-page/${project.id}`);
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25
  };

  return (
    <motion.article
      onClick={handleClick}
      whileHover={{ y: -4 }}
      transition={springConfig}
      className={`
        bg-white rounded-2xl overflow-hidden cursor-pointer
        shadow-md hover:shadow-xl transition-shadow duration-300
        ${featured ? 'md:col-span-2' : ''}
      `}
    >
      {/* Image Section */}
      <div className={`
        relative w-full overflow-hidden bg-white
        ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}
      `}>
        {project.previewImage ? (
          <Image
            src={project.previewImage}
            alt={project.title}
            fill
            className="object-contain p-8"
            sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
            priority={featured}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className={`
          font-semibold text-gray-900 mb-2
          ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
        `}>
          {project.title}
        </h3>

        <p className="text-sm text-gray-500">
          {project.category} • {project.status === 'in-progress' ? 'In Progress' : 'Shipped'}
        </p>
      </div>
    </motion.article>
  );
}
