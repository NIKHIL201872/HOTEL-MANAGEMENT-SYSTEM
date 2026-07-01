import React from 'react';

export default function RoomFilterSidebar({ 
  selectedType, 
  setSelectedType, 
  showOnlyAvailable, 
  setShowOnlyAvailable 
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#3F2E24]/10 space-y-5">
      <div>
        <h3 className="font-black uppercase tracking-wider text-sm mb-3 text-[#3F2E24]">Quick Filters</h3>
        <hr className="border-gray-100 mb-4" />
      </div>

      {/* Type Dropdown Selection */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-400">Room Category</label>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border rounded-xl bg-white text-xs font-bold border-[#3F2E24]/20 focus:outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Suite">Suites</option>
          <option value="Penthouse">Penthouses</option>
          <option value="Double">Double Rooms</option>
        </select>
      </div>

      {/* Simple Toggle Checkbox */}
      <label className="flex items-center gap-2 text-xs font-bold text-[#3F2E24] cursor-pointer select-none pt-2">
        <input 
          type="checkbox"
          checked={showOnlyAvailable}
          onChange={(e) => setShowOnlyAvailable(e.target.checked)}
          className="w-4 h-4 rounded text-[#3F2E24] accent-[#3F2E24]"
        />
        Show Available Only
      </label>
    </div>
  );
}