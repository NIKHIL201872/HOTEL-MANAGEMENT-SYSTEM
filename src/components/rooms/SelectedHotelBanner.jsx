import React from 'react';
import { useRoomStore } from '../../store/roomStore';

export default function SelectedHotelBanner() {
  const { selectedHotelId, hotels } = useRoomStore();

  const selectedHotel = selectedHotelId !== 'all'
    ? hotels.find(h => String(h.hotel_id) === String(selectedHotelId))
    : null;

  const label = selectedHotel ? selectedHotel.name : 'All Connected Properties';

  return (
    <div className="inline-flex flex-wrap items-center gap-2.5 bg-[#2B1D14]/5 border border-[#2B1D14]/10 rounded-xl px-4 py-2 mt-2 max-w-full">
      <span className="text-[10px] font-black uppercase tracking-wider text-[#2B1D14]/60">
        Active View:
      </span>
      <span className="text-sm font-extrabold tracking-tight text-[#2B1D14]">
        {label}
      </span>
      {selectedHotel && (
        <span className="text-xs font-semibold opacity-60 text-[#2B1D14] bg-white/60 px-2 py-0.5 rounded-md border border-[#2B1D14]/5">
          {selectedHotel.location}
        </span>
      )}
    </div>
  );
}