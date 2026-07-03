import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const useReservationStore = create((set, get) => ({
  room: null,
  roomType: null,
  reservation: null,
  loading: false,
  error: null,

  fetchRoomForBooking: async (roomId) => {
    set({ loading: true, error: null });
    try {
      const roomRes = await axios.get(
        `${API_BASE_URL}/rooms?room_id=${roomId}`,
      );
      const room = roomRes.data[0];
      const typeRes = await axios.get(
        `${API_BASE_URL}/roomTypes?room_type_id=${room.room_type_id}`,
      );
      set({ room, roomType: typeRes.data[0], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createReservation: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/reservations`,
        formData,
      );
      set({ reservation: data, loading: false });
      return { success: true, reservation: data };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

  fetchReservation: async (reservationId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/reservations?reservation_id=${reservationId}`,
      );
      const reservation = data[0];
      const room = get().room;
      if (!room || room.room_id !== reservation.room_id) {
        await get().fetchRoomForBooking(reservation.room_id);
      }
      set({ reservation, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
