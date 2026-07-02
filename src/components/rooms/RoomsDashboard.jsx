import React, { useState } from 'react';

import RoomTypeConfig from './RoomTypeConfig';
import HotelSelector from './HotelSelector';
import AdminRooms from './AdminRooms';
import UserRooms from './UserRooms';
import SelectedHotelBanner from './SelectedHotelBanner';

export default function RoomsDashboard() {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'types'
  const [userRole, setUserRole] = useState('client'); // 'client' | 'admin'

  return (
    <div className="min-h-screen p-6 font-sans text-[#2B1D14] bg-[#F3E4C6]">
      
      {/* Universal Control Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-[#2B1D14]/10 pb-5 mb-8 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-5 py-2 font-bold text-sm uppercase rounded-xl transition cursor-pointer ${
                activeTab === 'inventory' ? 'bg-[#2B1D14] text-[#F3E4C6] shadow-sm' : 'text-[#2B1D14] hover:bg-[#2B1D14]/10'
              }`}
            >
              Live Room Catalog
            </button>
            <button 
              onClick={() => setActiveTab('types')}
              className={`px-5 py-2 font-bold text-sm uppercase rounded-xl transition cursor-pointer ${
                activeTab === 'types' ? 'bg-[#2B1D14] text-[#F3E4C6] shadow-sm' : 'text-[#2B1D14] hover:bg-[#2B1D14]/10'
              }`}
            >
              Configure Room Types
            </button>
          </div>

          {/* Premium View Switching Control */}
          <div className="flex items-center self-start bg-white/60 p-1 rounded-xl border border-[#2B1D14]/10">
            <button
              onClick={() => setUserRole('client')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition cursor-pointer ${
                userRole === 'client' ? 'bg-[#2B1D14] text-white shadow' : 'text-[#2B1D14] hover:bg-[#2B1D14]/5'
              }`}
            >
              Customer View
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase transition cursor-pointer ${
                userRole === 'admin' ? 'bg-[#2B1D14] text-white shadow' : 'text-[#2B1D14] hover:bg-[#2B1D14]/5'
              }`}
            >
              Admin View
            </button>
          </div>
        </div>

        {/* Cleaned Top Right Corner */}
        <div className="lg:self-center">
          <HotelSelector />
        </div>
      </div>

      {/* Title & Filter Context Pipeline Block */}
      <div className="max-w-7xl mx-auto mb-6">
        
        
        {/* Banner repositioned beneath title text */}
        <SelectedHotelBanner />
      </div>

      {/* Main Render Pipeline router */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'types' ? (
          <RoomTypeConfig />
        ) : userRole === 'admin' ? (
          <AdminRooms />
        ) : (
          <UserRooms />
        )}
      </div>
    </div>
  );
}