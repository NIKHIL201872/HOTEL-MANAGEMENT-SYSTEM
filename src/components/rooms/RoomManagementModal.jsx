import React, { useState } from 'react';
import { useRoomStore } from '../../store/roomStore';

export default function RoomManagementModal({ onClose, roomToEdit = null }) {
  const { addRoom, updateRoom, roomTypes } = useRoomStore();

  // Pre-populate if editing an existing room entry
  const [formData, setFormData] = useState({
    room_number: roomToEdit ? roomToEdit.room_number : '',
    room_type_id: roomToEdit ? roomToEdit.room_type_id : '1',
    is_available: roomToEdit ? roomToEdit.is_available : true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      room_number: Number(formData.room_number),
      room_type_id: Number(formData.room_type_id),
      is_available: Boolean(formData.is_available)
    };

    if (roomToEdit) {
      await updateRoom(roomToEdit.room_id, payload);
    } else {
      await addRoom(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div 
        className="rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#2B1D14]/20 bg-[#F3E4C6] transform transition-all duration-300"
      >
        {/* Main Branding Header Section */}
        <div className="px-6 py-5 text-white flex justify-between items-center gap-4 bg-[#2B1D14]">
          <h3 className="text-lg font-serif font-black uppercase tracking-wide leading-snug">
            {roomToEdit ? 'Modify Room Asset' : 'Register New Suite'}
          </h3>
          <button 
            onClick={onClose} 
            className="shrink-0 text-white/80 hover:text-white text-2xl font-bold leading-none transition cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        {/* Configuration Action Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-[#2B1D14]">
              Room Number Identification
            </label>
            <input 
              type="number" 
              required
              value={formData.room_number}
              onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#2B1D14]/30 focus:ring-2 focus:ring-[#2B1D14] focus:outline-none transition text-sm font-bold bg-white text-gray-800"
              placeholder="e.g. 104"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-[#2B1D14]">
              Select Configuration Tier
            </label>
            <select 
              value={formData.room_type_id}
              onChange={(e) => setFormData({ ...formData, room_type_id: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#2B1D14]/30 focus:ring-2 focus:ring-[#2B1D14] focus:outline-none transition text-sm font-bold bg-white text-gray-800 cursor-pointer"
            >
              {roomTypes.map(type => (
                <option key={type.room_type_id} value={type.room_type_id}>
                  {type.type_name} — (${type.price_per_night}/night)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-4 bg-white/50 p-4 rounded-xl border border-[#2B1D14]/10">
            <div>
              <label className="text-sm font-black uppercase tracking-wide block text-[#2B1D14]">
                Operational Status
              </label>
              <span className="text-[11px] font-medium opacity-70 block mt-0.5 text-[#2B1D14]">
                Is this room clean and prepared to receive guest arrivals?
              </span>
            </div>
            <input 
              type="checkbox"
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
              className="w-5 h-5 shrink-0 rounded cursor-pointer accent-[#2B1D14]"
            />
          </div>

          {/* Form Action Controls */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#2B1D14]/20 rounded-xl text-xs font-bold uppercase tracking-wider bg-white transition hover:bg-gray-50 text-gray-600 cursor-pointer"
            >
              Discard Changes
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition duration-150 hover:opacity-90 shadow-md bg-[#2B1D14] cursor-pointer"
            >
              {roomToEdit ? 'Update Live Suite' : 'Deploy To Catalog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}