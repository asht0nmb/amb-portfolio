export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  hoverDetails?: string; // Custom text to show on card hover (different from modal description)
  category: 'Web' | 'Data Science' | 'Design' | 'Analytics + ML' | 'case-study' | 'Mobile' | 'other';
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
  size?: 'featured' | 'large' | 'medium-tall' | 'medium' | 'small';
  gridSpan?: string; // Tailwind classes like 'col-span-2' or 'row-span-2'
}

export const projects: Project[] = [
  {
    id: 'coffee-scheduler',
    title: 'Coffee-Chat Scheduler',
    shortDescription: 'An intelligent scheduling assistant that eliminates back-and-forth when coordinating 1:1 meetings across multiple people and timezones.',
    fullDescription: `A sophisticated scheduling application designed to solve the complex problem of coordinating 1:1 meetings across different time zones with timezone-aware fairness scoring. Unlike traditional schedulers, this system ensures equitable time slot distribution for all participants, regardless of their location.

The application features a custom 3-phase scheduling algorithm that combines quality matrix generation, constrained greedy optimization, and local search techniques to find optimal meeting times. Built with a mobile-first approach and integrated with Google Calendar for seamless workflow integration.`,
    hoverDetails: 'Smart scheduling with timezone fairness—coordinate 1:1 meetings across the globe without the back-and-forth.',
    category: 'web',
    generalTags: ['Productivity', 'Full-Stack', 'Algorithm'],
    techTags: ['Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Google Calendar API'],
    status: 'shipped',
    collaborators: 1,
    lastUpdated: 'Oct 2024',
    features: [
      'Smart 3-phase scheduling algorithm with timezone-aware fairness scoring',
      'Support for extreme global timezones (UTC-12 to UTC+14)',
      'Google OAuth authentication with custom PKCE implementation',
      'Real-time calendar conflict detection',
      'Mobile-first responsive design',
      'High-performance API with sub-100ms response times',
      '26 RESTful API endpoints with 115 comprehensive tests',
      'Advanced timezone optimization and local search',
    ],
    previewImage: '/mocks/coffee_schedule.png',
    links: {
      github: 'https://github.com/asht0nmb/coffee-scheduler',
      live: 'https://coffee-scheduler.vercel.app',
    },
    featured: true,
    size: 'large',
    gridSpan: 'md:col-span-2',
  },
  {
    id: 'placeholder-project',
    title: 'Earnings Report Impact on Returns',
    shortDescription: 'An exciting new project currently in development. Stay tuned for updates!',
    fullDescription: `This space is reserved for an upcoming project that's currently in the works. Check back soon for details about this exciting new addition to the portfolio.`,
    hoverDetails: 'New project coming soon—something exciting is in the works!',
    category: 'Data Science',
    generalTags: ['Coming Soon'],
    techTags: [],
    status: 'in-progress',
    collaborators: 1,
    lastUpdated: 'Nov 2024',
    features: [],
    featured: true,
    size: 'medium-tall',
    gridSpan: 'md:col-span-1',
  },
  {
    id: 't1d-insights',
    title: 'T1D Data Insights',
    shortDescription: 'Offline-first analytics dashboard for Type 1 diabetics, with automatic anomaly flagging, unlogged-meal detection, and daily glycemic-pattern clustering—turning raw CGM and pump data into actionable insights.',
    fullDescription: `An advanced analytics platform designed specifically for Type 1 diabetics to gain deeper insights into their glucose patterns. The system uses machine learning to detect anomalies, identify unlogged meals, and cluster daily patterns to help users better manage their condition.

Built with privacy in mind, all data processing happens locally on the device, ensuring sensitive health information never leaves the user's control. The dashboard provides actionable insights through intuitive visualizations and smart notifications.`,
    hoverDetails: 'ML-powered analytics for Type 1 diabetes management—detect patterns, flag anomalies, and gain insights from CGM data.',
    category: 'Analytics + ML',
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
    size: 'medium',
    gridSpan: 'md:col-span-1',
  },
  {
    id: 'new-app',
    title: 'Coming Soon',
    shortDescription: 'Recimi, an app for sharing recipies',
    fullDescription: `"The best thing since sliced bread" - probably Martha Stuart's granddaughter`,
    hoverDetails: 'Coming soon',
    category: 'Mobile',
    generalTags: ['Consumer', 'Personal'],
    techTags: ['FastAPI', 'SwiftUI', 'PostgreSQL'], 
    status: 'in-progress',
    collaborators: 1,
    lastUpdated: 'Today',
    previewImage: '',
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
    size: 'medium',
    gridSpan: 'md:col-span-1',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription: 'A personal portfolio website built with Next.js, featuring glassmorphic design, smooth animations, and an integrated photo gallery.',
    fullDescription: `A modern, responsive portfolio website showcasing my work and interests. Built with Next.js 14 and the App Router, featuring custom animations with Framer Motion and a unique glassmorphic design aesthetic.

The site includes an integrated Unsplash photo gallery, custom cursor interactions, and smooth page transitions. Every detail has been carefully crafted to provide an engaging user experience while maintaining excellent performance.`,
    hoverDetails: 'Modern Next.js portfolio with glassmorphic design, smooth animations, and custom interactions.',
    category: 'Web',
    generalTags: ['Design', 'Personal'],
    techTags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    status: 'in-progress',
    collaborators: 1,
    lastUpdated: 'Today',
    previewImage: '',
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
    size: 'medium',
    gridSpan: 'md:col-span-1',
  }
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
