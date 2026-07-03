import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const useAdminStore = create((set) => ({
  hotels: [],
  rooms: [],
  reservations: [],
  payments: [],
  reviews: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const [hotelsRes, roomsRes, reservationsRes, paymentsRes, reviewsRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/hotels`),
          axios.get(`${API_BASE_URL}/rooms`),
          axios.get(`${API_BASE_URL}/reservations`),
          axios.get(`${API_BASE_URL}/payments`),
          axios.get(`${API_BASE_URL}/reviews`),
        ]);

      set({
        hotels: hotelsRes.data,
        rooms: roomsRes.data,
        reservations: reservationsRes.data,
        payments: paymentsRes.data,
        reviews: reviewsRes.data,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
