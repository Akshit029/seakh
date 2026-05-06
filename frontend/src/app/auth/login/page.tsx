'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

import { Suspense } from 'react';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, loading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!', {
        style: { background: '#FAF7F2', color: '#2C2416', border: '1px solid #C8B6A6', borderRadius: '0' },
        iconTheme: { primary: '#C9A96E', secondary: '#FAF7F2' },
      });
      router.push(redirect);
    } catch {
      toast.error('Invalid email or password', {
        style: { background: '#FAF7F2', color: '#2C2416', border: '1px solid #C8B6A6', borderRadius: '0' },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#2C2416] flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000&q=80')` }}
          />
        </div>
        <div className="relative z-10 text-center max-w-xs">
          <BookOpen size={48} className="text-[#C9A96E] mx-auto mb-8" strokeWidth={1} />
          <p className="font-serif text-4xl font-bold text-[#FAF7F2] leading-tight mb-4">
            Seek Your<br /><span className="italic text-[#C9A96E]">Escape.</span>
          </p>
          <div className="w-8 h-px bg-[#C9A96E] mx-auto mb-6" />
          <p className="text-[#C8B6A6] text-sm leading-relaxed">
            Sign in to access your curated reading kits, track your orders, and continue your journey.
          </p>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/40"
            />
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex flex-col mb-10">
            <span className="font-serif text-3xl font-bold tracking-[0.15em] text-[#2C2416]">SEAKH</span>
            <span className="text-[8px] tracking-[0.4em] text-[#C8B6A6] uppercase mt-0.5">Curated Reading Life</span>
          </Link>

          <h1 className="font-serif text-2xl md:text-3xl text-[#2C2416] font-bold mb-2">Welcome back</h1>
          <p className="text-sm text-[#C8B6A6] mb-8">Your reading sanctuary awaits.</p>

          <form onSubmit={handleSubmit} id="login-form" className="space-y-5">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Email Address</label>
              <input
                id="login-email"
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
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="input-luxury pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8B6A6] hover:text-[#5C4A37] transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[11px] text-[#C9A96E] hover:underline tracking-wider">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-60 group"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#C8B6A6]/30 text-center">
            <p className="text-sm text-[#C8B6A6]">
              New to SEAKH?{' '}
              <Link href="/auth/register" className="text-[#C9A96E] hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

