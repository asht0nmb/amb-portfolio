// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// interface Author {
//   id: string;
//   name: string;
// }

// interface Book {
//   id: string;
//   slug: string;
//   title: string;
//   cover: string;
//   pageCount?: number;
//   gradientColors?: string[];
//   authors: Author[];
// }

// interface ReadingData {
//   currentlyReading: Book | null;
//   justRead: Book[];
// }

// // Individual book card with subtle rotation
// function BookCard({ book, size = 'large' }: { book: Book; size?: 'large' | 'small' }) {
//   const isLarge = size === 'large';
  
//   return (
//     <motion.a
//       href={`https://literal.club/book/${book.slug}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block group"
//       whileHover={{ rotate: -2, y: -4 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     >
//       <div 
//         className={`relative ${isLarge ? 'w-32 h-48' : 'w-20 h-30'} rounded-md overflow-hidden shadow-md group-hover:shadow-lg transition-shadow`}
//         style={{
//           // Use gradient colors from Literal as fallback background
//           background: book.gradientColors?.length 
//             ? `linear-gradient(135deg, ${book.gradientColors[0]}, ${book.gradientColors[1] || book.gradientColors[0]})`
//             : '#e5e5e5'
//         }}
//       >
//         {book.cover && (
//           <Image
//             src={book.cover}
//             alt={book.title}
//             fill
//             className="object-cover"
//             sizes={isLarge ? "128px" : "80px"}
//           />
//         )}
//       </div>
//     </motion.a>
//   );
// }

// // Skeleton loader
// function BookSkeleton({ size = 'large' }: { size?: 'large' | 'small' }) {
//   const isLarge = size === 'large';
//   return (
//     <div 
//       className={`${isLarge ? 'w-32 h-48' : 'w-20 h-30'} rounded-md bg-gray-200 animate-pulse`} 
//     />
//   );
// }

// export default function ReadingSection() {
//   const [data, setData] = useState<ReadingData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchBooks() {
//       try {
//         const response = await fetch('/api/literal');
//         if (!response.ok) throw new Error('Failed to fetch');
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError('Could not load books');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBooks();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Section header */}
//       <div className="flex items-center gap-2 mb-6">
//         <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//         </svg>
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Reading</h3>
//       </div>

//       {/* Two column layout */}
//       <div className="grid grid-cols-2 gap-8">
        
//         {/* Currently Reading - Left Column */}
//         <div>
//           <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Now</p>
          
//           {loading ? (
//             <BookSkeleton size="large" />
//           ) : error || !data?.currentlyReading ? (
//             <div className="w-32 h-48 rounded-md bg-gray-100 flex items-center justify-center">
//               <span className="text-xs text-gray-400">—</span>
//             </div>
//           ) : (
//             <BookCard book={data.currentlyReading} size="large" />
//           )}
//         </div>

//         {/* Just Read - Right Column */}
//         <div>
//           <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Just Read</p>
          
//           <div className="flex gap-3">
//             {loading ? (
//               <>
//                 <BookSkeleton size="small" />
//                 <BookSkeleton size="small" />
//                 <BookSkeleton size="small" />
//               </>
//             ) : error || !data?.justRead?.length ? (
//               <div className="text-xs text-gray-400">—</div>
//             ) : (
//               data.justRead.map((book, i) => (
//                 <motion.div
//                   key={book.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   <BookCard book={book} size="small" />
//                 </motion.div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Literal link */}
//       <motion.a
//         href="https://literal.club/ashton" // Replace with your handle
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center gap-1.5 mt-5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
//         whileHover={{ x: 2 }}
//       >
//         View all on Literal
//         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//         </svg>
//       </motion.a>
//     </motion.div>
//   );
// }