"use client";

import GlassSurface from '@/components/ui/GlassSurface';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'experience' | 'milestone';
}

const timelineData: TimelineItem[] = [
  {
    year: '2024',
    title: 'UI/UX Discovery',
    organization: 'Self-Directed Learning',
    description: 'Discovered UI/UX design and began intensive learning journey. Started building projects and understanding design principles.',
    type: 'milestone'
  },
  {
    year: '2024',
    title: 'Mentorship Program',
    organization: 'JulyAI',
    description: 'Joined mentorship program focused on product design and development. Learning from experienced practitioners in the field.',
    type: 'experience'
  },
  {
    year: '2023',
    title: 'Exploration Phase',
    organization: 'Various Projects',
    description: 'Experimented with different creative and technical pursuits. Built foundation for future specialization in design.',
    type: 'experience'
  },
  {
    year: 'Early Life',
    title: 'Port Townsend Roots',
    organization: 'Port Townsend, WA',
    description: 'Grew up in Port Townsend, Washington. Developed appreciation for craftsmanship and attention to detail.',
    type: 'education'
  }
];

export default function AboutTimeline() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 mb-16">
      <div className="mb-8">
        <h2 className="text-h2 text-gray-900 font-bold mb-2">Journey</h2>
        <p className="text-body text-gray-600">
          Key moments and experiences that shaped my path to design
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-gray-300 to-gray-200"></div>

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <div 
              key={index}
              className={`relative flex items-start gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm z-10"></div>

              {/* Content card */}
              <div className={`flex-1 ml-12 md:ml-0 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}>
                <GlassSurface variant="subtle" className="card-padding">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-body-small font-semibold text-blue-600 uppercase tracking-wide">
                        {item.year}
                      </span>
                      <span className={`px-2 py-1 text-caption rounded-full ${
                        item.type === 'education' ? 'bg-green-100 text-green-700' :
                        item.type === 'experience' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-h4 text-gray-900 font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-body-small text-gray-600 font-medium mb-2">
                        {item.organization}
                      </p>
                    </div>
                    
                    <p className="text-body text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassSurface>
              </div>

              {/* Spacer for alternating layout on desktop */}
              <div className="hidden md:block flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}