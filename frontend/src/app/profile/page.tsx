'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { fetchMyOrders, fetchMe } from '@/lib/api';
import { Package, MapPin, User, LogOut, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const loadData = async () => {
      try {
        const [ordersData, profileData] = await Promise.all([
          fetchMyOrders(),
          fetchMe(),
        ]);
        setOrders(ordersData);
        setProfile(profileData);
      } catch (error) {
        console.error('Failed to load profile data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      <div className="bg-[#F5F0E6] border-b border-[#C8B6A6]/30 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center gap-6">
          <div className="w-20 h-20 bg-[#2C2416] text-[#C9A96E] rounded-full flex items-center justify-center text-3xl font-serif font-bold border-2 border-[#C9A96E]/40">
            {profile?.name?.charAt(0) || user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-3xl text-[#2C2416] font-bold mb-1">{profile?.name || user.name}</h1>
            <p className="text-[#C8B6A6] text-sm">{profile?.email || user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-5 py-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === 'orders' ? 'bg-[#2C2416] text-[#FAF7F2] font-medium' : 'text-[#5C4A37] hover:bg-[#F5F0E6]'
            }`}
          >
            <Package size={16} /> My Orders
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`w-full flex items-center gap-3 px-5 py-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === 'details' ? 'bg-[#2C2416] text-[#FAF7F2] font-medium' : 'text-[#5C4A37] hover:bg-[#F5F0E6]'
            }`}
          >
            <User size={16} /> Account Details
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 text-sm tracking-widest uppercase text-[#C8B6A6] hover:text-red-500 hover:bg-[#F5F0E6] transition-colors mt-8"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-serif text-2xl text-[#2C2416] font-bold mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="bg-white/50 border border-[#C8B6A6]/20 p-10 text-center">
                  <Package size={40} className="text-[#C8B6A6] mx-auto mb-4" strokeWidth={1} />
                  <p className="font-serif text-xl text-[#2C2416] mb-2">No orders yet</p>
                  <p className="text-sm text-[#C8B6A6] mb-6">You haven&apos;t placed any orders with us yet.</p>
                  <Link href="/products"><button className="btn-primary text-xs">Start Shopping</button></Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white border border-[#C8B6A6]/30 overflow-hidden group hover:border-[#C9A96E]/50 transition-colors">
                      <div className="bg-[#F5F0E6]/50 border-b border-[#C8B6A6]/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-8 text-xs">
                          <div>
                            <p className="text-[#C8B6A6] tracking-widest uppercase mb-1">Order Placed</p>
                            <p className="font-medium text-[#2C2416]">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#C8B6A6] tracking-widest uppercase mb-1">Total</p>
                            <p className="font-medium text-[#2C2416]">₹{order.totalPrice.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] tracking-widest uppercase text-[#C8B6A6]">Order #{order._id.substring(order._id.length - 8)}</span>
                          <span className={`px-3 py-1 text-[10px] tracking-widest uppercase font-medium flex items-center gap-1.5 ${
                            order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {order.orderStatus === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex flex-col gap-4">
                          {order.orderItems.map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-[#F5F0E6] relative flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <Link href={`/products/${item.product}`} className="font-serif text-sm font-medium text-[#2C2416] hover:text-[#C9A96E] transition-colors">
                                  {item.name}
                                </Link>
                                <p className="text-[11px] text-[#C8B6A6] mt-1">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                              </div>
                              <Link href={`/products/${item.product}`}>
                                <button className="text-[11px] tracking-widest uppercase text-[#C9A96E] hover:underline flex items-center gap-1">
                                  View Item <ExternalLink size={12} />
                                </button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-serif text-2xl text-[#2C2416] font-bold mb-6">Account Details</h2>
              <div className="bg-white/50 border border-[#C8B6A6]/20 p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mb-4 flex items-center gap-2">
                      <User size={14} /> Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#C8B6A6]">Full Name</p>
                        <p className="text-sm font-medium text-[#2C2416]">{profile?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#C8B6A6]">Email Address</p>
                        <p className="text-sm font-medium text-[#2C2416]">{profile?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#C8B6A6]">Phone Number</p>
                        <p className="text-sm font-medium text-[#2C2416]">{profile?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-widest uppercase text-[#C8B6A6] mb-4 flex items-center gap-2">
                      <MapPin size={14} /> Default Shipping Address
                    </h3>
                    {profile?.address?.street ? (
                      <div className="text-sm text-[#2C2416] leading-relaxed">
                        <p>{profile.address.street}</p>
                        <p>{profile.address.city}, {profile.address.state}</p>
                        <p>{profile.address.pincode}</p>
                        <p>{profile.address.country}</p>
                      </div>
                    ) : (
                      <div className="text-sm text-[#C8B6A6] bg-[#F5F0E6]/50 p-4 border border-[#C8B6A6]/20">
                        No default address saved. It will be saved automatically upon your first order.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
