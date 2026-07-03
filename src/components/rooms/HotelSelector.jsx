import React, { useMemo, useCallback } from 'react';
import { useRoomStore } from '../../store/roomStore';

export default function HotelSelector({ onChangePage }) {
  const { selectedHotelId, setSelectedHotelId, hotels } = useRoomStore();

  const handleChange = useCallback((e) => {
    setSelectedHotelId(e.target.value);
    if (onChangePage) onChangePage(1);
  }, [setSelectedHotelId, onChangePage]);

  // Filter for unique hotels by their name - memoized so this only
  // recomputes when the hotels list actually changes.
  const uniqueHotels = useMemo(
    () => Array.from(new Map(hotels.map((hotel) => [hotel.name, hotel])).values()),
    [hotels]
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-xs font-black uppercase tracking-wider text-[#2B1D14] whitespace-nowrap">
        Context Hotel Filter:
      </label>
      <select
        value={selectedHotelId}
        onChange={handleChange}
        className="px-3 py-2 border rounded-xl bg-white text-sm font-bold border-[#2B1D14]/30 focus:ring-2 focus:ring-[#2B1D14] focus:outline-none text-[#2B1D14] cursor-pointer max-w-full"
      >
        <option value="all">Show All Connected Properties</option>
        {uniqueHotels.map((hotel) => (
          <option key={hotel.hotel_id} value={hotel.hotel_id}>
            {hotel.name} — {hotel.location}
          </option>
        ))}
      </select>
    </div>
  );
}