import React from 'react';
import { useRoomStore } from '../../store/roomStore';

export default function RoomTypeConfig() {
  const { roomTypes } = useRoomStore();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 shadow-sm border border-[#2B1D14]/10">
      <h2 className="text-2xl font-serif font-black text-[#2B1D14] uppercase mb-4 tracking-tight leading-tight">Active Room Configuration Profiles</h2>
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b-2 border-[#2B1D14]/20 text-[#2B1D14] text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Type ID</th>
              <th className="py-3 px-4">Classification Label</th>
              <th className="py-3 px-4">Description Structure</th>
              <th className="py-3 px-4">Max Capacity</th>
              <th className="py-3 px-4">Base Fare Rate</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium text-[#2B1D14]/80 divide-y divide-[#2B1D14]/10">
            {roomTypes.map((type) => (
              <tr key={type.room_type_id} className="hover:bg-[#2B1D14]/[0.03] transition">
                <td className="py-3 px-4 font-bold">{type.room_type_id}</td>
                <td className="py-3 px-4 font-bold text-[#2B1D14]">{type.type_name}</td>
                <td className="py-3 px-4">{type.description}</td>
                <td className="py-3 px-4 font-bold">{type.max_occupancy} Guests</td>
                <td className="py-3 px-4 font-black text-amber-800">${type.price_per_night}/night</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}