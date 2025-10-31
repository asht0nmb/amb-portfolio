export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'web' | 'data' | 'design' | 'ai' | 'case-study' | 'other';
  generalTags: string[];
  techTags: string[];
  status: 'in-progress' | 'shipped';
  collaborators: number;
  lastUpdated: string;
  previewImage?: string;
  images?: string[];
  features?: string[];
  links?: {
    github?: string;
    live?: string;
    caseStudy?: string;
  };
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 't1d-insight-engine',
    title: 'T1D Data Insight Engine',
    shortDescription: 'Offline-first analytics dashboard for Type 1 diabetics, with automatic anomaly flagging, unlogged-meal detection, and daily glycemic-pattern clustering—turning raw CGM and pump data into actionable insights.',
    fullDescription: `An advanced analytics platform designed specifically for Type 1 diabetics to gain deeper insights into their glucose patterns. The system uses machine learning to detect anomalies, identify unlogged meals, and cluster daily patterns to help users better manage their condition.

Built with privacy in mind, all data processing happens locally on the device, ensuring sensitive health information never leaves the user's control. The dashboard provides actionable insights through intuitive visualizations and smart notifications.`,
    category: 'ai',
    generalTags: ['AI', 'Health', 'Personal'],
    techTags: ['Pandas', 'scikit-learn', 'React', 'TypeScript', 'TailwindCSS'],
    status: 'in-progress',
    collaborators: 1,
    lastUpdated: 'today',
    features: [
      'Automatic anomaly detection in glucose patterns',
      'Unlogged meal identification using ML',
      'Daily pattern clustering and analysis',
      'Offline-first architecture for data privacy',
      'Real-time alerts for concerning trends',
      'Historical trend visualization',
    ],
    links: {
      github: 'https://github.com/asht0nmb',
    },
    featured: true,
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription: 'A personal portfolio website built with Next.js, featuring glassmorphic design, smooth animations, and an integrated photo gallery.',
    fullDescription: `A modern, responsive portfolio website showcasing my work and interests. Built with Next.js 14 and the App Router, featuring custom animations with Framer Motion and a unique glassmorphic design aesthetic.

The site includes an integrated Unsplash photo gallery, custom cursor interactions, and smooth page transitions. Every detail has been carefully crafted to provide an engaging user experience while maintaining excellent performance.`,
    category: 'web',
    generalTags: ['Design', 'Personal'],
    techTags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    status: 'in-progress',
    collaborators: 1,
    lastUpdated: 'Today',
    previewImage: '/photos/heroSS.png',
    features: [
      'Glassmorphic UI components',
      'Custom Framer Motion animations',
      'Integrated Unsplash gallery',
      'Custom cursor with smooth tracking',
      'Responsive design for all devices',
      'Page transition animations',
    ],
    links: {
      live: 'https://ashtonmb.me',
      github: 'https://github.com/asht0nmb',
    },
    featured: true,
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};
