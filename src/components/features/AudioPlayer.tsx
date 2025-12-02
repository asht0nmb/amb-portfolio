'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title = "Play Audio" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25
  };

  return (
    <div className="inline-block">
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        preload="metadata"
      />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={springConfig}
        className="
          flex items-center gap-3 px-6 py-3
          bg-white border-2 border-black rounded-full
          hover:bg-black hover:text-white
          transition-colors duration-200
          shadow-sm hover:shadow-md
        "
      >
        {isPlaying ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <span className="font-medium text-sm">Pause</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-medium text-sm">{title}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
