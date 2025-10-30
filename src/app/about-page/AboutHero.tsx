"use client";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import GlassSurface from '@/components/ui/GlassSurface';

const MapTile = dynamic(
  () => import('@/components/features/MapTile'), 
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-gray-100 rounded-3xl flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }
);

export default function AboutHero() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 text-left mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-h1 text-gray-900 font-bold mb-4">Ashton Meyer-Bibbins</h1>
            <p className="text-body-large text-gray-600">
              Designer & Developer focused on creating meaningful digital experiences
            </p>
          </div>

          <GlassSurface variant="subtle" className="card-padding">
            <div className="space-y-4">
              <h2 className="text-h4 text-gray-900 font-semibold uppercase tracking-wide">Background</h2>
              <p className="text-body text-gray-700 leading-relaxed">
                I grew up in Port Townsend, WA and didn't know what UI meant until 2024. 
                I've learned a lot since then, and intend to continue. My favorite ways to 
                learn are traveling, reading, and trying.
              </p>
            </div>
          </GlassSurface>

          <GlassSurface variant="subtle" className="card-padding">
            <div className="space-y-4">
              <h2 className="text-h4 text-gray-900 font-semibold uppercase tracking-wide">Now</h2>
              <p className="text-body text-gray-700 leading-relaxed">
                Currently, I'm focused on learning as much as possible, particularly from my 
                mentors @ JulyAI, and a long list of book recommendations. My aim is to collect 
                experiences in the pursuit of making my next product or project better than the last.
              </p>
            </div>
          </GlassSurface>
        </div>

        <div className="flex flex-col items-center flex-shrink-0 w-64 md:w-80">
          <div className="w-64 h-64 md:w-80 md:h-80 relative mb-4">
            <Image
              src="/photos/mountain_headshot.png"
              alt="Profile picture of Ashton Meyer-Bibbins on Mt. Lawrence Grassi"
              fill
              className="object-cover rounded-2xl shadow-lg border-2 border-white"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
          <div className="text-body-small text-gray-500 text-center px-2 mb-6">
            Mt. Lawrence Grassi | 8,809' | 03/26/25
          </div>

          <GlassSurface variant="subtle" className="w-full card-padding">
            <div className="space-y-4">
              <h3 className="text-h4 text-gray-900 font-semibold uppercase tracking-wide">Location</h3>
              <div className="rounded-2xl overflow-hidden">
                <MapTile className="w-full h-48" />
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>
  );
} 