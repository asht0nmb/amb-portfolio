import Link from 'next/link';
import Image from 'next/image';

type ImagePosition = 'top-right' | 'bottom-left' | 'center-right' | 'bottom-right';

interface NowCardProps {
  images?: {
    src: string;
    alt?: string;
    position: ImagePosition;
  }[];
}

const defaultImages = [
  {
    src: '/photos/now/nudge.jpg',
    position: 'top-right' as const,
    alt: 'Book cover'
  },
  {
    src: '/photos/now/beatles_help.webp',
    position: 'bottom-left' as const,
    alt: 'Beatles album'
  },
  {
    src: '/photos/now/camera.png',
    position: 'center-right' as const,
    alt: 'Camera illustration'
  },
  {
    src: '/photos/now/run.webp',
    position: 'bottom-right' as const,
    alt: 'Running illustration'
  }
];

export default function NowCard({ images = defaultImages }: NowCardProps) {
  const getPositionClasses = (position: ImagePosition) => {
    switch (position) {
      case 'top-right':
        return 'absolute right-[40%] top-[65%] w-[13.5vw] h-[18vw] sm:w-[8.8vw] sm:h-[12vw] lg:w-[8.5vw] lg:h-[13vw] transform transition-transform group-hover:scale-105 rotate-2';
      case 'bottom-left':
        return 'absolute right-[15%] bottom-[5%] w-[18vw] h-[18vw] sm:w-[15vw] sm:h-[15vw] lg:w-[12vw] lg:h-[12vw] transform transition-transform group-hover:scale-105 -rotate-3';
      case 'center-right':
        return 'absolute right-[25%] top-[15%] w-[10vw] h-[10vw] sm:w-[8vw] sm:h-[8vw] lg:w-[7vw] lg:h-[7vw] transform transition-transform group-hover:scale-105 rotate-6';
      case 'bottom-right':
        return 'absolute right-[5%] top-[5%] w-[12vw] h-[12vw] sm:w-[10vw] sm:h-[10vw] lg:w-[8vw] lg:h-[8vw] transform transition-transform group-hover:scale-105 -rotate-2';
      default:
        return '';
    }
  };

  return (
    <Link
      href="/about-page"
      scroll={false}
      className="block w-full transition-all duration-500 ease-out group"
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:-translate-y-1 hover:bg-white/90
        bg-gradient-to-br from-blue-50/50 to-transparent
        aspect-[8/8] overflow-hidden">
        <div className="flex flex-col h-full relative">
          <div className="flex-1 min-w-0 relative z-10 max-w-[60%]">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 tracking-tight">Now</h2>
              <p className="text-black/60 text-xs sm:text-sm">
                {"See what I'm up to at the moment"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium
                  transition-colors duration-500 ease-out group-hover:bg-blue-100"
              >
                Life
              </span>
              <span
                className="bg-black/5 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium
                  transition-colors duration-500 ease-out group-hover:bg-black/10"
              >
                Updates
              </span>
            </div>
          </div>

          {/* Decorative Images */}
          <div className="absolute inset-0 pointer-events-none">
            {images.map((image, index) => (
              <div 
                key={index}
                className={getPositionClasses(image.position)}
              >
                <Image
                  src={image.src}
                  alt={image.alt || ''}
                  fill
                  className="object-cover rounded-xl transition-opacity duration-500 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 180px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 