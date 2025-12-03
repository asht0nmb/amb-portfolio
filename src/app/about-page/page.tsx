"use client";

import QuotePhotoRevealSection from '@/app/about-page/PhotoRevealSection';
import AboutSection from './AboutSection';
// import NowSection from './NowSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#faf9f6]">

      {/* Combined Quote + Photo Reveal Section */}
      <QuotePhotoRevealSection />

      {/* About Section - Full width aligned with photos */}
      <AboutSection />

      {/* Currently Reading - Same width as About */}
      {/* <NowSection /> */}

    </div>
  );
}