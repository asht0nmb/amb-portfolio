import SimpleHero from '@/app/home-page/SimpleHero';
import ProjectCard from '@/app/home-page/DiabetesProjectCard';
import SectionTitle from '@/components/features/SectionTitle';
import NowCard from '@/app/home-page/NowCard';
import PortfolioCard from '@/app/home-page/PortfolioCard';
import SectionReveal from '@/components/animations/SectionReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import WaveTransition from '@/components/animations/WaveTransition';
import ParallaxContainer from '@/components/animations/ParallaxContainer';

export default function Home() {
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
            
            <SectionReveal delay={400}>
              <ProjectCard 
                title="T1D Data Insight Engine"
                description="Offline-first analytics dashboard for Type 1 diabetics, with automatic anomaly flagging, unlogged-meal detection, and daily glycemic-pattern clustering—turning raw CGM and pump data into actionable insights."
                generalTags={["AI", "Health", "Personal"]}
                techTags={["Pandas", "scikit-learn", "React", "TypeScript", "TailwindCSS"]}
                status="in-progress"
                collaborators={1}
                lastUpdated="today"
              />
            </SectionReveal>
          </SectionReveal>

          {/* Wave Transition between Sections */}
          <div className="relative h-12 my-8">
            <WaveTransition 
              intensity={0.15}
              speed={2}
              color="rgba(59, 130, 246, 0.05)"
            />
          </div>

          {/* Portfolio Grid Section */}
          <SectionReveal 
            delay={300}
            threshold={0.15}
            className="pt-8 pb-32 relative z-10"
          >
            <StaggeredReveal 
              staggerDelay={150}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              <ParallaxContainer speed={-0.05}>
                <PortfolioCard 
                  title="Portfolio Website"
                  description="A personal portfolio website built with Next.js, featuring an animated photo carousel and responsive design."
                  generalTags={["Design", "Personal"]}
                  techTags={["Next.js", "TypeScript", "TailwindCSS"]}
                  status="in-progress"
                  collaborators={1}
                  lastUpdated="Today"
                  previewImage="/photos/heroSS.png"
                />
              </ParallaxContainer>
              
              <ParallaxContainer speed={-0.08}>
                <NowCard />
              </ParallaxContainer>
            </StaggeredReveal>
          </SectionReveal>
        </div>
    </div>
  );
}