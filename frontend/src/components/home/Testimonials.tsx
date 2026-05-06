'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Ananya Mehta', location: 'Mumbai', rating: 5, text: 'I gifted the Golden Hour Set to my sister and she cried. The packaging alone was art. Every detail spoke of genuine care and luxury. SEAKH has redefined what gifting means.', kit: 'Golden Hour Gift Set', avatar: 'A' },
  { id: 2, name: 'Rahul Sharma', location: 'Bangalore', rating: 5, text: 'The Midnight Fiction Escape kit transformed my boring weeknights into something I actually look forward to. The chamomile tea + silk eye mask combo after a chapter is pure bliss.', kit: 'Midnight Fiction Escape', avatar: 'R' },
  { id: 3, name: 'Priya Nair', location: 'Delhi', rating: 5, text: 'As someone who reads 40+ books a year, I thought I\'d seen it all. SEAKH proved me wrong. The curation is thoughtful, the accessories are premium, and the whole experience feels truly indulgent.', kit: 'The Classic Reader Kit', avatar: 'P' },
  { id: 4, name: 'Karthik Iyer', location: 'Chennai', rating: 5, text: 'Got the Growth Seeker Kit during a low phase in life. The journal, the affirmation cards, the book — it was like someone had designed this specifically for healing. Life-changing, genuinely.', kit: 'The Growth Seeker Kit', avatar: 'K' },
  { id: 5, name: 'Simran Kaur', location: 'Pune', rating: 5, text: 'Every unboxing is an event in itself. The care with which each element is placed, the scent when you open it — I\'ve ordered three times and the experience only gets better.', kit: 'Weekend Wanderer', avatar: 'S' },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setActive((prev) => (prev + newDir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section className="py-28 bg-[#2C2416] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-medium mb-4"
          >
            What Our Readers Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-[#FAF7F2] font-bold"
          >
            Stories of Escape
          </motion.h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-5" />
        </div>

        {/* Testimonial card */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-3xl mx-auto text-center"
            >
              {/* Quote icon */}
              <Quote className="text-[#C9A96E]/30 w-16 h-16 mx-auto mb-6" strokeWidth={1} />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="font-serif text-xl md:text-2xl text-[#FAF7F2]/90 leading-relaxed italic mb-8">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-[#C9A96E]">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-[#FAF7F2] text-sm">{t.name}</p>
                  <p className="text-[10px] text-[#C8B6A6] tracking-widest uppercase mt-0.5">{t.location} · {t.kit}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 border border-[#5C4A37] flex items-center justify-center text-[#C8B6A6] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`transition-all duration-300 ${i === active ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 rounded-full bg-[#5C4A37] hover:bg-[#C8B6A6]'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 border border-[#5C4A37] flex items-center justify-center text-[#C8B6A6] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
