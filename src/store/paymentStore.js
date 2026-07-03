import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const usePaymentStore = create((set) => ({
  payment: null,
  loading: false,
  error: null,

  createPayment: async (paymentData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_BASE_URL}/payments`, {
        ...paymentData,
        payment_date: new Date().toISOString().slice(0, 10),
        payment_status: "Paid",
      });
      set({ payment: data, loading: false });
      return { success: true, payment: data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

  fetchPayment: async (paymentId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/payments?payment_id=${paymentId}`,
      );
      set({ payment: data[0], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
