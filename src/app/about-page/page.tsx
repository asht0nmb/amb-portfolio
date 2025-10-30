"use client";

import AboutHero from './AboutHero';
import NowMediaGrid from './NowMediaGrid';
import AboutTimeline from './AboutTimeline';
import SkillsSection from './SkillsSection';
import AboutInfo from './AboutInfo';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 pt-24">
      <AboutHero />
      <AboutInfo />
      <AboutTimeline />
      <SkillsSection />
      <NowMediaGrid />
    </div>
  );
} 