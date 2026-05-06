'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2021', title: 'The Spark', desc: 'Founded in a small Bengaluru apartment during lockdown — one reader\'s desperate need for a meaningful ritual.' },
  { year: '2022', title: 'First Kit Ships', desc: 'The Classic Reader Kit launches with just 50 units. Sells out in 48 hours. Readers were hungry for this.' },
  { year: '2023', title: 'Growing Community', desc: 'Over 2,000 kits shipped. SEAKH readers from across India share their reading nooks and rituals online.' },
  { year: '2024', title: 'Limited Editions', desc: 'Launch of the Collector\'s Series — signed first editions paired with bespoke luxury accessories.' },
  { year: '2025', title: 'What\'s Next', desc: 'A subscription model, monthly curation, and exclusive partnerships with independent publishers.' },
];

const team = [
  { name: 'Aarav Kapoor', role: 'Founder & Chief Curator', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', bio: 'Former literature professor. Believes every book deserves a ceremony.' },
  { name: 'Meera Iyer', role: 'Head of Curation & Partnerships', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', bio: 'Bookshop owner turned curator. She has read over 800 books and counting.' },
  { name: 'Rohan Das', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', bio: 'Designer obsessed with the intersection of aesthetics and meaningful living.' },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      {/* Hero */}
      <section className="relative py-28 bg-[#F5F0E6] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=1800&q=60" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E6]/80 to-[#F5F0E6]" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-5">The SEAKH Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C2416] leading-tight mb-6">
            Making Reading<br />
            <span className="italic text-[#C9A96E]">a Lifestyle</span>
          </motion.h1>
          <div className="gold-line mt-4 mb-8" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#5C4A37] text-lg leading-relaxed max-w-2xl mx-auto">
            SEAKH started with one question: Why do we treat reading as a chore when it can be the most beautiful part of our day?
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-subtitle mb-5">Our Mission</p>
              <h2 className="font-serif text-4xl font-bold text-[#2C2416] leading-tight mb-6">
                We don&apos;t just sell books.<br />
                <span className="italic text-[#C9A96E]">We sell an experience.</span>
              </h2>
              <div className="gold-line-left mb-8" />
              <p className="text-[#5C4A37] text-base leading-relaxed mb-5">
                At SEAKH, we believe the ritual matters as much as the reading. The soft flicker of a candle, the warmth of a handmade mug, the gentle weight of a leather bookmark — these are not extras. They are the experience.
              </p>
              <p className="text-[#5C4A37] text-base leading-relaxed mb-8">
                We curate each kit like a love letter — to literature, to slowness, to the beautiful act of losing yourself in a world made of words.
              </p>
              <Link href="/products">
                <button className="btn-primary flex items-center gap-3 group">
                  Shop the Kits <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="relative aspect-[4/5] overflow-hidden shadow-luxury">
                <Image src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80" alt="SEAKH reading lifestyle" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#F5F0E6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle mb-4">Our Journey</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">Chapter by Chapter</motion.h2>
            <div className="gold-line mt-5" />
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-[#C8B6A6]/40 hidden md:block" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 md:gap-12 items-start"
                >
                  <div className="flex-shrink-0 w-14 text-right">
                    <span className="font-serif text-[#C9A96E] font-bold text-sm">{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 hidden md:block">
                    <div className="w-3 h-3 rounded-full bg-[#C9A96E] mt-0.5 relative z-10" />
                  </div>
                  <div className="pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#2C2416] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#5C4A37] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle mb-4">The People Behind SEAKH</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">Meet the Curators</motion.h2>
            <div className="gold-line mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative w-40 h-40 mx-auto mb-5 overflow-hidden">
                  <Image src={member.img} alt={member.name} fill className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C2416] mb-1">{member.name}</h3>
                <p className="text-[10px] tracking-widest uppercase text-[#C9A96E] mb-3">{member.role}</p>
                <p className="text-sm text-[#C8B6A6] leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 bg-[#2C2416] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] mb-5">Our Commitment</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl text-[#FAF7F2] font-bold mb-6">
            Beautiful, <span className="italic text-[#C9A96E]">sustainably.</span>
          </motion.h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-8" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#C8B6A6]/80 leading-relaxed text-base mb-8">
            Every SEAKH box is made from recycled kraft board. Our candles use natural soy wax. Our packaging materials are all biodegradable. We believe you shouldn&apos;t have to choose between luxury and conscience.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex justify-center gap-10 text-center">
            {['100% Recycled Packaging', 'Soy & Natural Wax Only', 'Carbon-Neutral Shipping'].map((point) => (
              <div key={point}>
                <p className="text-[10px] tracking-widest uppercase text-[#C9A96E] leading-relaxed max-w-[100px] mx-auto">{point}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
