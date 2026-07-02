import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginRequest, signupRequest } from '../utils/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null, // 'user' | 'admin'
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async ({ email, password, role }) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginRequest({ email, password, role });
          const resolvedRole = data.user?.role || role;
          set({
            user: data.user,
            role: resolvedRole,
            token: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true, role: resolvedRole };
        } catch (err) {
          set({
            isLoading: false,
            error:
              err?.response?.data?.message ||
              'Invalid email or password. Please try again.',
          });
          return { success: false };
        }
      },

      signup: async ({ name, phone, email, password, role }) => {
        set({ isLoading: true, error: null });
        try {
          const data = await signupRequest({ name, phone, email, password, role });
          const resolvedRole = data.user?.role || role;
          set({
            user: data.user,
            role: resolvedRole,
            token: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true, role: resolvedRole };
        } catch (err) {
          set({
            isLoading: false,
            error:
              err?.response?.data?.message ||
              'Could not create your account. That email may already be in use.',
          });
          return { success: false };
        }
      },

      logout: () =>
        set({ user: null, role: null, token: null, isAuthenticated: false }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'hotel-auth', // localStorage key
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);