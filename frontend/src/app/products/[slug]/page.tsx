'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ShoppingBag, Heart, Share2, Package, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { fetchProductBySlug } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

const fallbackProduct = {
  _id: '1', name: 'The Classic Reader Kit', slug: 'classic-reader-kit',
  description: 'Immerse yourself in the timeless world of classic literature. This curated kit brings together the finest essentials for a truly elevated reading experience.',
  shortDescription: 'Timeless classics meet luxury reading essentials.',
  price: 1499, originalPrice: 1999, category: 'Classic Reads',
  thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
  images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800', 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800'],
  kitContents: [
    { item: 'Curated Classic Novel', description: 'Hand-selected from world literature', icon: '📚' },
    { item: 'Artisanal Tea Blend', description: 'Premium loose-leaf reading tea', icon: '🍵' },
    { item: 'Leather Bookmark', description: 'Hand-stitched genuine leather', icon: '🔖' },
    { item: 'Scented Soy Candle', description: 'Warm vanilla & sandalwood', icon: '🕯️' },
    { item: 'Reading Journal', description: 'Premium recycled paper journal', icon: '📓' },
  ],
  stock: 50, rating: 4.8, numReviews: 24, isFeatured: true, isNewArrival: false,
  mood: 'Nostalgic & Warm', readingLevel: 'Intermediate',
  reviews: [
    { _id: 'r1', name: 'Ananya M.', rating: 5, comment: 'Absolutely stunning kit. The leather bookmark alone is worth it.', createdAt: '2024-02-10' },
    { _id: 'r2', name: 'Priya S.', rating: 5, comment: 'Gifted this to my mother and she loved every single item. The packaging is luxurious.', createdAt: '2024-01-28' },
  ],
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((data) => setProduct(data))
      .catch(() => setProduct({ ...fallbackProduct, slug }))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ _id: product._id, name: product.name, price: product.price, thumbnail: product.thumbnail, stock: product.stock, slug: product.slug });
    setAdded(true);
    toast.success('Added to your cart!', {
      style: { background: '#FAF7F2', color: '#2C2416', border: '1px solid #C8B6A6', borderRadius: '0', fontSize: '13px' },
      iconTheme: { primary: '#C9A96E', secondary: '#FAF7F2' },
    });
    setTimeout(() => setAdded(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) navigator.share({ title: product?.name, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-pulse bg-[#F5F0E6] aspect-square" />
          <div className="animate-pulse space-y-4 pt-4">
            <div className="h-3 bg-[#F5F0E6] w-24 rounded" />
            <div className="h-10 bg-[#F5F0E6] rounded" />
            <div className="h-6 bg-[#F5F0E6] w-28 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  const images = product.images?.length > 0 ? product.images : [product.thumbnail];
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <nav className="flex items-center gap-2 text-[11px] text-[#C8B6A6] tracking-wider uppercase">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C9A96E] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#5C4A37]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Image Gallery */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden bg-[#F5F0E6] mb-4 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image src={images[activeImage]} alt={product.name} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage((a) => (a - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveImage((a) => (a + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              {product.isNewArrival && (
                <div className="absolute top-4 left-4 bg-[#2C2416] text-[#C9A96E] text-[9px] tracking-widest uppercase px-3 py-1.5 font-medium">New Arrival</div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`relative w-20 h-20 overflow-hidden border-2 transition-all ${i === activeImage ? 'border-[#C9A96E]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pt-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Category & mood */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] tracking-widest uppercase text-[#C9A96E] font-medium">{product.category}</span>
                {product.mood && <><span className="w-1 h-1 rounded-full bg-[#C8B6A6]" /><span className="text-[10px] tracking-wider text-[#C8B6A6]">{product.mood}</span></>}
              </div>

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2416] leading-tight mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#C8B6A6]'} />
                  ))}
                </div>
                <span className="text-sm text-[#C8B6A6]">{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#C8B6A6]/30">
                <span className="font-serif text-3xl font-bold text-[#2C2416]">₹{product.price?.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#C8B6A6] line-through">₹{product.originalPrice?.toLocaleString()}</span>
                )}
                {discount > 0 && (
                  <span className="bg-[#C9A96E]/15 text-[#C9A96E] text-xs font-semibold px-2 py-0.5">{discount}% off</span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#5C4A37] text-sm leading-relaxed mb-6">{product.description}</p>

              {/* Kit contents */}
              {product.kitContents?.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Package size={16} className="text-[#C9A96E]" />
                    <span className="text-[11px] tracking-widest uppercase text-[#5C4A37] font-semibold">What&apos;s Inside the Kit</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.kitContents.map((item: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 bg-[#F5F0E6] p-3"
                      >
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-[#2C2416]">{item.item}</p>
                          <p className="text-[10px] text-[#C8B6A6] mt-0.5">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading level */}
              {product.readingLevel && (
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-[10px] tracking-widest uppercase text-[#C8B6A6]">Reading Level:</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#C9A96E] font-medium border border-[#C9A96E]/30 px-2 py-0.5">{product.readingLevel}</span>
                </div>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-[#C9A96E]' : 'bg-red-400'}`} />
                <span className="text-xs text-[#5C4A37]">
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 text-[11px] tracking-widest uppercase font-semibold transition-all duration-300 ${
                    added ? 'bg-green-600 text-white' : 'btn-primary'
                  } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {added ? <><Check size={14} /> Added to Cart</> : <><ShoppingBag size={14} /> Add to Cart</>}
                </motion.button>
                <button onClick={handleShare} className="w-12 flex items-center justify-center border border-[#C8B6A6] text-[#C8B6A6] hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors">
                  <Share2 size={16} />
                </button>
                <button className="w-12 flex items-center justify-center border border-[#C8B6A6] text-[#C8B6A6] hover:text-red-400 hover:border-red-300 transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              {/* Shipping note */}
              <p className="text-[11px] text-[#C8B6A6] tracking-wider">🚚 Free shipping on orders above ₹1,999 · Delivered in 3-5 days</p>
            </motion.div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-20 border-t border-[#C8B6A6]/30 pt-16">
          <div className="mb-10">
            <p className="section-subtitle mb-3">Customer Reviews</p>
            <h2 className="font-serif text-3xl text-[#2C2416] font-bold">What Readers Say</h2>
            <div className="gold-line-left mt-4" />
          </div>

          {product.reviews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {product.reviews.map((review: any) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/60 border border-[#C8B6A6]/20 p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-sm text-[#2C2416]">{review.name}</p>
                      <p className="text-[10px] text-[#C8B6A6] mt-0.5">{new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={11} className={s <= review.rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#C8B6A6]'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#5C4A37] leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-[#C8B6A6] text-sm">No reviews yet. Be the first to share your experience.</p>
          )}

          {user && (
            <div className="mt-10 max-w-lg">
              <p className="text-[11px] tracking-widest uppercase text-[#C9A96E] mb-4">Write a Review</p>
              <textarea placeholder="Share your reading experience..." rows={4} className="input-luxury mb-3 resize-none" />
              <button className="btn-primary text-xs">Submit Review</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
