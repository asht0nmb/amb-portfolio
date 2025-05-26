import React from 'react';
import NavBar from '@/components/layout/nav2/NavBar';

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="pt-20">
        <NavBar />
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Experiments</h1>
        <p className="text-gray-600">
          This is a hidden page for experimenting with new features and designs.
        </p>
      </div>
    </div>
  );
} 