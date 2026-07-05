import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const useRoomStore = create((set, get) => ({
  rooms: [],
  roomTypes: [],
  amenities: [],
  hotels: [],
  selectedHotelId: 'all', // For context filtering
  loading: false,
  error: null,

  setSelectedHotelId: (id) => set({ selectedHotelId: id }),

  fetchModuleData: async () => {
    set({ loading: true, error: null });
    try {
      const [roomsRes, typesRes, amenitiesRes, roomAmenitiesRes, reservationsRes, reviewsRes, hotelsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/rooms`),
        axios.get(`${API_BASE_URL}/roomTypes`),
        axios.get(`${API_BASE_URL}/amenities`),
        axios.get(`${API_BASE_URL}/roomAmenities`),
        axios.get(`${API_BASE_URL}/reservations`),
        axios.get(`${API_BASE_URL}/reviews`),
        axios.get(`${API_BASE_URL}/hotels`)
      ]);

      const typesMap = new Map(typesRes.data.map(t => [t.room_type_id, t]));
      const amenitiesMap = new Map(amenitiesRes.data.map(a => [a.amenity_id, a.name]));

      // Map room_id to list of amenity names
      const roomAmenitiesMap = {};
      roomAmenitiesRes.data.forEach(ra => {
        if (!roomAmenitiesMap[ra.room_id]) roomAmenitiesMap[ra.room_id] = [];
        const name = amenitiesMap.get(ra.amenity_id);
        if (name) roomAmenitiesMap[ra.room_id].push(name);
      });

      // Map reservation_id to room_id
      const resToRoomMap = new Map(reservationsRes.data.map(r => [r.reservation_id, r.room_id]));

      // Group reviews by room_id
      const roomReviewsMap = {};
      reviewsRes.data.forEach(rev => {
        const roomId = resToRoomMap.get(rev.reservation_id);
        if (roomId) {
          if (!roomReviewsMap[roomId]) roomReviewsMap[roomId] = [];
          roomReviewsMap[roomId].push(rev);
        }
      });

      // Stitch everything cleanly into enhanced room objects
      const enrichedRooms = roomsRes.data.map(room => {
        const typeInfo = typesMap.get(room.room_type_id) || {};
        const reviews = roomReviewsMap[room.room_id] || [];
        const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No reviews';

        return {
          ...room,
          type_name: typeInfo.type_name || 'Standard Room',
          description: typeInfo.description || 'Comfortable stay with basic amenities.',
          price_per_night: typeInfo.price_per_night || 0,
          max_occupancy: typeInfo.max_occupancy || 2,
          amenities: roomAmenitiesMap[room.room_id] || ['Wi-Fi'],
          reviewsCount: reviews.length,
          rating: avgRating
        };
      });

      set({
        rooms: enrichedRooms,
        roomTypes: typesRes.data,
        amenities: amenitiesRes.data,
        hotels: hotelsRes.data,
        loading: false
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addRoom: async (roomData) => {
    try {
      await axios.post(`${API_BASE_URL}/rooms`, roomData);
      get().fetchModuleData();
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateRoom: async (roomId, roomData) => {
    try {
      await axios.put(`${API_BASE_URL}/rooms/${roomId}`, roomData);
      await get().fetchModuleData();
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteRoom: async (roomId) => {
    try {
      await axios.delete(`${API_BASE_URL}/rooms/${roomId}`);
      await get().fetchModuleData();
    } catch (err) {
      set({ error: err.message });
    }
  }
}));