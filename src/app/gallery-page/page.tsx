'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserPhotos, getCollectionPhotos, UnsplashPhoto } from '@/lib/unsplash';

// Choose one of these methods:
const UNSPLASH_USERNAME = 'ashtonmb'; // Your Unsplash username
const COLLECTION_ID = ''; // Your collection ID (if using collections)

// Set this to 'username' or 'collection' to choose the method
const PHOTO_SOURCE = 'username';

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Check if API key is set
        const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
        if (!apiKey) {
          setError('Unsplash API key is not configured. Please check your environment variables.');
          console.error('Missing Unsplash API key');
          return;
        }

        let fetchedPhotos: UnsplashPhoto[] = [];
        
        if (PHOTO_SOURCE === 'username') {
          console.log('Fetching photos for username:', UNSPLASH_USERNAME);
          fetchedPhotos = await getUserPhotos(UNSPLASH_USERNAME);
        } else if (PHOTO_SOURCE === 'collection' && COLLECTION_ID) {
          console.log('Fetching photos for collection:', COLLECTION_ID);
          fetchedPhotos = await getCollectionPhotos(COLLECTION_ID);
        }

        if (fetchedPhotos.length === 0) {
          setError(`No photos found. Please check your Unsplash ${PHOTO_SOURCE === 'username' ? 'username' : 'collection ID'}.`);
          console.error('No photos returned from Unsplash');
        } else {
          console.log('Successfully fetched', fetchedPhotos.length, 'photos');
        }
        
        setPhotos(fetchedPhotos);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error loading photos: ${errorMessage}`);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-3 flex-shrink-0">
              Some cool pics <a href="https://instagram.com/amb.usb" target="_blank" rel="noopener noreferrer" className="text-neutral-800 hover:text-neutral-600 transition-colors inline-flex">@amb.usb</a>
            </h1>
            <p className="text-base text-neutral-600 font-light">
              I love taking pictures
            </p>
          </div>
          <div className="lg:col-start-3 text-sm text-neutral-500">
            <p className="font-medium">Panasonic</p>
            <p>DMC-FZ200</p>
          </div>
        </div>

        {/* Gallery Section */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-[3/2] cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.urls.regular}
                  alt={photo.description || ''}
                  fill
                  className="object-cover rounded-xl transition-all duration-300 group-hover:opacity-95"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Expanded Photo View */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
                className="fixed top-8 right-8 z-[110] p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                aria-label="Close photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-auto"
                style={{ height: 'calc(85vh)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.urls.regular}
                  alt={selectedPhoto.description || ''}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
                
                {/* Photo Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-end items-end max-w-7xl mx-auto">
                    <div className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-lg">
                      {selectedPhoto.exif && Object.keys(selectedPhoto.exif).length > 0 && (
                        <>
                          {selectedPhoto.exif.make && selectedPhoto.exif.model && (
                            <p className="text-sm opacity-90 mb-1">{selectedPhoto.exif.make} {selectedPhoto.exif.model}</p>
                          )}
                          <div className="flex gap-3 text-sm opacity-80">
                            {selectedPhoto.exif.focal_length && (
                              <span>{selectedPhoto.exif.focal_length}mm</span>
                            )}
                            {selectedPhoto.exif.aperture && (
                              <span>ƒ/{selectedPhoto.exif.aperture}</span>
                            )}
                            {selectedPhoto.exif.exposure_time && (
                              <span>{selectedPhoto.exif.exposure_time}s</span>
                            )}
                            {selectedPhoto.exif.iso && (
                              <span>ISO {selectedPhoto.exif.iso}</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description Overlay (if exists) */}
                {selectedPhoto.description && (
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <div className="max-w-7xl mx-auto">
                      <p className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-lg text-sm">
                        {selectedPhoto.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 