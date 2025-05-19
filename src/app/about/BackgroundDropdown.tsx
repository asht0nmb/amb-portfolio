"use client";
import { useState } from 'react';

export default function BackgroundDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <button
        className="flex items-center justify-between w-full focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="background-dropdown-content"
      >
        <span className="text-lg font-semibold text-gray-500 tracking-widest uppercase">/ Background</span>
        <span className={`text-2xl text-gray-400 select-none transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        id="background-dropdown-content"
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div className="relative backdrop-blur-sm rounded-2xl shadow p-6 min-h-[80px] flex flex-col justify-center">
          {/* <span className="absolute top-4 right-6 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">TypeScript</span> */}
          <span className="text-base font-light text-gray-700">I grew up in Port Townsend, WA and didn't know what UI meant until 2024. I've learned a lot since then, and intend to continue. My favorite ways to learn are traveling, reading, and trying.</span>
        </div>
      </div>
    </div>
  );
} 