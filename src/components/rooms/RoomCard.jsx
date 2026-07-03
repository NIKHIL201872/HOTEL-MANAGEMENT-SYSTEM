import React from 'react';

const CARD_COLORS = ['#8FC356', '#E8823F', '#E8C158'];
const ROOM_IMGS = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80"
];

function RoomCard({ room, index, userRole, onSelect, onEdit, onDelete }) {
  const cardBackground = CARD_COLORS[index % CARD_COLORS.length];
  const roomImg = ROOM_IMGS[index % ROOM_IMGS.length];

  return (
    <div 
      onClick={() => onSelect && onSelect(room)}
      className="rounded-2xl overflow-hidden shadow-md border border-[#2B1D14]/10 flex flex-col justify-between transition duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 relative"
      style={{ backgroundColor: cardBackground }}
    >
      <div>
        {/* Image Container Context Viewport */}
        <div className="relative h-44 w-full bg-gray-100">
          <img src={roomImg} alt={room.type_name} className="w-full h-full object-cover" />

          {/* EDIT BUTTON FOR ADMINS ONLY */}
          {userRole === 'admin' && (
            <>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stops parent container click from navigating to item details view
                onEdit && onEdit(room);
              }}
              className="absolute top-3 left-3 bg-white text-[#2B1D14] hover:bg-[#2B1D14] hover:text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm transition duration-200 z-10 cursor-pointer"
            >
              ✏️ Edit
            </button>
            
            <button
              onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(room);
              }}
              className="absolute top-12 left-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm transition duration-200 z-10 cursor-pointer"
          >
              🗑 Delete
          </button>
          </>
          )}
          

          <span className={`absolute top-3 right-3 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md text-white shadow-sm ${room.is_available ? 'bg-emerald-600' : 'bg-rose-600'}`}>
            {room.is_available ? 'Available' : 'Booked'}
          </span>
        </div>

        {/* Textual Details Segment Block */}
        <div className="p-5 space-y-3 text-[#2B1D14]">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-serif font-black uppercase tracking-tight leading-tight truncate">{room.type_name}</h3>
              <span className="text-xs font-bold opacity-75">
                {userRole === 'admin' ? `Inventory Unit ID: Room #${room.room_number}` : 'Verified Property Stays'}
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black leading-none">${room.price_per_night}</div>
              <span className="text-[10px] font-bold uppercase opacity-60">per night</span>
            </div>
          </div>

          <p className="text-xs font-medium leading-relaxed opacity-90 line-clamp-2">{room.description}</p>

          <div className="flex items-center gap-2 bg-white/40 p-2 rounded-xl text-xs font-bold">
            <span className="text-amber-700 text-sm">★</span>
            <span>{room.rating}</span>
            <span className="opacity-50">•</span>
            <span>({room.reviewsCount || 0} guest ratings)</span>
          </div>
        </div>
      </div>

      {/* Badges Panel Footer Segment */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-white/60 text-[#2B1D14] text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Props are now stable references from parents (useCallback), so memo
// actually prevents re-renders instead of being a no-op.
export default React.memo(RoomCard);