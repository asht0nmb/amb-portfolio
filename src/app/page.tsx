'use client';

import SimpleHero from '@/app/home-page/SimpleHero';
import ProjectCard from '@/components/features/ProjectCard';
import { projects } from '@/data/projects';

export default function Home() {
  // Get featured projects - first one with size='large' is the featured project
  const featuredProject = projects.find(p => p.featured && p.size === 'large');
  const otherProjects = projects.filter(p => p.featured && p.id !== featuredProject?.id);

  return (
    <main className="bg-[#faf9f6] pt-16">
      {/* Hero Section */}
      <SimpleHero />

      {/* Work Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-black text-center mb-12">
            Selected Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Featured project - full width */}
            {featuredProject && (
              <ProjectCard
                project={featuredProject}
                featured={true}
              />
            )}

            {/* Other projects - 2 columns */}
            {otherProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
