"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getTopArtists, getTopTracks } from '../../lib/spotify';
import StravaStats from '@/components/features/StravaStats';

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}

export default function NowMediaGrid() {
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const artistData = await getTopArtists();
        setArtists(artistData.items || []);
        const trackData = await getTopTracks();
        setTracks(trackData.items || []);
      } catch {
        setArtists([]);
        setTracks([]);
      }
    }
    fetchSpotify();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-4">
      <h3 className="text-3xl font-bold mb-6">Listening</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Top Artists Card */}
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Top Artists</h4>
          <div className="flex flex-wrap gap-4">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center w-20">
                  <Image src={artist.images?.[0]?.url || '/placeholder.png'} alt={artist.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover mb-1" />
                  <span className="text-xs text-gray-700 text-center truncate w-full">{artist.name}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No data</span>
            )}
          </div>
        </div>

        {/* Top Tracks Card */}
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Top Tracks</h4>
          <div className="space-y-2">
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <div key={track.id} className="flex items-center gap-3">
                  <Image src={track.album.images?.[0]?.url || '/placeholder.png'} alt={track.name} width={40} height={40} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{track.name}</p>
                    <p className="text-xs text-gray-500 truncate">{track.artists.map(a => a.name).join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No data</span>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-3xl font-bold mb-6">Moving</h3>
      <div className="grid grid-cols-1 gap-6 mb-10">
        <StravaStats />
      </div>

      <h3 className="text-3xl font-bold mb-6">Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Currently Learning</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Advanced TypeScript Patterns</li>
            <li>System Design Principles</li>
            <li>Machine Learning Fundamentals</li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Reading</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>"Designing Data-Intensive Applications" by Martin Kleppmann</li>
            <li>"The Pragmatic Programmer" by Andrew Hunt and David Thomas</li>
          </ul>
        </div>
      </div>

      <h3 className="text-3xl font-bold mb-6">Doing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Current Projects</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Building a personal portfolio website</li>
            <li>Contributing to open-source projects</li>
            <li>Learning new programming languages</li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Hobbies</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Photography</li>
            <li>Hiking</li>
            <li>Reading tech blogs</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 