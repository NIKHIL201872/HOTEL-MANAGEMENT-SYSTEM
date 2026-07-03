import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { useRoomStore } from '../../../store/roomStore';

vi.mock('axios');

const API_BASE_URL = 'http://localhost:5000';

const mockEndpoints = ({
  rooms = [],
  roomTypes = [],
  amenities = [],
  roomAmenities = [],
  reservations = [],
  reviews = [],
  hotels = []
} = {}) => {
  axios.get.mockImplementation((url) => {
    if (url === `${API_BASE_URL}/rooms`) return Promise.resolve({ data: rooms });
    if (url === `${API_BASE_URL}/roomTypes`) return Promise.resolve({ data: roomTypes });
    if (url === `${API_BASE_URL}/amenities`) return Promise.resolve({ data: amenities });
    if (url === `${API_BASE_URL}/roomAmenities`) return Promise.resolve({ data: roomAmenities });
    if (url === `${API_BASE_URL}/reservations`) return Promise.resolve({ data: reservations });
    if (url === `${API_BASE_URL}/reviews`) return Promise.resolve({ data: reviews });
    if (url === `${API_BASE_URL}/hotels`) return Promise.resolve({ data: hotels });
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });
};

const resetStore = () => {
  useRoomStore.setState({
    rooms: [],
    roomTypes: [],
    amenities: [],
    hotels: [],
    selectedHotelId: 'all',
    loading: false,
    error: null
  });
};

describe('useRoomStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetStore();
  });

  describe('fetchModuleData', () => {
    it('enriches rooms with type info, amenities, review count and average rating', async () => {
      mockEndpoints({
        rooms: [{ room_id: 1, room_number: 101, room_type_id: 10, is_available: true }],
        roomTypes: [{ room_type_id: 10, type_name: 'Suite', description: 'Nice suite', price_per_night: 250, max_occupancy: 4 }],
        amenities: [{ amenity_id: 100, name: 'Wi-Fi' }, { amenity_id: 101, name: 'Pool' }],
        roomAmenities: [{ room_id: 1, amenity_id: 100 }, { room_id: 1, amenity_id: 101 }],
        reservations: [{ reservation_id: 500, room_id: 1 }, { reservation_id: 501, room_id: 1 }],
        reviews: [{ reservation_id: 500, rating: 4 }, { reservation_id: 501, rating: 5 }],
        hotels: [{ hotel_id: 1, name: 'Grand Hotel', location: 'NYC' }]
      });

      await useRoomStore.getState().fetchModuleData();
      const { rooms, loading, error } = useRoomStore.getState();

      expect(loading).toBe(false);
      expect(error).toBeNull();
      expect(rooms).toHaveLength(1);
      expect(rooms[0]).toMatchObject({
        type_name: 'Suite',
        description: 'Nice suite',
        price_per_night: 250,
        max_occupancy: 4,
        reviewsCount: 2,
        rating: '4.5'
      });
      expect(rooms[0].amenities.sort()).toEqual(['Pool', 'Wi-Fi']);
    });

    it('falls back to defaults when a room has no matching room type', () => {
      mockEndpoints({
        rooms: [{ room_id: 1, room_number: 101, room_type_id: 999, is_available: true }],
        roomTypes: [],
        hotels: []
      });

      return useRoomStore.getState().fetchModuleData().then(() => {
        const { rooms } = useRoomStore.getState();
        expect(rooms[0].type_name).toBe('Standard Room');
        expect(rooms[0].description).toBe('Comfortable stay with basic amenities.');
        expect(rooms[0].price_per_night).toBe(0);
        expect(rooms[0].max_occupancy).toBe(2);
        expect(rooms[0].amenities).toEqual(['Wi-Fi']);
      });
    });

    it('reports "No reviews" as the rating when a room has zero reviews', async () => {
      mockEndpoints({
        rooms: [{ room_id: 1, room_number: 101, room_type_id: 10, is_available: true }],
        roomTypes: [{ room_type_id: 10, type_name: 'Standard', price_per_night: 100, max_occupancy: 2 }]
      });

      await useRoomStore.getState().fetchModuleData();
      const { rooms } = useRoomStore.getState();

      expect(rooms[0].rating).toBe('No reviews');
      expect(rooms[0].reviewsCount).toBe(0);
    });

    it('only attributes reviews to the room via its own reservations', async () => {
      mockEndpoints({
        rooms: [
          { room_id: 1, room_number: 101, room_type_id: 10, is_available: true },
          { room_id: 2, room_number: 102, room_type_id: 10, is_available: true }
        ],
        roomTypes: [{ room_type_id: 10, type_name: 'Standard', price_per_night: 100, max_occupancy: 2 }],
        reservations: [{ reservation_id: 500, room_id: 1 }, { reservation_id: 501, room_id: 2 }],
        reviews: [{ reservation_id: 500, rating: 5 }, { reservation_id: 501, rating: 1 }]
      });

      await useRoomStore.getState().fetchModuleData();
      const { rooms } = useRoomStore.getState();

      expect(rooms.find(r => r.room_id === 1).rating).toBe('5.0');
      expect(rooms.find(r => r.room_id === 2).rating).toBe('1.0');
    });

    it('sets error and stops loading if any request fails', async () => {
      axios.get.mockRejectedValue(new Error('Network error'));

      await useRoomStore.getState().fetchModuleData();
      const { error, loading } = useRoomStore.getState();

      expect(error).toBe('Network error');
      expect(loading).toBe(false);
    });

    it('sets loading to true synchronously before requests resolve', () => {
      mockEndpoints();
      const promise = useRoomStore.getState().fetchModuleData();
      expect(useRoomStore.getState().loading).toBe(true);
      return promise;
    });
  });

  describe('addRoom', () => {
    it('POSTs the new room data and refetches module data', async () => {
      axios.post.mockResolvedValue({});
      mockEndpoints({ rooms: [{ room_id: 1, room_number: 200, room_type_id: 1, is_available: true }] });

      const payload = { room_number: 200, room_type_id: 1, is_available: true };
      await useRoomStore.getState().addRoom(payload);

      // Fixed: Assert that room_id: 1 is accurately appended by the store action
      expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/rooms`, { ...payload, room_id: 1 });
      expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/rooms`);
    });

    it('sets error state if the POST request fails', async () => {
      axios.post.mockRejectedValue(new Error('Create failed'));

      await useRoomStore.getState().addRoom({ room_number: 1, room_type_id: 1, is_available: true });

      expect(useRoomStore.getState().error).toBe('Create failed');
    });
  });

  describe('updateRoom', () => {
    it('PUTs to /rooms/:id and refetches module data', async () => {
      axios.put.mockResolvedValue({});
      mockEndpoints({ rooms: [{ id: 'mock-id-7', room_id: 7, room_number: 305, room_type_id: 2, is_available: false }] });

      // Seed the store with the existing room containing the db-generated record string ID
      useRoomStore.setState({
        rooms: [{ id: 'mock-id-7', room_id: 7, room_number: 305, room_type_id: 2, is_available: false }]
      });

      const updateData = { is_available: true };
      await useRoomStore.getState().updateRoom(7, updateData);

      // Fixed: Assert against endpoint using room.id ('mock-id-7') and the fully merged object payload
      expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/rooms/mock-id-7`, {
        id: 'mock-id-7',
        room_id: 7,
        room_number: 305,
        room_type_id: 2,
        is_available: true
      });
      expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/rooms`);
    });

    it('sets error state if the PUT request fails', async () => {
      axios.put.mockRejectedValue(new Error('Update failed'));
      useRoomStore.setState({
        rooms: [{ id: 'mock-id-7', room_id: 7, room_number: 1, room_type_id: 1, is_available: true }]
      });

      await useRoomStore.getState().updateRoom(7, { is_available: false });

      expect(useRoomStore.getState().error).toBe('Update failed');
    });
  });

  describe('setSelectedHotelId', () => {
    it('updates selectedHotelId in state', () => {
      useRoomStore.getState().setSelectedHotelId('42');
      expect(useRoomStore.getState().selectedHotelId).toBe('42');
    });
  });
});