'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'support.seakh@gmail.com', sub: 'We reply within 24 hours' },
  // { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 10am–6pm IST' },
  // { icon: MapPin, label: 'Studio', value: 'Bengaluru, Karnataka', sub: 'By appointment only' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Contact form:', data);
    setSubmitted(true);
    reset();
    toast.success('Message sent! We\'ll be in touch soon.', {
      style: { background: '#FAF7F2', color: '#2C2416', border: '1px solid #C8B6A6', borderRadius: '0' },
      iconTheme: { primary: '#C9A96E', secondary: '#FAF7F2' },
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      {/* Header */}
      <div className="bg-[#F5F0E6] border-b border-[#C8B6A6]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-5">Get in Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-[#2C2416] leading-tight">
            We&apos;d love to<br /><span className="italic text-[#C9A96E]">hear from you.</span>
          </motion.h1>
          <div className="gold-line mt-6" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#C8B6A6] text-sm mt-6 max-w-md mx-auto leading-relaxed">
            Questions about a kit, a corporate order, or just want to share your reading story? We&apos;re all ears.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Contact info */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="section-subtitle mb-4">Contact Information</p>
              <h2 className="font-serif text-2xl text-[#2C2416] font-bold mb-8">Let&apos;s start a conversation</h2>
              <div className="space-y-8 mb-12">
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[#F5F0E6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E]/10 transition-colors">
                      <Icon size={18} className="text-[#C9A96E]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mb-1">{label}</p>
                      <p className="text-sm font-medium text-[#2C2416]">{value}</p>
                      <p className="text-xs text-[#C8B6A6] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-[#F5F0E6] p-6 border-l-2 border-[#C9A96E]">
                <p className="font-serif text-sm text-[#5C4A37] italic leading-relaxed">
                  &ldquo;Every reader who reaches out becomes part of the SEAKH story. We read every message personally.&rdquo;
                </p>
                <p className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mt-3">— Akshit, Founder</p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/50 border border-[#C8B6A6]/20 p-8 lg:p-10"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-full flex items-center justify-center mb-6">
                    <Check size={24} className="text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2C2416] font-bold mb-3">Message Sent!</h3>
                  <p className="text-[#C8B6A6] text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline mt-8 text-xs">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Your Name *</label>
                      <input {...register('name')} id="contact-name" placeholder="Ananya Mehta" className="input-luxury" />
                      {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Email Address *</label>
                      <input {...register('email')} id="contact-email" type="email" placeholder="you@email.com" className="input-luxury" />
                      {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Subject *</label>
                    <input {...register('subject')} id="contact-subject" placeholder="Question about a kit, bulk order, etc." className="input-luxury" />
                    {errors.subject && <p className="text-red-400 text-[10px] mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Message *</label>
                    <textarea {...register('message')} id="contact-message" rows={5} placeholder="Tell us what's on your mind..." className="input-luxury resize-none" />
                    {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={14} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
