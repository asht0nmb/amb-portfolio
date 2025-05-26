//TODO: delete this??


// 'use client';

// import { useEffect, useState } from "react";

// interface ProgressScrollIndicatorProps {
//   links?: Array<{ name: string; href: string }>;
// }

// export default function ProgressScrollIndicator({ links }: ProgressScrollIndicatorProps = {}) {
//   const [scrollTop, setScrollTop] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   const onScroll = () => {
//     // This will calculate how many pixels the page is vertically
//     const winScroll = document.documentElement.scrollTop;
//     // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
//     const height =
//       document.documentElement.scrollHeight -
//       document.documentElement.clientHeight;

//     // Calculate the scroll percentage
//     const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
//     setScrollTop(scrolled);
//   };

//   useEffect(() => {
//     if (!isMounted) return;
    
//     // Fires when the document view has been scrolled
//     window.addEventListener("scroll", onScroll);
    
//     // Initial calculation
//     onScroll();
    
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [isMounted]);

//   // render progress bar
//   return (
//     <div className="hidden md:block fixed left-1/2 top-4 -translate-x-1/2 z-50">
//       <div className="progress-container">
//         <div
//           className="progress-bar"
//           style={{ width: `${scrollTop}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }
