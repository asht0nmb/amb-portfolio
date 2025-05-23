"use client";
import Image from 'next/image';
import dynamic from 'next/dynamic';
// import MapTile from '../components/ui/MapTile';
// import { MapContainer } from 'react-leaflet';

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
    <section className="w-full max-w-5xl mx-auto px-4 text-left mb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16">
        <div className="flex-1 flex flex-col gap-0">
          <h1 className="text-5xl font-bold mb-6">Ashton Meyer-Bibbins</h1>
          <h2 className="text-xl font-semibold text-gray-500 mb-2 tracking-widest uppercase">/ Background</h2>
          <div className="w-full min-h-[100px] py-4 mb-6">
            <span className="text-base font-light text-gray-700 leading-relaxed block text-left">
              I grew up in Port Townsend, WA and didn&#39;t know what UI meant until 2024. I&#39;ve learned a lot since then, and intend to continue. My favorite ways to learn are traveling, reading, and trying.
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-500 mb-2 tracking-widest uppercase">/ Now</h2>
          <div className="w-full min-h-[80px] py-4 mb-2">
            <span className="text-base font-light text-gray-700 leading-relaxed block text-left">
              Currently, I&#39;m focused on learning as much as possible, particularly from my mentors @ JulyAI, and a long list of book recommendations. My aim is to collect experiences in the pursuit of making my next product or project better than the last.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0 w-64 md:w-80">
          <div className="w-64 h-64 md:w-80 md:h-80 relative mb-4">
            <Image
              src="/photos/mountain_headshot.png"
              alt="Profile picture"
              fill
              className="object-cover rounded-2xl shadow-lg border-2 border-white"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
          <div className="text-sm text-gray-500 text-center px-2">
            Summit of Mount Awesome, 2023
          </div>
        </div>
      </div>
    </section>
  );
} 