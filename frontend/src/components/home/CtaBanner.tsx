'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=1800&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#FAF7F2]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-subtitle mb-5"
        >
          Begin Your Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-6xl font-bold text-[#2C2416] leading-tight mb-6"
        >
          Your next favourite
          <span className="block italic text-[#C9A96E]">read is waiting.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-[#5C4A37] text-base max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Every SEAKH kit is an act of self-care. Give yourself — or someone you love — the gift of a truly beautiful reading experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-3 group"
            >
              Shop All Kits <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/products?category=Gift+Sets">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
            >
              Gift a Kit
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
