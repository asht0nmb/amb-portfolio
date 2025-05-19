"use client";
import { useEffect, useState } from 'react';
import { getTopArtists, getTopTracks } from '../utils/spotify';

export default function NowMediaGrid() {
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const artistData = await getTopArtists();
        setArtists(artistData.items || []);
        const trackData = await getTopTracks();
        setTracks(trackData.items || []);
      } catch (e) {
        setArtists([]);
        setTracks([]);
      }
    }
    fetchSpotify();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-4">
      <h3 className="text-3xl font-bold mb-6">Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Top Artists Card */}
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
          <h4 className="font-semibold mb-2">Top Artists</h4>
          <div className="flex flex-wrap gap-4">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center w-20">
                  <img src={artist.images?.[0]?.url} alt={artist.name} className="w-16 h-16 rounded-full object-cover mb-1" />
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
          <h4 className="font-semibold mb-2">Top Songs</h4>
          <div className="flex flex-wrap gap-4">
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <div key={track.id} className="flex flex-col items-center w-20">
                  <img src={track.album?.images?.[0]?.url} alt={track.name} className="w-16 h-16 rounded object-cover mb-1" />
                  <span className="text-xs text-gray-700 text-center truncate w-full">{track.name}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No data</span>
            )}
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-6">Listening</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Album 1 Card]</div>
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Album 2 Card]</div>
      </div>
      <h3 className="text-3xl font-bold mb-6">Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Show 1 Card]</div>
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Show 2 Card]</div>
      </div>
      <h3 className="text-3xl font-bold mb-6">Doing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Show 1 Card]</div>
        <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4 min-h-[120px]">[Show 2 Card]</div>
      </div>
    </section>
  );
} 