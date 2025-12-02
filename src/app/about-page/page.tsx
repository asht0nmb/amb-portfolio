"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionReveal from '@/components/animations/SectionReveal';
import QuotePhotoRevealSection from '@/components/features/PhotoRevealSection';
import AboutSection from './AboutSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#faf9f6]">

      {/* Combined Quote + Photo Reveal Section */}
      <QuotePhotoRevealSection />

      {/* About Section - Full width aligned with photos */}
      <AboutSection />

      {/* Currently Reading - Same width as About */}
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal threshold={0.5} delay={0}>
          <section className="py-16 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Currently Reading</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.div
                whileHover={{ rotate: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-32 h-48 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative shadow-md"
              >
                <Image
                  src="/photos/now/nudge.jpg"
                  alt="NUDGE Final Edition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, 192px"
                  priority
                />
              </motion.div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl text-gray-900 font-medium mb-1">Nudge</h3>
                <p className="text-base text-gray-500 mb-3">R. H. Thaler & C. R. Sunstein</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Most recent read; audiobooks r the wave though
                </p>
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>

    </div>
  );
}