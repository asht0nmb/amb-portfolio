'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
        >
          {/* Photo - Left side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-80 flex-shrink-0"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/photos/selfie.png"
                alt="Handsome guy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
            </div>
          </motion.div>

          {/* Content - Right side */}
          <div className="flex-1 flex flex-col justify-between min-h-[400px] md:min-h-[480px]">
            {/* Header + Paragraph */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6"
              >
                About
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  {/* Your paragraph here */}
                  &ldquo;A jack of all trades is a master of none, but better still than a master of one.&rdquo;
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {/* Second paragraph if needed */}
                  Currently studying Informatics, Finance, and Mathematics at the University of Washington, 
                  building things that I think matter, and always looking for the another adventure.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {/* Your paragraph here */}
                  
                   
                </p>
              </motion.div>
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              {/* Signature placeholder - replace src with your actual signature image */}
              <div className="h-16 w-48 relative opacity-80">
                {/* Option 1: Image signature */}
                {/* <Image
                  src="/images/signature.png"
                  alt="Signature"
                  fill
                  className="object-contain object-left"
                /> */}
                
                {/* Option 2: Placeholder until you have signature */}
                <div className="h-full w-full flex items-center">
                  <span className="text-2xl font-handwriting text-gray-400 italic">
                    — AMB
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}