import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';

export const metadata: Metadata = {
  title: 'SEAKH — Seek Your Escape',
  description: 'Luxury reading experience kits for those who believe reading is a lifestyle.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
