import { useMemo } from 'react';

export function useFilteredRooms({
  rooms,
  userRole,
  selectedHotelId,
  filters
}) {
  return useMemo(() => {
    return rooms.filter(room => {
      // 1. Role Enforcement Check
      if (userRole === 'client') {
        if (!room.is_available) return false;
      } else {
        if (filters.adminAvailabilityFilter === 'available' && !room.is_available) return false;
        if (filters.adminAvailabilityFilter === 'booked' && room.is_available) return false;
      }

      // 2. Context Hotel Filter
      // NOTE: the schema (see create_hotel.sql) has no hotel_id / FK on Room,
      // and no such relationship is defined in Endpoints.csv either. Rooms
      // cannot be attributed to a hotel with the current data model, so this
      // filter is intentionally a no-op until the backend adds a real
      // Room -> Hotel relationship. Do not fabricate one client-side.

      // 3. Room Type Category Text Match
      if (filters.selectedTypes.length > 0 && !filters.selectedTypes.some(t => room.type_name.toLowerCase().includes(t.toLowerCase()))) return false;

      // 4. Rating Match
      if (filters.minRating > 0) {
        const numRating = parseFloat(room.rating);
        if (isNaN(numRating) || numRating < filters.minRating) return false;
      }

      // 5. Price & Occupancy Metric Evaluation
      if (Number(room.price_per_night) > filters.maxPrice) return false;
      if (Number(room.max_occupancy) < filters.minOccupancy) return false;

      return true;
    });
  }, [rooms, userRole, selectedHotelId, filters]);
}