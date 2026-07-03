import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviewsForReservation: async (reservationId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/reviews?reservation_id=${reservationId}`
      );
      set({ reviews: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  submitReview: async (reviewData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_BASE_URL}/reviews`, {
        ...reviewData,
        review_date: new Date().toISOString().slice(0, 10),
      });
      set((state) => ({
        reviews: [...state.reviews, data],
        loading: false,
      }));
      return { success: true, review: data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },
}));
