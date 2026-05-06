'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();
  const shipping = total > 1999 ? 0 : 99;
  const tax = Math.round(total * 0.18);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8B6A6]/30">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#2C2416]">Your Cart</h2>
                <p className="text-xs text-[#C8B6A6] tracking-wider mt-0.5">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F0E6] transition-colors"
              >
                <X size={18} className="text-[#5C4A37]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-[#C8B6A6]" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-lg text-[#2C2416]">Your cart is empty</p>
                    <p className="text-sm text-[#C8B6A6] mt-1">Discover our curated reading kits</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-primary text-xs mt-2"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 bg-white/60 p-4 border border-[#C8B6A6]/20"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-medium text-[#2C2416] hover:text-[#C9A96E] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#C8B6A6] mt-1">₹{item.price.toLocaleString()}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-[#C8B6A6]/40">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F0E6] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium text-[#2C2416] w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F0E6] transition-colors disabled:opacity-30"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-[#2C2416]">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="text-[#C8B6A6] hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-[#C8B6A6]/30 px-6 py-6 bg-white/40">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-[#5C4A37]">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#5C4A37]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#5C4A37]">
                    <span>GST (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#2C2416] pt-2 border-t border-[#C8B6A6]/30">
                    <span>Total</span>
                    <span>₹{(total + shipping + tax).toLocaleString()}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-[#C9A96E] text-center mb-3">
                    Add ₹{(2000 - total).toLocaleString()} more for free shipping
                  </p>
                )}
                <Link href="/checkout" onClick={closeCart}>
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    Checkout <ArrowRight size={14} />
                  </button>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs text-[#C8B6A6] mt-3 hover:text-[#5C4A37] transition-colors tracking-wider uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
