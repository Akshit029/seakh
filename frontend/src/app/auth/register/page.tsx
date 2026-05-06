'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, BookOpen, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

const perks = ['Access to exclusive kit drops', 'Order tracking & history', 'Curated reading recommendations', 'Member-only discounts'];

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { register, loading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try {
      await register(name, email, password);
      toast.success('Welcome to SEAKH!', {
        style: { background: '#FAF7F2', color: '#2C2416', border: '1px solid #C8B6A6', borderRadius: '0' },
        iconTheme: { primary: '#C9A96E', secondary: '#FAF7F2' },
      });
      router.push('/');
    } catch {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-flex flex-col mb-10">
            <span className="font-serif text-3xl font-bold tracking-[0.15em] text-[#2C2416]">SEAKH</span>
            <span className="text-[8px] tracking-[0.4em] text-[#C8B6A6] uppercase mt-0.5">Curated Reading Life</span>
          </Link>

          <h1 className="font-serif text-2xl md:text-3xl text-[#2C2416] font-bold mb-2">Join SEAKH</h1>
          <p className="text-sm text-[#C8B6A6] mb-8">Begin your luxury reading journey today.</p>

          <form onSubmit={handleSubmit} id="register-form" className="space-y-5">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Your Name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Mehta"
                required
                className="input-luxury"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Email Address</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="input-luxury"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="input-luxury pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8B6A6] hover:text-[#5C4A37]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="flex gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-0.5 flex-1 rounded transition-colors duration-300 ${password.length > i * 2 ? i < 2 ? 'bg-red-300' : i < 3 ? 'bg-[#C9A96E]' : 'bg-green-400' : 'bg-[#C8B6A6]/30'}`} />
                  ))}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-60 group"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </motion.button>

            <p className="text-[10px] text-[#C8B6A6] text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <div className="mt-8 pt-8 border-t border-[#C8B6A6]/30 text-center">
            <p className="text-sm text-[#C8B6A6]">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#C9A96E] hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — perks */}
      <div className="hidden lg:flex lg:w-2/5 relative bg-[#2C2416] flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1000&q=80')` }} />
        </div>
        <div className="relative z-10 w-full max-w-xs">
          <BookOpen size={40} className="text-[#C9A96E] mb-6" strokeWidth={1} />
          <h2 className="font-serif text-3xl font-bold text-[#FAF7F2] mb-3">
            Member <span className="italic text-[#C9A96E]">Benefits</span>
          </h2>
          <p className="text-[#C8B6A6] text-sm mb-8">Join 2,000+ readers who have made SEAKH part of their lifestyle.</p>
          <div className="space-y-4">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#C9A96E]" />
                </div>
                <span className="text-sm text-[#C8B6A6]">{perk}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-[#C9A96E]/10 border border-[#C9A96E]/20">
            <p className="font-serif text-sm text-[#FAF7F2] italic">
              &ldquo;SEAKH changed how I read. Now every session feels like a ceremony.&rdquo;
            </p>
            <p className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mt-3">— Rahul S., Member</p>
          </div>
        </div>
      </div>
    </div>
  );
}
