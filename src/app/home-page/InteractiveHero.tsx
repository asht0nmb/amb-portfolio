"use client";

import { InteractiveWaterRipple } from "@/components/ui/InteractiveWaterRipple";

export default function InteractiveHero() {
    return (
        <InteractiveWaterRipple className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Hi, I&apos;m
                    <br />
                    <span className="text-gray-900">
                        Ashton
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Student, builder, photographer — exploring the intersection of business and technology
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="text-sm text-gray-500">
                        University of Washington
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="text-sm text-gray-500">
                        Seattle, WA
                    </div>
                </div>
            </div>
        </InteractiveWaterRipple>
    );
}