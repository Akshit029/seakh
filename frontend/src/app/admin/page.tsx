'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { fetchAllOrders, updateOrderStatus, fetchProducts, deleteAdminProduct } from '@/lib/api';
import { Package, Users, Settings, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If not logged in or not admin, redirect
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }

    loadData();
  }, [user, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'orders') {
        const data = await fetchAllOrders();
        setOrders(data);
      } else if (activeTab === 'products') {
        const data = await fetchProducts();
        setProducts(data);
      }
    } catch (error) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') loadData();
  }, [activeTab]);

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Processing' ? 'Delivered' : 'Processing';
    try {
      await updateOrderStatus(id, newStatus);
      toast.success(`Order marked as ${newStatus}`);
      loadData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteAdminProduct(id);
      toast.success('Product deleted');
      loadData();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  if (loading && !orders.length && !products.length) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20">
      <div className="bg-[#2C2416] text-[#FAF7F2] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-[#C8B6A6] text-sm">Manage orders, inventory, and users.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'orders' ? 'bg-[#C9A96E] text-white font-medium' : 'text-[#5C4A37] hover:bg-[#F5F0E6]'
            }`}
          >
            <Package size={16} /> Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'products' ? 'bg-[#C9A96E] text-white font-medium' : 'text-[#5C4A37] hover:bg-[#F5F0E6]'
            }`}
          >
            <Settings size={16} /> Products
          </button>
          <button
            onClick={() => toast('Users management coming soon')}
            className={`w-full flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase transition-colors text-[#C8B6A6] hover:bg-[#F5F0E6]`}
          >
            <Users size={16} /> Users
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-4">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#2C2416] font-bold">All Orders</h2>
                <span className="text-xs text-[#C8B6A6] uppercase tracking-widest">{orders.length} Total</span>
              </div>
              <div className="bg-white border border-[#C8B6A6]/30 overflow-x-auto">
                <table className="w-full text-left text-sm text-[#5C4A37]">
                  <thead className="bg-[#F5F0E6] text-xs uppercase tracking-widest text-[#2C2416]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Total</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-[#C8B6A6]/20 hover:bg-[#FAF7F2]/50">
                        <td className="px-6 py-4 font-mono text-xs">{order._id.substring(18)}</td>
                        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{order.shippingAddress?.fullName}</p>
                          <p className="text-[10px] text-[#C8B6A6]">{order.shippingAddress?.email}</p>
                        </td>
                        <td className="px-6 py-4 font-medium">₹{order.totalPrice.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest ${
                            order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleStatusChange(order._id, order.orderStatus)}
                            className="text-[10px] uppercase tracking-widest border border-[#C8B6A6] px-3 py-1.5 hover:bg-[#2C2416] hover:text-white transition-colors"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <p className="p-6 text-center text-[#C8B6A6]">No orders found.</p>}
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#2C2416] font-bold">Inventory</h2>
                <button className="btn-primary flex items-center gap-2 text-xs py-2 px-4" onClick={() => toast('Product form modal coming soon')}>
                  <Plus size={14} /> Add Product
                </button>
              </div>
              <div className="bg-white border border-[#C8B6A6]/30 overflow-x-auto">
                <table className="w-full text-left text-sm text-[#5C4A37]">
                  <thead className="bg-[#F5F0E6] text-xs uppercase tracking-widest text-[#2C2416]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Stock</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-[#C8B6A6]/20 hover:bg-[#FAF7F2]/50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.thumbnail} alt="" className="w-10 h-10 object-cover" />
                          <span className="font-medium text-[#2C2416]">{product.name}</span>
                        </td>
                        <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4 text-xs">{product.category}</td>
                        <td className="px-6 py-4">
                          <span className={`${product.stock > 10 ? 'text-green-600' : 'text-red-500'}`}>{product.stock} in stock</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button className="text-[#C8B6A6] hover:text-[#C9A96E]"><Edit size={16} /></button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="text-[#C8B6A6] hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {products.length === 0 && <p className="p-6 text-center text-[#C8B6A6]">No products found.</p>}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
