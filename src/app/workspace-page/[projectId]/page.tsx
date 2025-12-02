import UnderConstruction from '@/components/features/UnderConstruction';

export default function WorkspacePage() {
  return <UnderConstruction />;
} 

// 'use client';

// import { use } from 'react';
// import { notFound, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { getProjectById } from '@/data/projects';
// import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

// interface ProjectDetailPageProps {
//   params: Promise<{
//     projectId: string;
//   }>;
// }

// export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
//   const router = useRouter();
//   const { projectId } = use(params);
//   const project = getProjectById(projectId);

//   if (!project) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
//       {/* Back Button - Sticky */}
//       <motion.button
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         onClick={() => router.back()}
//         className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2
//           bg-white/80 backdrop-blur-md rounded-full shadow-lg
//           hover:bg-white transition-all duration-200 hover:shadow-xl
//           text-sm font-medium text-gray-700 hover:text-gray-900"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back
//       </motion.button>

//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
//         className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden"
//       >
//         {project.previewImage ? (
//           <Image
//             src={project.previewImage}
//             alt={project.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-gray-100" />
//         )}

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

//         {/* Hero Content */}
//         <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   project.status === 'in-progress'
//                     ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
//                     : 'bg-green-400 shadow-lg shadow-green-400/50'
//                 }`}
//               />
//               <span className="text-sm font-medium text-white/90">
//                 {project.status === 'in-progress' ? 'In Progress' : 'Shipped'}
//               </span>
//               <span className="text-white/50">•</span>
//               <span className="text-sm text-white/70">
//                 Updated {project.lastUpdated}
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
//               {project.title}
//             </h1>

//             <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
//               {project.fullDescription.split('\n\n')[0]}
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Content Section */}
//       <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
//         {/* Tags */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="flex flex-wrap gap-3 mb-16"
//         >
//           {project.generalTags.map((tag, index) => (
//             <span
//               key={`general-${index}`}
//               className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
//             >
//               {tag}
//             </span>
//           ))}
//           {project.techTags.map((tag, index) => (
//             <span
//               key={`tech-${index}`}
//               className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
//             >
//               {tag}
//             </span>
//           ))}
//         </motion.div>

//         {/* Full Description */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="prose prose-lg max-w-none mb-20"
//         >
//           <p className="text-gray-700 leading-relaxed text-lg">
//             {project.fullDescription}
//           </p>
//         </motion.div>

//         {/* Key Features */}
//         {project.features && project.features.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="mb-20"
//           >
//             <h2 className="text-3xl font-semibold mb-8 text-gray-900">Key Features</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {project.features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.7 + index * 0.05 }}
//                   className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100
//                     hover:border-gray-200 transition-colors"
//                 >
//                   <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
//                   <span className="text-gray-700">{feature}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Gallery */}
//         {project.images && project.images.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="mb-20"
//           >
//             <h2 className="text-3xl font-semibold mb-8 text-gray-900">Gallery</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {project.images.map((image, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.8 + index * 0.1 }}
//                   className="relative w-full h-80 rounded-2xl overflow-hidden bg-gray-100
//                     shadow-lg hover:shadow-2xl transition-shadow"
//                 >
//                   <Image
//                     src={image}
//                     alt={`${project.title} screenshot ${index + 1}`}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Action Links */}
//         {project.links && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="flex flex-wrap gap-4 pt-8"
//           >
//             {project.links.live && (
//               <a
//                 href={project.links.live}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full
//                   font-medium hover:bg-blue-700 transition-all duration-200
//                   hover:scale-105 hover:shadow-lg shadow-blue-600/20"
//               >
//                 <ExternalLink className="w-5 h-5" />
//                 View Live Demo
//               </a>
//             )}
//             {project.links.github && (
//               <a
//                 href={project.links.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full
//                   font-medium hover:bg-gray-800 transition-all duration-200
//                   hover:scale-105 hover:shadow-lg"
//               >
//                 <Github className="w-5 h-5" />
//                 View on GitHub
//               </a>
//             )}
//             {project.links.caseStudy && (
//               <a
//                 href={project.links.caseStudy}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full
//                   font-medium hover:bg-gray-50 transition-all duration-200
//                   hover:scale-105 hover:shadow-lg border border-gray-200"
//               >
//                 Read Case Study
//               </a>
//             )}
//           </motion.div>
//         )}
//       </div>

//       {/* Bottom Spacing */}
//       <div className="h-32" />
//     </div>
//   );
// }
