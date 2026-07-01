import React from 'react';

const CARD_COLORS = ['#ACE872', '#FF9E5B', '#FFDB78'];
const ROOM_IMGS = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80"
];

export default function RoomCard({ room, index }) {
  const cardBackground = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-md border border-[#3F2E24]/10 flex flex-col justify-between transition duration-300 hover:shadow-xl"
      style={{ backgroundColor: cardBackground }}
    >
      <div>
        <div className="relative h-44 w-full bg-gray-100">
          <img src={ROOM_IMGS[index % ROOM_IMGS.length]} alt={room.type_name} className="w-full h-full object-cover" />
          <span className={`absolute top-3 right-3 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md text-white shadow-sm ${room.is_available ? 'bg-emerald-600' : 'bg-rose-600'}`}>
            {room.is_available ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="p-5 space-y-3 text-[#3F2E24]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">{room.type_name}</h3>
              <span className="text-xs font-bold opacity-75">Verified Property Stays</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">${room.price_per_night}</div>
              <span className="text-[10px] font-bold uppercase opacity-60">per night</span>
            </div>
          </div>

          <p className="text-xs font-medium leading-relaxed opacity-90 line-clamp-2">{room.description}</p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {room.amenities?.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-white/60 text-[#3F2E24] text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}