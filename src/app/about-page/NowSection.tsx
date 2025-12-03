// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import ReadingSection from './now/Reading'


// // Types for each section

// interface Track {
//   name: string;
//   artist: string;
//   albumArt: string;
//   link?: string;
// }

// interface Activity {
//   type: 'run' | 'ride' | 'hike';
//   name: string;
//   distance: string;
//   time: string;
//   date: string;
//   mapImage?: string;
// }

// interface Purchase {
//   merchant: string;
//   icon: string;
//   date: string;
//   category?: string;
// }

// // Mock data - replace with API calls later

// const topTracks: Track[] = [
//   { name: 'Kids Turned Out Fine', artist: 'A$AP Rocky', albumArt: '/photos/now/tracks/1.jpg' },
//   { name: 'Thank You God', artist: 'Darondo', albumArt: '/photos/now/tracks/2.jpg' },
//   { name: 'Baby!', artist: 'Dijon', albumArt: '/photos/now/tracks/3.jpg' },
//   { name: 'YUKON', artist: 'Justin Bieber', albumArt: '/photos/now/tracks/4.jpg' },
//   { name: 'Stay Schemin', artist: 'Rick Ross', albumArt: '/photos/now/tracks/5.jpg' },
// ];

// const recentActivities: Activity[] = [
//   { type: 'run', name: 'Morning Loop', distance: '5.2 mi', time: '42:15', date: 'Today' },
//   { type: 'run', name: 'Seattle Half Marathon', distance: '13.1 mi', time: '1:52:30', date: 'Nov 24' },
//   { type: 'hike', name: 'Rattlesnake Ledge', distance: '4.0 mi', time: '1:45:00', date: 'Nov 20' },
// ];

// const recentPurchases: Purchase[] = [
//   { merchant: 'Spotify Premium', icon: '/photos/now/merchants/spotify.png', date: 'Dec 1', category: 'Entertainment' },
//   { merchant: 'Blue Bottle Coffee', icon: '/photos/now/merchants/coffee.png', date: 'Nov 30', category: 'Food & Drink' },
//   { merchant: 'REI Co-op', icon: '/photos/now/merchants/rei.png', date: 'Nov 28', category: 'Shopping' },
//   { merchant: 'Kindle Store', icon: '/photos/now/merchants/kindle.png', date: 'Nov 25', category: 'Books' },
//   { merchant: 'Strava Summit', icon: '/photos/now/merchants/strava.png', date: 'Nov 15', category: 'Fitness' },
// ];

// // Activity type icons
// const activityIcons = {
//   run: (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//     </svg>
//   ),
//   ride: (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//       <circle cx="5.5" cy="17.5" r="3.5" />
//       <circle cx="18.5" cy="17.5" r="3.5" />
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
//     </svg>
//   ),
//   hike: (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l6-6m0 0l4 4m-4-4l4-4m0 0l6 6M3 9l6 6" />
//     </svg>
//   ),
// };

// // Section wrapper component
// function NowCard({ 
//   title, 
//   icon, 
//   children,
//   className = ''
// }: { 
//   title: string; 
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ duration: 0.5 }}
//       className={`${className}`}
//     >
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-gray-400">{icon}</span>
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
//       </div>
//       {children}
//     </motion.div>
//   );
// }

// export default function NowSection() {
//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">Now</h2>
//           <p className="text-gray-500">What I've been up to lately</p>
//         </motion.div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
//           {/* Books */}
//           <ReadingSection />

//           {/* Music */}
//           <NowCard
//             title="Listening"
//             icon={
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
//               </svg>
//             }
//           >
//             <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Top tracks this month</p>
//             <div className="space-y-3">
//               {topTracks.map((track, i) => (
//                 <motion.div 
//                   key={i}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3, delay: i * 0.05 }}
//                   className="flex items-center gap-3 group cursor-pointer"
//                 >
//                   <span className="text-xs text-gray-300 w-4 text-right">{i + 1}</span>
//                   <div className="w-10 h-10 relative flex-shrink-0 rounded overflow-hidden shadow-sm">
//                     <Image src={track.albumArt} alt={track.name} fill className="object-cover" />
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm text-gray-900 truncate group-hover:text-gray-600 transition-colors">{track.name}</p>
//                     <p className="text-xs text-gray-400 truncate">{track.artist}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </NowCard>

//           {/* Strava */}
//           <NowCard
//             title="Moving"
//             icon={
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             }
//           >
//             <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Recent activities</p>
//             <div className="space-y-4">
//               {recentActivities.map((activity, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3, delay: i * 0.05 }}
//                   className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
//                       {activityIcons[activity.type]}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{activity.name}</p>
//                       <p className="text-xs text-gray-400">{activity.date}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-900">{activity.distance}</p>
//                     <p className="text-xs text-gray-400">{activity.time}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
            
//             {/* Strava Link */}
//             <motion.a
//               href="https://strava.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 mt-4 text-sm text-orange-500 hover:text-orange-600 transition-colors"
//               whileHover={{ x: 4 }}
//             >
//               View on Strava
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//               </svg>
//             </motion.a>
//           </NowCard>

//           {/* Purchases */}
//           <NowCard
//             title="Recent Purchases"
//             icon={
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//               </svg>
//             }
//           >
//             <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Last 5 transactions</p>
//             <div className="space-y-3">
//               {recentPurchases.map((purchase, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3, delay: i * 0.05 }}
//                   className="flex items-center gap-3"
//                 >
//                   <div className="w-10 h-10 relative flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
//                     <Image 
//                       src={purchase.icon} 
//                       alt={purchase.merchant} 
//                       fill 
//                       className="object-contain p-1.5" 
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-gray-900 truncate">{purchase.merchant}</p>
//                     <p className="text-xs text-gray-400">{purchase.category}</p>
//                   </div>
//                   <p className="text-xs text-gray-400 flex-shrink-0">{purchase.date}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </NowCard>

//         </div>
//       </div>
//     </section>
//   );
// }