'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordTiming {
  word: string;
  startTime: number;
  duration: number;
}

interface InteractiveAudioQuoteProps {
  audioSrc: string;
  quote: string;
  author?: string;
  wordTimings?: WordTiming[];
}

export default function InteractiveAudioQuote({
  audioSrc,
  quote,
  author,
  wordTimings
}: InteractiveAudioQuoteProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Split quote into words if no timings provided
  const words = wordTimings?.map(wt => wt.word) || quote.split(' ');

  // Track audio playback time and update current word
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !wordTimings) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;

      // Find the current word based on playback time and duration
      let newIndex = -1;
      for (let i = 0; i < wordTimings.length; i++) {
        const { startTime, duration } = wordTimings[i];
        if (currentTime >= startTime && currentTime < startTime + duration) {
          newIndex = i;
          break;
        }
      }
      setCurrentWordIndex(newIndex);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [wordTimings]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentWordIndex(-1);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  return (
    <div className="text-center">
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
        preload="metadata"
      />

      <button
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          relative inline-block
          text-h3 text-gray-700 leading-relaxed mb-6
          cursor-pointer
          transition-colors duration-200
          hover:text-gray-900
          focus:outline-none
        "
      >
        {/* Tooltip - Pops up above */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="
                absolute -top-12 left-1/2 -translate-x-1/2
                bg-black text-white text-xs
                px-3 py-1.5 rounded-md
                whitespace-nowrap
                pointer-events-none
              "
            >
              {isPlaying ? 'Pause' : 'Listen'}
              {/* Tooltip Arrow */}
              <div className="
                absolute -bottom-1 left-1/2 -translate-x-1/2
                w-2 h-2 bg-black rotate-45
              "/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote Text */}
        <span className="italic">
          &ldquo;
          {words.map((word, index) => (
            <motion.span
              key={index}
              animate={{
                fontWeight: currentWordIndex === index ? 700 : 400,
              }}
              transition={{
                fontWeight: {
                  duration: 0.1
                }
              }}
              className={`inline-block ${
                currentWordIndex === index ? 'text-gray-900' : ''
              }`}
            >
              {word}
              {index < words.length - 1 && '\u00A0'}
            </motion.span>
          ))}
          &rdquo;
        </span>
      </button>

      {author && (
        <motion.cite
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-body-small text-gray-500 not-italic block mt-4"
        >
          {author}
        </motion.cite>
      )}
    </div>
  );
}
