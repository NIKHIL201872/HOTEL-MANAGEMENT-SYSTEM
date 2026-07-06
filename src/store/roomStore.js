import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const useRoomStore = create((set, get) => ({
  rooms: [],
  roomTypes: [],
  amenities: [],
  hotels: [],
  selectedHotelId: "all",
  loading: false,
  error: null,

  setSelectedHotelId: (id) => set({ selectedHotelId: id }),

  fetchModuleData: async () => {
    set({ loading: true, error: null });

    try {
      const [
        roomsRes,
        typesRes,
        amenitiesRes,
        roomAmenitiesRes,
        reservationsRes,
        reviewsRes,
        hotelsRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/rooms`),
        axios.get(`${API_BASE_URL}/roomTypes`),
        axios.get(`${API_BASE_URL}/amenities`),
        axios.get(`${API_BASE_URL}/roomAmenities`),
        axios.get(`${API_BASE_URL}/reservations`),
        axios.get(`${API_BASE_URL}/reviews`),
        axios.get(`${API_BASE_URL}/hotels`),
      ]);

      const typesMap = new Map(typesRes.data.map((t) => [t.room_type_id, t]));

      const amenitiesMap = new Map(
        amenitiesRes.data.map((a) => [a.amenity_id, a.name]),
      );

      // Map room_id to amenity names
      const roomAmenitiesMap = {};

      roomAmenitiesRes.data.forEach((ra) => {
        if (!roomAmenitiesMap[ra.room_id]) {
          roomAmenitiesMap[ra.room_id] = [];
        }

        const name = amenitiesMap.get(ra.amenity_id);

        if (name) {
          roomAmenitiesMap[ra.room_id].push(name);
        }
      });

      // Map reservation_id to room_id
      const resToRoomMap = new Map(
        reservationsRes.data.map((r) => [r.reservation_id, r.room_id]),
      );

      // Group reviews by room
      const roomReviewsMap = {};

      reviewsRes.data.forEach((review) => {
        const roomId = resToRoomMap.get(review.reservation_id);

        if (roomId) {
          if (!roomReviewsMap[roomId]) {
            roomReviewsMap[roomId] = [];
          }

          roomReviewsMap[roomId].push(review);
        }
      });

      // Enrich room data
      const enrichedRooms = roomsRes.data.map((room) => {
        const typeInfo = typesMap.get(room.room_type_id) || {};
        const reviews = roomReviewsMap[room.room_id] || [];

        const avgRating = reviews.length
          ? (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "No reviews";

        return {
          ...room,
          type_name: typeInfo.type_name || "Standard Room",
          description:
            typeInfo.description || "Comfortable stay with basic amenities.",
          price_per_night: typeInfo.price_per_night || 0,
          max_occupancy: typeInfo.max_occupancy || 2,
          amenities: roomAmenitiesMap[room.room_id] || ["Wi-Fi"],
          reviewsCount: reviews.length,
          rating: avgRating,
        };
      });

      set({
        rooms: enrichedRooms,
        roomTypes: typesRes.data,
        amenities: amenitiesRes.data,
        hotels: hotelsRes.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  addRoom: async (roomData) => {
    try {
      const { rooms } = get();

      // reduce() avoids spreading a potentially large array into
      // Math.max(...) - same result as before, but no intermediate
      // argument array and no call-stack risk on large datasets.
      const nextRoomId =
        rooms.reduce((max, room) => {
          const n = Number(room.room_id);
          return Number.isFinite(n) ? Math.max(max, n) : max;
        }, 0) + 1;
      const payload = {
        ...roomData,
        room_id: nextRoomId,
      };
      //console.log("add ",payload)
      await axios.post(`${API_BASE_URL}/rooms`, payload);

      await get().fetchModuleData();
    } catch (err) {
      set({
        error: err.message,
      });
    }
  },

  updateRoom: async (roomId, roomData) => {
  try {
    const room = get().rooms.find((r) => r.room_id === roomId);
    if (!room) return;
    await axios.put(`${API_BASE_URL}/rooms/${room.id}`, { ...room, ...roomData });
    await get().fetchModuleData();   // only runs if the PUT succeeds
  } catch (err) {
    set({ error: err.message });     // fails silently — no throw, no alert
  }
},
  deleteRoom: async (roomId) => {
    try {
      const room = get().rooms.find((r) => r.room_id === roomId);

      if (!room) return;

      await axios.delete(`${API_BASE_URL}/rooms/${room.id}`);

      await get().fetchModuleData();
    } catch (err) {
      set({
        error: err.message,
      });
    }
  },
}));
