import { useMemo } from "react";

export function useFilteredRooms({
  rooms,
  userRole,
  selectedHotelId,
  filters,
}) {
  // Lowercase the selected type strings once per filter change instead of
  // once per (room * selected type) pair inside the hot filter loop below.
  const loweredTypes = useMemo(
    () => filters.selectedTypes.map((t) => t.toLowerCase()),
    [filters.selectedTypes],
  );

  return useMemo(() => {
    return rooms.filter((room) => {
      // 1. Role Enforcement Check
      if (userRole === "client") {
        if (!room.is_available) return false;
      } else {
        if (
          filters.adminAvailabilityFilter === "available" &&
          !room.is_available
        )
          return false;
        if (filters.adminAvailabilityFilter === "booked" && room.is_available)
          return false;
      }

      // 2. Context Hotel Filter
      // rooms now carry hotel_id (added to db.json) so we can scope
      // the catalog to whichever hotel the user came from.
      if (
        selectedHotelId !== "all" &&
        String(room.hotel_id) !== String(selectedHotelId)
      ) {
        return false;
      }

      // 3. Room Type Category Text Match
      if (loweredTypes.length > 0) {
        const roomTypeLower = room.type_name.toLowerCase();
        if (!loweredTypes.some((t) => roomTypeLower.includes(t))) return false;
      }

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
  }, [rooms, userRole, selectedHotelId, filters, loweredTypes]);
}
