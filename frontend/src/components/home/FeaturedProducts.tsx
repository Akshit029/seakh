'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/lib/api';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ featured: 'true', limit: 4 })
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Curated Collections
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Featured Kits
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="gold-line mt-5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[#C8B6A6] text-sm mt-5 max-w-md mx-auto leading-relaxed"
          >
            Each kit is a portal into a different world — carefully assembled to elevate every reading moment.
          </motion.p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F5F0E6] aspect-[4/5]" />
                <div className="pt-4 space-y-2">
                  <div className="h-2 bg-[#F5F0E6] w-20 rounded" />
                  <div className="h-4 bg-[#F5F0E6] rounded" />
                  <div className="h-4 bg-[#F5F0E6] w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product._id || i} product={product} index={i} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline flex items-center gap-3 mx-auto group"
            >
              View All Kits
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Fallback when API is offline
const fallbackProducts = [
  { _id: '1', name: 'The Classic Reader Kit', slug: 'classic-reader-kit', price: 1499, originalPrice: 1999, category: 'Classic Reads', thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', rating: 4.8, numReviews: 24, shortDescription: 'Timeless classics meet luxury reading essentials.', isNewArrival: false, stock: 50 },
  { _id: '2', name: 'Midnight Fiction Escape', slug: 'midnight-fiction-escape', price: 1799, originalPrice: 2299, category: 'Fiction Escapes', thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800', rating: 4.9, numReviews: 18, shortDescription: 'Your ultimate late-night reading sanctuary.', isNewArrival: true, stock: 35 },
  { _id: '3', name: 'The Growth Seeker Kit', slug: 'growth-seeker-kit', price: 1999, originalPrice: 2599, category: 'Self-Growth', thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', rating: 4.7, numReviews: 31, shortDescription: 'Nourish your mind, elevate your life.', isNewArrival: false, stock: 40 },
  { _id: '4', name: 'Golden Hour Gift Set', slug: 'golden-hour-gift-set', price: 2999, originalPrice: 3999, category: 'Gift Sets', thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800', rating: 5.0, numReviews: 12, shortDescription: 'Pure luxury, beautifully wrapped.', isNewArrival: true, stock: 20 },
];
