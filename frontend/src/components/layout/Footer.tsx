'use client';

import Link from 'next/link';
import { Globe, AtSign, Share2, Mail } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Kits', href: '/products' },
    { label: 'Classic Reads', href: '/products?category=Classic+Reads' },
    { label: 'Fiction Escapes', href: '/products?category=Fiction+Escapes' },
    { label: 'Gift Sets', href: '/products?category=Gift+Sets' },
    { label: 'Limited Edition', href: '/products?category=Limited+Edition' },
  ],
  Company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Curation Process', href: '/about#curation' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Press', href: '/about#press' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#2C2416] text-[#C8B6A6]">
      {/* Top band */}
      <div className="border-b border-[#5C4A37]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand col */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="font-serif text-3xl font-bold tracking-[0.15em] text-[#FAF7F2]">SEAKH</span>
                <p className="text-[9px] tracking-[0.4em] text-[#C8B6A6] uppercase mt-1">Curated Reading Life</p>
              </Link>
              <p className="text-sm leading-relaxed text-[#C8B6A6]/80 max-w-xs mb-8">
                We believe reading is not just an activity — it&apos;s a lifestyle. Every SEAKH kit is a carefully crafted sanctuary for the mind.
              </p>
              {/* Newsletter */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#C9A96E] mb-3">Stay in the loop</p>
                <div className="flex gap-0">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-[#3D3122] border border-[#5C4A37] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#5C4A37] focus:outline-none focus:border-[#C9A96E] transition-colors"
                  />
                  <button className="bg-[#C9A96E] px-5 py-2.5 text-[#2C2416] text-xs font-bold tracking-widest uppercase hover:bg-[#b8944f] transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-[10px] tracking-widest uppercase text-[#C9A96E] mb-5 font-medium">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#C8B6A6]/70 hover:text-[#FAF7F2] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#5C4A37]">
          © {new Date().getFullYear()} SEAKH. All rights reserved. Made with love for readers.
        </p>
        <div className="flex items-center gap-5">
          {[Globe, AtSign, Share2, Mail].map((Icon, i) => (
            <button
              key={i}
              className="text-[#5C4A37] hover:text-[#C9A96E] transition-colors duration-200"
              aria-label="Social link"
            >
              <Icon size={16} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
