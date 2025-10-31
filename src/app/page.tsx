'use client';

import { useState } from 'react';
import SimpleHero from '@/app/home-page/SimpleHero';
import ProjectCard from '@/components/features/ProjectCard';
import ProjectModal from '@/components/features/ProjectModal';
import SectionTitle from '@/components/features/SectionTitle';
import NowCard from '@/app/home-page/NowCard';
import SectionReveal from '@/components/animations/SectionReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import WaveTransition from '@/components/animations/WaveTransition';
import ParallaxContainer from '@/components/animations/ParallaxContainer';
import { projects, Project } from '@/data/projects';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SimpleHero />
        
        {/* Wave Transition between Hero and Content */}
        <div className="relative h-16 -mt-8 z-0">
          <WaveTransition 
            intensity={0.2}
            speed={1.5}
            color="rgba(59, 130, 246, 0.08)"
          />
        </div>

        <div className="w-full max-w-[90vw] xl:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Selected Work Section */}
          <SectionReveal
            delay={200}
            threshold={0.2}
            className="pt-[100px] pb-8 relative z-10"
          >
            <ParallaxContainer speed={-0.1} className="mb-8">
              <SectionTitle title="Selected Work" />
            </ParallaxContainer>

            <div className="space-y-6">
              {projects.filter(p => p.featured).map((project, index) => (
                <SectionReveal key={project.id} delay={400 + (index * 100)}>
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    variant={project.id === 'portfolio-website' ? 'browser-mockup' : 'standard'}
                  />
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>

          {/* Wave Transition between Sections */}
          <div className="relative h-12 my-8">
            <WaveTransition 
              intensity={0.15}
              speed={2}
              color="rgba(59, 130, 246, 0.05)"
            />
          </div>

          {/* Now Card Section */}
          <SectionReveal
            delay={300}
            threshold={0.15}
            className="pt-8 pb-32 relative z-10"
          >
            <StaggeredReveal
              staggerDelay={150}
              className="grid grid-cols-1 gap-6"
            >
              <ParallaxContainer speed={-0.08}>
                <NowCard />
              </ParallaxContainer>
            </StaggeredReveal>
          </SectionReveal>
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
    </div>
  );
}