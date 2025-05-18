import Link from 'next/link';
import Image from 'next/image';

interface NowCardProps {
  images?: {
    src: string;
    alt: string;
  }[];
}

export default function NowCard({ images = [] }: NowCardProps) {
  return (
    <Link 
      href="/about"
      className="block w-full transition-all duration-500 ease-out group"
      style={{ cursor: 'none' }}
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-sm 
        transition-all duration-500 ease-out 
        hover:shadow-xl hover:-translate-y-1 hover:bg-white/90">
        <div className="flex gap-12 items-center h-full">
          {/* Left: Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6
              transition-all duration-500 ease-out group-hover:bg-black/10">
              <span className="text-sm font-medium text-black/70">
                Currently
              </span>
            </div>

            <div className="mb-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
              <h2 className="text-3xl font-semibold mb-3 tracking-tight">Now</h2>
              <p className="text-black/60 text-lg">
              <p>{"See what I'm up to at the moment"}</p>
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
              <span 
                className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-500 ease-out group-hover:bg-blue-100"
              >
                Life
              </span>
              <span 
                className="bg-black/5 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-500 ease-out group-hover:bg-black/10"
              >
                Updates
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-6 transition-transform duration-500 ease-out group-hover:translate-x-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-sm text-black/60">Updated daily</span>
              </div>
            </div>
          </div>

          {/* Right: Image Strip */}
          <div className="relative w-[300px] h-[280px] bg-black/5 backdrop-blur-sm rounded-2xl overflow-hidden
            transition-all duration-500 ease-out group-hover:bg-black/10">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 p-2 h-full">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className="relative rounded-xl overflow-hidden bg-black/5 backdrop-blur-sm"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center
                transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <div className="text-black/40 text-lg flex flex-col items-center gap-4">
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform duration-500 ease-out group-hover:scale-110"
                  >
                    <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"/>
                    <path d="M8 12L16 12M16 12L12 8M16 12L12 16"/>
                  </svg>
                  <span>Photos Coming Soon</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 