import React, { useState, useCallback, useMemo } from 'react';

// Sample structural rotation arrays for different angle view slots
const SAMPLE_ROOM_ANGLES = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", // Main view
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", // Bathroom/Side view
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"  // Balcony/Detail view
];

function RoomDetailView({ room, onBack, onRedirectToReservation,role }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleReserve = useCallback(() => {
    onRedirectToReservation(room);
  }, [onRedirectToReservation, room]);

  const amenityBadges = useMemo(
    () => room ? room.amenities.map((amenity, idx) => (
      <span key={idx} className="bg-[#2B1D14]/5 text-[#2B1D14] text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
        {amenity}
      </span>
    )) : null,
    [room]
  );

  if (!room) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-9">
      {/* Back Button / Navigation Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-black text-uppercase tracking-wider text-white hover:opacity-70
        transition cursor-pointer mb-4 p-2 rounded-lg! bg-[#3F2E24]"
      >
        ← Back to Catalog Overview
      </button>

      {/* Flipkart-inspired Double Column Split Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Column: Interactive 3-Angle Picture Carousel Gallery (Takes 3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-[#2B1D14]/10">
            <img 
              src={SAMPLE_ROOM_ANGLES[activeImageIdx]} 
              alt={`${room.type_name} view angle ${activeImageIdx + 1}`} 
              className="w-full h-full object-cover transition-all duration-300"
            />
            <span className={`absolute top-4 right-4 text-xs uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-lg text-white shadow-sm ${room.is_available ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {room.is_available ? 'Available' : 'Booked'}
            </span>
          </div>

          {/* Carousel Interactive Thumbnail Selectors (3 angles) */}
          <div className="grid grid-cols-3 gap-3">
            {SAMPLE_ROOM_ANGLES.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`h-24 rounded-xl overflow-hidden border-2 transition ${
                  activeImageIdx === idx ? 'border-[#2B1D14] scale-[0.98]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail view" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Room Specifications & Action Redirection Panel (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Block */}
          <div className="bg-white rounded-2xl p-6 border border-[#2B1D14]/10 space-y-4 shadow-sm">
            <div>
              <h1 className="text-3xl font-serif font-black uppercase tracking-tight text-[#2B1D14] leading-tight">{room.type_name}</h1>
              <span className="text-xs font-bold text-gray-400 block mt-1">
                Inventory Room Assignment Target: #{room.room_number}
              </span>
            </div>

            {/* Ratings Summary Row */}
            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl text-xs font-bold w-fit">
              <span className="text-amber-600 text-sm">★</span>
              <span className="text-[#2B1D14]">{room.rating}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">({room.reviewsCount || 128} Verified Global Ratings)</span>
            </div>

            {/* Pricing Section */}
            <div className="border-t border-b border-gray-100 py-4 flex items-baseline gap-2">
              <span className="text-4xl font-serif font-black text-[#2B1D14]">${room.price_per_night}</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">/ per night standard rate</span>
            </div>

            {/* Textual Specifications Description area */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Room Overview Details</h4>
              <p className="text-sm font-medium leading-relaxed text-[#2B1D14]/90">{room.description}</p>
            </div>

            {/* Amenities Grid Listing */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Included Utilities & Perks</h4>
              <div className="flex flex-wrap gap-2">
                {amenityBadges}
              </div>
            </div>
          </div>

          {/* Action Reservation Panel with Redirection Routine */}
          {
            role!=='admin' && <div className="bg-white rounded-2xl p-6 border-2 border-[#2B1D14] space-y-4 shadow-md">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#2B1D14]">Interested in booking this?</h3>
                <p className="text-xs font-medium text-gray-500 leading-normal">
                  Secure your slots for this space instantly. Clicking below will route you directly to our dynamic transactional check-out system profile mapping.
                </p>

                <button
                    onClick={handleReserve}
                    className="w-full bg-[#2B1D14] text-[#F3E4C6] hover:opacity-90 active:scale-[0.99] transition font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-sm text-center block cursor-pointer"
                >
                  Proceed to Booking Window →
                </button>
              </div>
          }


        </div>
      </div>
    </div>
  );
}

export default React.memo(RoomDetailView);