import React from 'react';
import { useRoomStore } from '../../store/roomStore';

export default function HotelSelector({ onChangePage }) {
  const { selectedHotelId, setSelectedHotelId, hotels } = useRoomStore();

  const handleChange = (e) => {
    setSelectedHotelId(e.target.value);
    if (onChangePage) onChangePage(1);
  };

  // 1. Filter for unique hotels by their name
  const uniqueHotels = Array.from(
    new Map(hotels.map((hotel) => [hotel.name, hotel])).values()
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
        {/* 2. Map over the unique list instead of the full hotels array */}
        {uniqueHotels.map((hotel) => (
          <option key={hotel.hotel_id} value={hotel.hotel_id}>
            {hotel.name} — {hotel.location}
          </option>
        ))}
      </select>
    </div>
  );
}