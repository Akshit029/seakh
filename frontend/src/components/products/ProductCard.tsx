'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  rating: number;
  numReviews: number;
  shortDescription?: string;
  isNewArrival?: boolean;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      stock: product.stock,
      slug: product.slug,
    });
    toast.success(`Added to cart`, {
      style: {
        background: '#FAF7F2',
        color: '#2C2416',
        border: '1px solid #C8B6A6',
        borderRadius: '0',
        fontSize: '13px',
      },
      iconTheme: { primary: '#C9A96E', secondary: '#FAF7F2' },
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image container */}
        <div className="relative overflow-hidden bg-[#F5F0E6] aspect-[4/5]">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNewArrival && (
              <span className="bg-[#2C2416] text-[#C9A96E] text-[9px] tracking-widest uppercase px-2 py-1 font-medium">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-[#C9A96E] text-white text-[9px] tracking-widest uppercase px-2 py-1 font-medium">
                {discount}% Off
              </span>
            )}
          </div>

          {/* Hover overlay with CTA */}
          <div className="absolute inset-0 bg-[#2C2416]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              onClick={handleAddToCart}
              className="bg-[#FAF7F2] text-[#2C2416] px-6 py-2.5 text-[11px] tracking-widest uppercase font-semibold flex items-center gap-2 hover:bg-[#C9A96E] hover:text-white transition-colors duration-200"
            >
              <ShoppingBag size={13} />
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Product info */}
        <div className="pt-4 pb-2 px-0.5">
          <p className="text-[9px] tracking-widest uppercase text-[#C8B6A6] mb-1.5 font-medium">
            {product.category}
          </p>
          <h3 className="font-serif text-base font-semibold text-[#2C2416] group-hover:text-[#C9A96E] transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="text-xs text-[#C8B6A6] mt-1 line-clamp-1">{product.shortDescription}</p>
          )}

          {/* Rating */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={10}
                    className={star <= Math.round(product.rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#C8B6A6]'}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#C8B6A6]">({product.numReviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-serif text-lg font-bold text-[#2C2416]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#C8B6A6] line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
