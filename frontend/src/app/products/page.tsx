'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/lib/api';

const CATEGORIES = ['All', 'Classic Reads', 'Fiction Escapes', 'Self-Growth', 'Gift Sets', 'Limited Edition'];
const SORT_OPTIONS = [
  { label: 'Featured', value: '' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 10000 },
  { label: 'Under ₹1,500', min: 0, max: 1500 },
  { label: '₹1,500 – ₹2,500', min: 1500, max: 2500 },
  { label: '₹2,500 – ₹4,000', min: 2500, max: 4000 },
  { label: 'Above ₹4,000', min: 4000, max: 10000 },
];

const fallbackProducts = [
  { _id: '1', name: 'The Classic Reader Kit', slug: 'classic-reader-kit', price: 1499, originalPrice: 1999, category: 'Classic Reads', thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', rating: 4.8, numReviews: 24, shortDescription: 'Timeless classics meet luxury reading essentials.', isNewArrival: false, stock: 50 },
  { _id: '2', name: 'Midnight Fiction Escape', slug: 'midnight-fiction-escape', price: 1799, originalPrice: 2299, category: 'Fiction Escapes', thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800', rating: 4.9, numReviews: 18, shortDescription: 'Your ultimate late-night reading sanctuary.', isNewArrival: true, stock: 35 },
  { _id: '3', name: 'The Growth Seeker Kit', slug: 'growth-seeker-kit', price: 1999, originalPrice: 2599, category: 'Self-Growth', thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', rating: 4.7, numReviews: 31, shortDescription: 'Nourish your mind, elevate your life.', isNewArrival: false, stock: 40 },
  { _id: '4', name: 'Golden Hour Gift Set', slug: 'golden-hour-gift-set', price: 2999, originalPrice: 3999, category: 'Gift Sets', thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800', rating: 5.0, numReviews: 12, shortDescription: 'Pure luxury, beautifully wrapped.', isNewArrival: true, stock: 20 },
  { _id: '5', name: 'The Weekend Wanderer', slug: 'weekend-wanderer-kit', price: 1299, originalPrice: 1699, category: 'Fiction Escapes', thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800', rating: 4.6, numReviews: 44, shortDescription: 'Slow down, savor every page.', isNewArrival: false, stock: 60 },
  { _id: '6', name: "Collector's Edition: First Editions", slug: 'collectors-edition-first-editions', price: 5999, originalPrice: 7999, category: 'Limited Edition', thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', rating: 5.0, numReviews: 7, shortDescription: 'Ultra-rare. Collector\'s pride.', isNewArrival: true, stock: 50 },
];

import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [sortOpen, setSortOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const priceMin = searchParams.get('minPrice') || '';
  const priceMax = searchParams.get('maxPrice') || '';
  const page = Number(searchParams.get('page') || 1);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit: 12 };
      if (category) params.category = category;
      if (sort) params.sort = sort;
      if (priceMin) params.minPrice = priceMin;
      if (priceMax) params.maxPrice = priceMax;
      const data = await fetchProducts(params);
      setProducts(data.products?.length ? data.products : fallbackProducts);
      setTotal(data.total || fallbackProducts.length);
    } catch {
      setProducts(fallbackProducts);
      setTotal(fallbackProducts.length);
    } finally {
      setLoading(false);
    }
  }, [category, sort, priceMin, priceMax, page]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => router.push('/products');

  const activeSort = SORT_OPTIONS.find((o) => o.value === sort) || SORT_OPTIONS[0];
  const hasFilters = !!(category || sort || priceMin);

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      {/* Page header */}
      <div className="bg-[#F5F0E6] border-b border-[#C8B6A6]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">
            Our Collection
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
            {category || 'All Reading Kits'}
          </motion.h1>
          <div className="gold-line-left mt-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#C8B6A6] text-sm mt-4 max-w-lg">
            {total} curated kit{total !== 1 ? 's' : ''} — each a portal to a different world.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const active = cat === 'All' ? !category : category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => updateParam('category', cat === 'All' ? '' : cat)}
                  className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                    active
                      ? 'bg-[#2C2416] text-[#FAF7F2] border-[#2C2416]'
                      : 'border-[#C8B6A6] text-[#5C4A37] hover:border-[#C9A96E] hover:text-[#C9A96E]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-[11px] text-[#C8B6A6] hover:text-red-400 tracking-wider uppercase transition-colors">
                <X size={12} /> Clear
              </button>
            )}

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-[#C8B6A6] px-4 py-2 text-[11px] text-[#5C4A37] tracking-wider uppercase hover:border-[#C9A96E] transition-colors"
              >
                {activeSort.label} <ChevronDown size={12} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-1 bg-[#FAF7F2] border border-[#C8B6A6]/60 shadow-card z-20 min-w-[180px]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { updateParam('sort', opt.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider uppercase hover:bg-[#F5F0E6] transition-colors ${sort === opt.value ? 'text-[#C9A96E] font-medium' : 'text-[#5C4A37]'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price filter */}
            <div className="relative">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 border border-[#C8B6A6] px-4 py-2 text-[11px] text-[#5C4A37] tracking-wider uppercase hover:border-[#C9A96E] transition-colors"
              >
                <SlidersHorizontal size={12} /> Price
              </button>
              <AnimatePresence>
                {filtersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-1 bg-[#FAF7F2] border border-[#C8B6A6]/60 shadow-card z-20 min-w-[200px]"
                  >
                    {PRICE_RANGES.map((range) => {
                      const active = priceMin === String(range.min) && priceMax === String(range.max);
                      return (
                        <button
                          key={range.label}
                          onClick={() => {
                            const p = new URLSearchParams(searchParams.toString());
                            if (range.min === 0 && range.max === 10000) { p.delete('minPrice'); p.delete('maxPrice'); }
                            else { p.set('minPrice', String(range.min)); p.set('maxPrice', String(range.max)); }
                            p.delete('page');
                            router.push(`/products?${p.toString()}`);
                            setFiltersOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider hover:bg-[#F5F0E6] transition-colors ${active ? 'text-[#C9A96E] font-medium' : 'text-[#5C4A37]'}`}
                        >
                          {range.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Grid toggle */}
            <div className="hidden lg:flex border border-[#C8B6A6]/40">
              <button onClick={() => setGridCols(3)} className={`p-2 transition-colors ${gridCols === 3 ? 'bg-[#2C2416] text-white' : 'text-[#C8B6A6] hover:text-[#5C4A37]'}`}><Grid3X3 size={14} /></button>
              <button onClick={() => setGridCols(4)} className={`p-2 transition-colors ${gridCols === 4 ? 'bg-[#2C2416] text-white' : 'text-[#C8B6A6] hover:text-[#5C4A37]'}`}><LayoutList size={14} /></button>
            </div>
          </div>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className={`grid gap-6 lg:gap-8 grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F5F0E6] aspect-[4/5]" />
                <div className="pt-4 space-y-2">
                  <div className="h-2 bg-[#F5F0E6] w-20 rounded" />
                  <div className="h-4 bg-[#F5F0E6] rounded" />
                  <div className="h-5 bg-[#F5F0E6] w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#2C2416] mb-3">No kits found</p>
            <p className="text-sm text-[#C8B6A6]">Try adjusting your filters</p>
            <button onClick={clearFilters} className="btn-outline mt-6">Browse All</button>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 lg:gap-8 grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
          >
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

