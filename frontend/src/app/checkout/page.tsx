'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Lock, ChevronRight, ArrowLeft, Check, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createRazorpayOrder, createOrder } from '@/lib/api';
import toast from 'react-hot-toast';

const schema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email required'),
  street: z.string().min(5, 'Street address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  pincode: z.string().min(6, 'Valid pincode required'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = getTotal();
  const shipping = total > 1999 ? 0 : 99;
  const tax = Math.round(total * 0.18);
  const grandTotal = total + shipping + tax;

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Lock size={40} className="text-[#C8B6A6] mx-auto mb-4" strokeWidth={1} />
          <h2 className="font-serif text-2xl text-[#2C2416] mb-3">Login to Checkout</h2>
          <p className="text-[#C8B6A6] text-sm mb-6">Please sign in to complete your order</p>
          <Link href="/auth/login?redirect=/checkout"><button className="btn-primary">Sign In</button></Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={40} className="text-[#C8B6A6] mx-auto mb-4" strokeWidth={1} />
          <h2 className="font-serif text-2xl text-[#2C2416] mb-3">Your cart is empty</h2>
          <Link href="/products"><button className="btn-primary mt-4">Browse Kits</button></Link>
        </div>
      </div>
    );
  }

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) { resolve(true); return; }
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePayment = async () => {
    if (step === 1) { handleSubmit(() => setStep(2))(); return; }
    setProcessing(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) { toast.error('Payment gateway failed to load.'); setProcessing(false); return; }

      const rzpOrder = await createRazorpayOrder(grandTotal);
      const formData = getValues();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: rzpOrder.amount,
        currency: 'INR',
        name: 'SEAKH',
        description: 'Curated Reading Kit',
        order_id: rzpOrder.orderId,
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        theme: { color: '#C9A96E' },
        handler: async (response: any) => {
          const order = await createOrder({
            orderItems: items.map((i) => ({ product: i._id, name: i.name, quantity: i.quantity, price: i.price, image: i.thumbnail })),
            shippingAddress: { ...formData },
            paymentResult: response,
            itemsPrice: total,
            shippingPrice: shipping,
            taxPrice: tax,
            totalPrice: grandTotal,
          });
          clearCart();
          setOrderSuccess(true);
          toast.success('Order placed successfully!');
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-[#C9A96E]" />
          </div>
          <h1 className="font-serif text-3xl text-[#2C2416] font-bold mb-3">Order Confirmed!</h1>
          <p className="text-[#C8B6A6] text-sm leading-relaxed mb-8">
            Thank you for your order. Your SEAKH kit will be carefully packed and dispatched within 1–2 business days. Expect an email with your tracking details shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile"><button className="btn-primary text-xs">View Orders</button></Link>
            <Link href="/products"><button className="btn-outline text-xs">Continue Shopping</button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
        {/* Back */}
        <Link href="/products" className="flex items-center gap-2 text-xs text-[#C8B6A6] hover:text-[#C9A96E] transition-colors tracking-wider uppercase mb-8">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="section-subtitle mb-3">Secure Checkout</p>
          <h1 className="font-serif text-4xl text-[#2C2416] font-bold">Complete Your Order</h1>
          <div className="gold-line-left mt-4" />
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {['Shipping Details', 'Payment'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => i === 0 && setStep(1)}
                className={`flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium transition-colors ${step === i + 1 ? 'text-[#C9A96E]' : step > i + 1 ? 'text-[#5C4A37]' : 'text-[#C8B6A6]'}`}
              >
                <span className={`w-6 h-6 flex items-center justify-center text-[10px] rounded-full transition-colors ${step === i + 1 ? 'bg-[#C9A96E] text-white' : step > i + 1 ? 'bg-[#2C2416] text-white' : 'border border-[#C8B6A6] text-[#C8B6A6]'}`}>
                  {step > i + 1 ? <Check size={10} /> : i + 1}
                </span>
                {label}
              </button>
              {i < 1 && <ChevronRight size={12} className="text-[#C8B6A6]" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                id="shipping-form"
                className="space-y-5"
              >
                <h2 className="font-serif text-xl text-[#2C2416] font-bold mb-5">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Full Name *</label>
                    <input {...register('fullName')} id="shipping-name" placeholder="Ananya Mehta" className="input-luxury" />
                    {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Phone *</label>
                    <input {...register('phone')} id="shipping-phone" placeholder="+91 98765 43210" className="input-luxury" />
                    {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Email *</label>
                  <input {...register('email')} id="shipping-email" type="email" defaultValue={user?.email} className="input-luxury" />
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Street Address *</label>
                  <input {...register('street')} id="shipping-street" placeholder="123, Elm Street, Apt 4B" className="input-luxury" />
                  {errors.street && <p className="text-red-400 text-[10px] mt-1">{errors.street.message}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">City *</label>
                    <input {...register('city')} id="shipping-city" placeholder="Mumbai" className="input-luxury" />
                    {errors.city && <p className="text-red-400 text-[10px] mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">State *</label>
                    <input {...register('state')} id="shipping-state" placeholder="Maharashtra" className="input-luxury" />
                    {errors.state && <p className="text-red-400 text-[10px] mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#C8B6A6] block mb-2">Pincode *</label>
                    <input {...register('pincode')} id="shipping-pincode" placeholder="400001" className="input-luxury" />
                    {errors.pincode && <p className="text-red-400 text-[10px] mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-xl text-[#2C2416] font-bold mb-5">Payment Method</h2>
                <div className="bg-[#F5F0E6] border border-[#C8B6A6]/30 p-6 flex items-start gap-4">
                  <CreditCard size={22} className="text-[#C9A96E] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-sm text-[#2C2416] mb-1">Razorpay — Secure Payment</p>
                    <p className="text-xs text-[#C8B6A6] leading-relaxed">Pay securely using UPI, Net Banking, Credit/Debit Cards, or Wallets. Your payment information is encrypted and secure.</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white/60 border border-[#C8B6A6]/20 text-xs text-[#C8B6A6] flex items-center gap-2">
                  <Lock size={12} /> 256-bit SSL encrypted checkout
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#F5F0E6] border border-[#C8B6A6]/20 p-6 sticky top-24">
              <h3 className="font-serif text-lg text-[#2C2416] font-bold mb-5">Order Summary</h3>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                      <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#2C2416] line-clamp-2">{item.name}</p>
                      <p className="text-[10px] text-[#C8B6A6] mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold text-[#2C2416] flex-shrink-0">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C8B6A6]/30 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-[#5C4A37]"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-xs text-[#5C4A37]"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-xs text-[#5C4A37]"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm font-bold text-[#2C2416] pt-2 border-t border-[#C8B6A6]/30">
                  <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <motion.button
                onClick={handlePayment}
                disabled={processing}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6 disabled:opacity-60"
              >
                {processing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : step === 1 ? (
                  <>Continue to Payment <ChevronRight size={14} /></>
                ) : (
                  <>Pay ₹{grandTotal.toLocaleString()} <Lock size={13} /></>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
