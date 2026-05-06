import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: { default: 'SEAKH — Curated Reading Life', template: '%s | SEAKH' },
  description: 'Luxury reading experience kits for those who believe reading is a lifestyle. Curated books, premium accessories, and artisanal blends — all in one beautiful kit.',
  keywords: ['SEAKH', 'luxury reading kit', 'book gift set', 'curated reading', 'premium books India', 'reading lifestyle'],
  authors: [{ name: 'SEAKH' }],
  openGraph: {
    title: 'SEAKH — Seek Your Escape',
    description: 'Curated luxury reading experience kits. Seek your escape.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport = {
  themeColor: '#F5F0E6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#2C2416] antialiased">
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
