'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const values = [
  { icon: '📚', title: 'Curated Reads', desc: 'Every book is handpicked by our literary team for meaning, beauty, and depth.' },
  { icon: '🕯️', title: 'Sensory Experience', desc: 'We pair every read with scents, textures, and flavors that deepen immersion.' },
  { icon: '🌿', title: 'Conscious Living', desc: 'All packaging is recycled or reusable. Beauty without compromise.' },
  { icon: '✨', title: 'Premium Quality', desc: 'Only the finest accessories make it into a SEAKH kit. We settle for nothing less.' },
];

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="py-28 bg-[#F5F0E6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main story block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-28">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-subtitle mb-5"
            >
              The SEAKH Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-bold text-[#2C2416] leading-tight mb-6"
            >
              Reading is not
              <span className="block text-[#C9A96E] italic">just a hobby.</span>
              It&apos;s a way of life.
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="gold-line-left mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[#5C4A37] leading-relaxed text-base mb-5"
            >
              SEAKH was born from a simple belief: that the ritual of reading deserves to be as beautiful as the stories within the pages. We saw people rushing through books — but we knew the real magic happens when you slow down.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-[#5C4A37] leading-relaxed text-base mb-10"
            >
              Each kit is an invitation — to pause, to breathe, to seek your escape. From the scent of the candle to the weight of the bookmark, every element is chosen to make your reading hour feel sacred.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/about">
                <button className="btn-dark flex items-center gap-3 group">
                  Read Our Full Story
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Image with parallax */}
          <motion.div style={{ y: imageY }} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"
                alt="SEAKH brand story — luxury reading lifestyle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2416]/30 to-transparent" />
            </div>
            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-[#FAF7F2] p-6 shadow-card max-w-xs border-l-2 border-[#C9A96E]"
            >
              <p className="font-serif text-sm text-[#2C2416] italic leading-relaxed">
                &ldquo;A reader lives a thousand lives before he dies. The man who never reads lives only one.&rdquo;
              </p>
              <p className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mt-3">— George R.R. Martin</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="border-t border-[#C8B6A6]/30 pt-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle text-center mb-12"
          >
            What We Stand For
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {val.icon}
                </motion.div>
                <h4 className="font-serif text-base font-semibold text-[#2C2416] mb-2">{val.title}</h4>
                <p className="text-xs text-[#C8B6A6] leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
