'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { toggleCart, getItemCount } = useCartStore();
  const { user } = useAuthStore();
  const itemCount = getItemCount();

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_1px_20px_rgba(44,36,22,0.08)] border-b border-[#C8B6A6]/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group flex flex-col items-start">
              <span className="font-serif text-2xl font-bold tracking-[0.15em] text-[#2C2416] group-hover:text-[#C9A96E] transition-colors duration-300">
                SEAKH
              </span>
              <span className="text-[8px] tracking-[0.4em] text-[#C8B6A6] uppercase font-medium -mt-1">
                Curated Reading Life
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs tracking-widest uppercase font-medium transition-colors duration-300 group ${
                    pathname === link.href ? 'text-[#C9A96E]' : 'text-[#5C4A37] hover:text-[#C9A96E]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <button
                aria-label="Search"
                className="text-[#5C4A37] hover:text-[#C9A96E] transition-colors duration-200"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              <Link
                href={user ? '/profile' : '/auth/login'}
                aria-label="Account"
                className="text-[#5C4A37] hover:text-[#C9A96E] transition-colors duration-200"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>

              <button
                id="cart-button"
                onClick={toggleCart}
                aria-label="Cart"
                className="relative text-[#5C4A37] hover:text-[#C9A96E] transition-colors duration-200"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {isMounted && itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#C9A96E] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                className="md:hidden text-[#5C4A37] hover:text-[#C9A96E] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#FAF7F2] z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-[#C8B6A6]/30">
                <span className="font-serif text-xl font-bold tracking-widest text-[#2C2416]">SEAKH</span>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={20} className="text-[#5C4A37]" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-8 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                      pathname === link.href ? 'text-[#C9A96E]' : 'text-[#5C4A37]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto px-6 py-8 border-t border-[#C8B6A6]/30">
                <p className="text-[10px] tracking-widest text-[#C8B6A6] uppercase">Seek your escape</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
