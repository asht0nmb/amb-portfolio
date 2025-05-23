import Hero from '@/app/home-page/Hero';
import PhotoStrip from '@/app/home-page/PhotoStrip';
import ProjectCard from '@/app/home-page/DiabetesProjectCard';
import SectionTitle from '@/components/features/SectionTitle';
import NowCard from '@/app/home-page/NowCard';
import PortfolioCard from '@/app/home-page/PortfolioCard';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="flex flex-col">
        <div className='pt-18'>
          <Hero />
          <div className='pt-10'>
          </div>
        </div>
        <div className="relative">
          <PhotoStrip />
          <div className='pt-14'>
          </div>
        </div>
        <div className="w-full max-w-[90vw] xl:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
          <section className="pt-[200px] sm:pt-[250px] md:pt-[300px] pb-8 relative z-10 pointer-events-none">
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
                description="A personal portfolio website built with Next.js, featuring a custom cursor, animated photo carousel, and responsive design."
                generalTags={["Design", "Personal"]}
                techTags={["Next.js", "TypeScript", "TailwindCSS"]}
                status="in-progress"
                collaborators={1}
                lastUpdated="today"
                previewImage="/photos/heroSS.png"
              />
              <NowCard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}