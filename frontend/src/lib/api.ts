import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

// ── Products ──────────────────────────────────────────────
export const fetchProducts = (params?: Record<string, string | number>) =>
  api.get('/products', { params }).then((r) => r.data);

export const fetchProductBySlug = (slug: string) =>
  api.get(`/products/${slug}`).then((r) => r.data);

export const createReview = (id: string, data: { rating: number; comment: string }) =>
  api.post(`/products/${id}/reviews`, data).then((r) => r.data);

// ── Orders ────────────────────────────────────────────────
export const createRazorpayOrder = (amount: number) =>
  api.post('/orders/create-razorpay-order', { amount }).then((r) => r.data);

export const createOrder = (orderData: any) =>
  api.post('/orders', orderData).then((r) => r.data);

export const fetchMyOrders = () =>
  api.get('/orders/my-orders').then((r) => r.data);

export const fetchOrderById = (id: string) =>
  api.get(`/orders/${id}`).then((r) => r.data);

// ── Auth ──────────────────────────────────────────────────
export const fetchMe = () =>
  api.get('/auth/me').then((r) => r.data);

export const updateProfile = (data: any) =>
  api.put('/auth/profile', data).then((r) => r.data);

// ── Admin ──────────────────────────────────────────────────
export const fetchAllOrders = () =>
  api.get('/orders').then((r) => r.data);

export const updateOrderStatus = (id: string, status: string) =>
  api.put(`/orders/${id}/status`, { status }).then((r) => r.data);

export const createAdminProduct = (data: any) =>
  api.post('/products', data).then((r) => r.data);

export const updateAdminProduct = (id: string, data: any) =>
  api.put(`/products/${id}`, data).then((r) => r.data);

export const deleteAdminProduct = (id: string) =>
  api.delete(`/products/${id}`).then((r) => r.data);

export default api;
