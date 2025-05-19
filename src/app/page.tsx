import Hero from './components/Hero';
import PhotoStrip from './components/PhotoStrip';
import ProjectCard from './components/ProjectCard';
import SectionTitle from './components/SectionTitle';
import NowCard from './components/NowCard';
import PortfolioCard from './components/PortfolioCard';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Hero />
      <PhotoStrip />
      <div className="w-full max-w-[90vw] xl:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-[300px] pb-8 relative z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <SectionTitle title="Selected Work" />
            <ProjectCard 
              title="T1D Data Insight Engine"
              description="Offline-first analytics dashboard for Type 1 diabetics, with automatic anomaly flagging, unlogged-meal detection, and daily glycemic-pattern clustering—turning raw CGM and pump data into actionable insights."
              generalTags={["AI", "Health", "Personal"]}
              techTags={["Pandas", "scikit-learn", "React", "TypeScript", "TailwindCSS"]}
              status="in-progress"
              collaborators={1}
              lastUpdated="today"
            />
          </div>
        </section>
        <section className="pt-8 pb-32 relative z-10 pointer-events-none">
          <div className="pointer-events-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
            <PortfolioCard 
              title="Portfolio Website"
              generalTags={["Design", "Personal"]}
              techTags={["Next.js", "TypeScript", "TailwindCSS"]}
              status="in-progress"
              collaborators={1}
              lastUpdated="today"
            />
            <NowCard />
          </div>
        </section>
      </div>
    </main>
  );
}