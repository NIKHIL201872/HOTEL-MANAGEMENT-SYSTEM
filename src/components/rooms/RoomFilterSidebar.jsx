import React from 'react';

export default function RoomFilterSidebar({ 
  userRole,
  selectedTypes, 
  handleTypeCheckboxChange, 
  maxPrice, 
  setMaxPrice, 
  minRating, 
  setMinRating, 
  minOccupancy, 
  setMinOccupancy,
  adminAvailabilityFilter,
  setAdminAvailabilityFilter,
  clearFilters 
}) {
  const coreTypes = ['Single', 'Double', 'Suite', 'Penthouse'];
  const occupancyOptions = [1, 2, 4, 6, 8]; 

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#2B1D14]/10 space-y-6">
      <div className="border-b border-[#2B1D14]/10 pb-3 flex justify-between items-center">
        <h3 className="font-serif font-black uppercase tracking-wider text-sm text-[#2B1D14]">Filters</h3>
        <button onClick={clearFilters} className="text-xs font-bold text-amber-800 hover:underline cursor-pointer">
          Clear All
        </button>
      </div>

      {/* ADMIN ONLY FILTER: Booked vs Available Selector Option */}
      {userRole === 'admin' && (
        <div className="bg-[#2B1D14]/[0.04] p-3 rounded-xl border border-[#2B1D14]/10 space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-[#2B1D14]/50">
            Booking Status (Admin Only)
          </label>
          <div className="flex flex-col gap-1.5">
            {['all', 'available', 'booked'].map((status) => (
              <label key={status} className="flex items-center gap-2 text-xs font-bold capitalize text-[#2B1D14] cursor-pointer">
                <input 
                  type="radio"
                  name="adminStatus"
                  checked={adminAvailabilityFilter === status}
                  onChange={() => setAdminAvailabilityFilter(status)}
                  className="w-4 h-4 text-[#2B1D14] accent-[#2B1D14]"
                />
                {status === 'all' ? 'All Inventory Statuses' : `${status} Units Only`}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Room Category Selection */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2.5 opacity-80 text-[#2B1D14]">
          Room Category
        </label>
        <div className="space-y-2">
          {coreTypes.map(type => (
            <label key={type} className="flex items-center gap-2 text-xs font-bold text-[#2B1D14] cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeCheckboxChange(type)}
                className="w-4 h-4 rounded text-[#2B1D14] accent-[#2B1D14]"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-1 text-[#2B1D14]">
          <span>Max Price</span>
          <span className="text-amber-700 font-black">${maxPrice}</span>
        </div>
        <input 
          type="range" min="50" max="900" step="10" value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#2B1D14] cursor-pointer"
        />
      </div>

      {/* Ratings Grid */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2.5 opacity-80 text-[#2B1D14]">
          Minimum Rating
        </label>
        <div className="grid grid-cols-5 gap-1">
          {[0, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars} onClick={() => setMinRating(stars)}
              className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${minRating === stars ? 'bg-[#2B1D14] text-white' : 'bg-[#2B1D14]/[0.06] text-[#2B1D14] hover:bg-[#2B1D14]/10'}`}
            >
              {stars === 0 ? 'Any' : `${stars}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Max Capacity Configuration Selector Grid */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-80 text-[#2B1D14]">
          Min Occupancy
        </label>
        <div className="grid grid-cols-5 gap-1">
          {occupancyOptions.map((num) => (
            <button
              key={num} type="button" onClick={() => setMinOccupancy(num)}
              className={`py-2 rounded-lg text-xs font-black transition cursor-pointer ${minOccupancy === num ? 'bg-[#2B1D14] text-white' : 'bg-white border border-[#2B1D14]/15 text-[#2B1D14] hover:bg-[#2B1D14]/5'}`}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}