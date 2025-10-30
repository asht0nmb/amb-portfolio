"use client";

import GlassSurface from '@/components/ui/GlassSurface';

interface Skill {
  name: string;
  level: number; // 1-5 scale
  category: 'design' | 'technical' | 'soft';
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Design Skills',
    description: 'Visual design and user experience capabilities',
    skills: [
      { name: 'UI Design', level: 4, category: 'design' },
      { name: 'UX Research', level: 3, category: 'design' },
      { name: 'Prototyping', level: 4, category: 'design' },
      { name: 'Design Systems', level: 3, category: 'design' },
      { name: 'Typography', level: 4, category: 'design' },
      { name: 'Color Theory', level: 4, category: 'design' }
    ]
  },
  {
    title: 'Technical Skills',
    description: 'Development and implementation abilities',
    skills: [
      { name: 'React', level: 4, category: 'technical' },
      { name: 'TypeScript', level: 3, category: 'technical' },
      { name: 'Next.js', level: 4, category: 'technical' },
      { name: 'CSS/Tailwind', level: 5, category: 'technical' },
      { name: 'Figma', level: 4, category: 'technical' },
      { name: 'Git', level: 3, category: 'technical' }
    ]
  },
  {
    title: 'Soft Skills',
    description: 'Communication and collaboration strengths',
    skills: [
      { name: 'Problem Solving', level: 5, category: 'soft' },
      { name: 'Communication', level: 4, category: 'soft' },
      { name: 'Learning Agility', level: 5, category: 'soft' },
      { name: 'Attention to Detail', level: 5, category: 'soft' },
      { name: 'Adaptability', level: 4, category: 'soft' },
      { name: 'Curiosity', level: 5, category: 'soft' }
    ]
  }
];

function SkillIndicator({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/30 rounded-lg border border-white/20">
      <span className="text-body text-gray-800 font-medium">{skill.name}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              dot <= skill.level 
                ? 'bg-blue-500' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 mb-16">
      <div className="mb-8">
        <h2 className="text-h2 text-gray-900 font-bold mb-2">Skills & Expertise</h2>
        <p className="text-body text-gray-600">
          Current capabilities and areas of focus in my learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <GlassSurface key={index} variant="standard" className="card-padding">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-h4 text-gray-900 font-semibold">
                  {category.title}
                </h3>
                <p className="text-body-small text-gray-600">
                  {category.description}
                </p>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillIndicator key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          </GlassSurface>
        ))}
      </div>

      {/* Learning Focus */}
      <div className="mt-8">
        <GlassSurface variant="subtle" className="card-padding">
          <div className="text-center space-y-3">
            <h3 className="text-h4 text-gray-900 font-semibold">Currently Learning</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Advanced React Patterns',
                'Design Psychology', 
                'Product Strategy',
                'User Research Methods',
                'Animation & Micro-interactions'
              ].map((topic) => (
                <span 
                  key={topic}
                  className="px-3 py-1 text-body-small text-blue-700 bg-blue-50 rounded-full border border-blue-200"
                >
                  {topic}
                </span>
              ))}
            </div>
            <p className="text-body-small text-gray-600 max-w-2xl mx-auto">
              Always expanding my knowledge through books, courses, and hands-on projects. 
              The goal is to become a more well-rounded designer and developer.
            </p>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}