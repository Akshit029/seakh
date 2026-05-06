import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await axios.post(`${API}/auth/login`, { email, password });
          set({ user: data, loading: false });
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Login failed', loading: false });
          throw err;
        }
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
          set({ user: data, loading: false });
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Registration failed', loading: false });
          throw err;
        }
      },

      logout: () => {
        set({ user: null });
        if (typeof window !== 'undefined') {
          const token = get().user?.token;
          if (token) {
            axios.post(`${API}/auth/logout`, {}, {
              headers: { Authorization: `Bearer ${token}` },
            }).catch(() => {});
          }
        }
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'seakh-auth' }
  )
);
