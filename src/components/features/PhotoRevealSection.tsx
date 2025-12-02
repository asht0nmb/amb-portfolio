'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PhotoCard from './PhotoCard';
import InteractiveAudioQuote from './InteractiveAudioQuote';

interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  year?: string;
}

const photos: Photo[] = [
  { id: '1', src: '/photos/mountain_headshot.png', alt: 'Mountain headshot', caption: 'Snow summits in the summer', location: 'Banff, Alberta', year: 'Mar 2025' },
  { id: '3', src: '/photos/moments/running.png', alt: 'Seattle Marathon', caption: 'Morning (half) marathon', location: 'Seattle, WA', year: 'Nov 2025' },
  { id: '2', src: '/photos/peak1.jpg', alt: 'Enjoying the mountains', caption: 'Lake 1 the Enchantments', location: 'North Cascades', year: 'June 2024' },
  { id: '5', src: '/photos/moments/oranges.png', alt: 'City Streets', caption: 'Oranges oranges oranges', location: 'Stockholm, Sweden', year: 'Jul 2025' },
  { id: '6', src: '/photos/wave1.jpg', alt: 'Waterfall', caption: 'Water + photography', location: 'Kēōkea Bay, HI', year: 'Jan 2024' },
  { id: '4', src: '/photos/moments/downstairs_jazz.png', alt: 'Jazz Players', caption: 'Basement jazz', location: 'Shimokitazawa, Tokyo', year: 'Sep 2024' }
];

const photoConfig = [
  { offset: 800, staticOffset: '-mt-8' },
  { offset: 900, staticOffset: 'mt-6' },
  { offset: 850, staticOffset: '-mt-4' },
  { offset: 950, staticOffset: 'mt-10' },
  { offset: 880, staticOffset: 'mt-4' },
  { offset: 920, staticOffset: 'mt-8' },
];

function AnimatedPhotoCard({
  photo,
  scrollProgress,
  yOffset,
  className = ''
}: {
  photo: Photo;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  yOffset: number;
  className?: string;
}) {
  const y = useTransform(
    scrollProgress,
    [0, 0.6, 1],
    [yOffset, 0, -yOffset * 0.15]
  );

  const ySmooth = useSpring(y, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const normalizedOffset = yOffset / 950;
  const opacityStart = 0.05 + (normalizedOffset * 0.08);
  const opacity = useTransform(
    scrollProgress,
    [opacityStart, opacityStart + 0.15, 0.5],
    [0, 0.7, 1]
  );

  return (
    <motion.div
      className={className}
      style={{ y: ySmooth, opacity }} // , scale: 0.9
    >
      <PhotoCard photo={photo} />
    </motion.div>
  );
}

export default function QuotePhotoRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Quote movement - starts moving up after photos begin rising
  // Adjust the first value (0.25) to control WHEN quote starts moving
  // Adjust the last value (-200) to control HOW FAR quote moves
  const quoteY = useTransform(scrollYProgress, [0, 0.25, 0.7], [0, 0, -350]);
  const quoteYSmooth = useSpring(quoteY, { stiffness: 80, damping: 30 });
  
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.9]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.98]);

  return (
    // Tall container creates scroll "budget" for the animation
<section ref={containerRef} className="relative h-[250vh] mb-48">
      {/* Sticky viewport - stays fixed while we scroll through container */}
      <div className="sticky top-0 h-screen">
        
        {/* Quote - centered on screen, moves up as photos rise */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 text-center px-6"
          style={{ y: quoteYSmooth, opacity: quoteOpacity, scale: quoteScale }}
        >
          <div className="max-w-3xl mx-auto">
            <InteractiveAudioQuote
              audioSrc="/audio/ab_goat.mp3"
              quote="If I'm an advocate for anything, it's to move."
              author="A. Bourdain"
              wordTimings={[
                { word: "If", startTime: 0.75, duration: 0.25 },
                { word: "I'm", startTime: 1, duration: 0.25 },
                { word: "an", startTime: 1.25, duration: 0.25 },
                { word: "advocate", startTime: 1.5, duration: 0.25 },
                { word: "for", startTime: 1.75, duration: 0.25 },
                { word: "anything,", startTime: 2, duration: 0.75 },
                { word: "it's", startTime: 2.75, duration: 0.25 },
                { word: "to", startTime: 3, duration: 0.25 },
                { word: "move.", startTime: 3.25, duration: 0.4 },
              ]}
            />
          </div>
        </motion.div>

        {/* Photo Grid - rises from below to meet the quote */}
        <div className="absolute inset-x-0 bottom-0 top-[45%] px-6">
          <div className="max-w-6xl mx-auto h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-5xl mx-auto">
              {/* Column 1 */}
              <div className="space-y-6">
                <AnimatedPhotoCard 
                  photo={photos[0]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[0].offset}
                  className={photoConfig[0].staticOffset}
                />
                <AnimatedPhotoCard 
                  photo={photos[3]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[3].offset}
                  className={photoConfig[3].staticOffset}
                />
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <AnimatedPhotoCard 
                  photo={photos[1]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[1].offset}
                  className={photoConfig[1].staticOffset}
                />
                <AnimatedPhotoCard 
                  photo={photos[4]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[4].offset}
                  className={photoConfig[4].staticOffset}
                />
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                <AnimatedPhotoCard 
                  photo={photos[2]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[2].offset}
                  className={photoConfig[2].staticOffset}
                />
                <AnimatedPhotoCard 
                  photo={photos[5]} 
                  scrollProgress={scrollYProgress}
                  yOffset={photoConfig[5].offset}
                  className={photoConfig[5].staticOffset}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer - creates clean gap before next section */}
      {/* Adjust this height to control space after photos */}
      <div className="h-96" />
    </section>
  );
}