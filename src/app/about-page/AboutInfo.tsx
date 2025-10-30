"use client";

import GlassSurface from '@/components/ui/GlassSurface';

export default function AboutInfo() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Philosophy Section */}
        <GlassSurface variant="standard" className="card-padding">
          <div className="space-y-4">
            <h3 className="text-h4 text-gray-900 font-semibold">Philosophy</h3>
            <div className="space-y-3">
              <p className="text-body text-gray-700">
                I believe in learning through doing, traveling to understand different perspectives, 
                and reading to expand my mental models.
              </p>
              <p className="text-body text-gray-700">
                Every project is an opportunity to push boundaries and create something meaningful 
                that serves real human needs.
              </p>
            </div>
          </div>
        </GlassSurface>

        {/* Values Section */}
        <GlassSurface variant="standard" className="card-padding">
          <div className="space-y-4">
            <h3 className="text-h4 text-gray-900 font-semibold">Values</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-body text-gray-700">
                  <span className="font-medium">Curiosity:</span> Always asking "what if" and "why not"
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-body text-gray-700">
                  <span className="font-medium">Craft:</span> Attention to detail in every interaction
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-body text-gray-700">
                  <span className="font-medium">Growth:</span> Embracing challenges as learning opportunities
                </p>
              </div>
            </div>
          </div>
        </GlassSurface>

        {/* Interests Section */}
        <GlassSurface variant="standard" className="card-padding">
          <div className="space-y-4">
            <h3 className="text-h4 text-gray-900 font-semibold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'UI/UX Design', 'Product Strategy', 'Photography', 'Mountaineering', 
                'Travel', 'Reading', 'Technology', 'Minimalism'
              ].map((interest) => (
                <span 
                  key={interest}
                  className="px-3 py-1 text-body-small text-gray-700 bg-white/50 rounded-full border border-white/30"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </GlassSurface>

        {/* Contact Section */}
        <GlassSurface variant="standard" className="card-padding">
          <div className="space-y-4">
            <h3 className="text-h4 text-gray-900 font-semibold">Connect</h3>
            <div className="space-y-3">
              <p className="text-body text-gray-700">
                Always open to interesting conversations about design, technology, 
                and the intersection of human needs and digital solutions.
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="mailto:ashton@example.com" 
                  className="text-body text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  ashton@example.com
                </a>
                <a 
                  href="https://linkedin.com/in/ashtonmb" 
                  className="text-body text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}