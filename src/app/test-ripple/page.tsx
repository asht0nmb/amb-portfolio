"use client";

import { InteractiveWaterRipple } from "@/components/ui/InteractiveWaterRipple";
import { WaterBackground } from "@/components/ui/WaterBackground";

export default function TestRipple() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Water Effects Test</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Ripple Effects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Original Ripple Effects</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Auto Ripple</h3>
            <InteractiveWaterRipple 
              className="h-48 bg-white rounded-lg shadow-lg flex items-center justify-center"
              autoRipple={true}
              autoRippleDelay={1000}
            >
              <p className="text-gray-600">Auto ripple triggers after 1 second</p>
            </InteractiveWaterRipple>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Click Ripple</h3>
            <InteractiveWaterRipple 
              className="h-48 bg-white rounded-lg shadow-lg flex items-center justify-center"
            >
              <p className="text-gray-600">Click anywhere to create ripples</p>
            </InteractiveWaterRipple>
          </div>
        </div>

        {/* New Water Background Effects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">New Water Background Effects</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Subtle Water Background</h3>
            <WaterBackground 
              className="h-48 bg-white rounded-lg shadow-lg flex items-center justify-center water-surface"
              intensity="subtle"
              autoStart={true}
              interactive={true}
            >
              <p className="text-gray-600">Subtle water surface effect</p>
            </WaterBackground>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medium Water Background</h3>
            <WaterBackground 
              className="h-48 bg-white rounded-lg shadow-lg flex items-center justify-center water-surface"
              intensity="medium"
              autoStart={true}
              interactive={true}
            >
              <p className="text-gray-600">Medium intensity water effect</p>
            </WaterBackground>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Strong Water Background</h3>
            <WaterBackground 
              className="h-48 bg-white rounded-lg shadow-lg flex items-center justify-center water-surface"
              intensity="strong"
              autoStart={true}
              interactive={true}
            >
              <p className="text-gray-600">Strong water surface effect</p>
            </WaterBackground>
          </div>
        </div>

        {/* Hero-style Test */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-semibold">Hero Style Water Background</h2>
          <WaterBackground 
            className="h-96 bg-white rounded-lg shadow-water-deep flex items-center justify-center water-surface"
            intensity="medium"
            autoStart={true}
            interactive={true}
          >
            <div className="text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                Hi, I&apos;m Ashton
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 drop-shadow-sm">
                Testing the advanced water background integration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-sm text-gray-500">University of Washington</div>
                <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="text-sm text-gray-500">Seattle, WA</div>
              </div>
            </div>
            
            {/* Additional ambient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-blue-100/15 pointer-events-none rounded-lg" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-radial from-blue-400/15 to-transparent rounded-full blur-lg pointer-events-none" />
          </WaterBackground>
        </div>
      </div>
    </div>
  );
}