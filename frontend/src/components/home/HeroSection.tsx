'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F0E6]">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&q=80')`,
          }}
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E6]/95 via-[#F5F0E6]/70 to-[#F5F0E6]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E6]/80 via-transparent to-transparent" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] top-[15%] w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-3xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[25%] bottom-[20%] w-48 h-48 bg-[#C8B6A6]/15 rounded-full blur-3xl hidden lg:block"
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[11px] tracking-[0.35em] text-[#C9A96E] uppercase font-medium">
              Luxury Reading Kits
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-[#2C2416] leading-[0.9] mb-8"
          >
            Seek
            <span className="block text-[#C9A96E] italic">Your</span>
            Escape.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-[#5C4A37] leading-relaxed mb-10 max-w-md font-light"
          >
            Curated book experience kits designed for those who believe reading is not just a habit — it&apos;s an art of living.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center gap-5"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-3 group"
              >
                Explore Kits
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#5C4A37] hover:text-[#C9A96E] transition-colors group"
              >
                Our Story
                <span className="w-0 group-hover:w-6 h-px bg-[#C9A96E] transition-all duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-10 mt-14 pt-10 border-t border-[#C8B6A6]/30"
          >
            {[
              { value: '6+', label: 'Curated Kits' },
              { value: '2K+', label: 'Happy Readers' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-[#2C2416]">{stat.value}</p>
                <p className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#C8B6A6]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A96E] to-transparent"
        />
      </motion.div>
    </section>
  );
}
