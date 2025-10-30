'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getLinkClasses = (path: string) => {
    const baseClasses = "inline-block text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-out";
    const transformClasses = "transform hover:translate-x-2";
    const activeClasses = isActive(path) ? '' : transformClasses;
    
    return `${baseClasses} ${activeClasses}`.trim();
  };

  return (
    <footer className="w-full py-12 bg-neutral-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Branding Column */}
          <div>
            <h3 className="font-medium text-lg mb-2">Ashton&apos;s personal site</h3>
            <p className="text-neutral-600">Building creative experiences.</p>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Pages</h3>
            <nav className="flex flex-col space-y-2">
              <div>
                <Link href="/" className={getLinkClasses('/')}>
                  {isActive('/') && '/ '} Home
                </Link>
              </div>
              <div>
                <Link href="/about-page" className={getLinkClasses('/about-page')}>
                  {isActive('/about-page') && '/ '} About
                </Link>
              </div>
              <div>
                <Link href="/workspace-page" className={getLinkClasses('/workspace-page')}>
                  {isActive('/workspace-page') && '/ '} Workspace
                </Link>
              </div>
              <div>
                <Link href="/gallery-page" className={getLinkClasses('/gallery-page')}>
                  {isActive('/gallery-page') && '/ '} Gallery
                </Link>
              </div>
            </nav>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <div>
                <a 
                  href="https://www.linkedin.com/in/ashton-meyer-bibbins/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-out transform hover:translate-x-2"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a 
                  href="https://github.com/asht0nmb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-out transform hover:translate-x-2"
                >
                  GitHub
                </a>
              </div>
              <div>
                <a 
                  href="mailto:ameyerbibbins@gmail.com"
                  className="inline-block text-neutral-600 hover:text-neutral-900 transition-all duration-300 ease-out transform hover:translate-x-2"
                >
                  Email
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}