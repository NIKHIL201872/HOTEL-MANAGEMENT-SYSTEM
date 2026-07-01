import React, { useState } from 'react';
import RoomCard from './RoomCard';
import RoomFilterSidebar from './RoomFilterSidebar';

const MOCK_ROOMS = [
  {
    room_id: 1,
    type_name: "Deluxe Suite",
    price_per_night: 240,
    is_available: true,
    description: "A spacious room featuring ocean views and premium comfort bedding layouts.",
    amenities: ["Free Wi-Fi", "Mini Bar", "Air Conditioning"]
  },
  {
    room_id: 2,
    type_name: "Penthouse Core",
    price_per_night: 550,
    is_available: false,
    description: "Top floor elite layout with localized balcony configurations.",
    amenities: ["Jacuzzi", "Private Kitchen", "City View"]
  },
  {
    room_id: 3,
    type_name: "Standard Double",
    price_per_night: 120,
    is_available: true,
    description: "Perfect stay layout option for traveling pairs and light utilities.",
    amenities: ["Free Wi-Fi", "TV", "Coffee Maker"]
  }
];

export default function RoomsDashboard() {
  const [selectedType, setSelectedType] = useState('All');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Compute filtered listings
  const filteredRooms = MOCK_ROOMS.filter(room => {
    const matchesType = selectedType === 'All' || room.type_name.toLowerCase().includes(selectedType.toLowerCase());
    const matchesAvailability = !showOnlyAvailable || room.is_available;
    return matchesType && matchesAvailability;
  });

  return (
    <div className="min-h-screen p-6 font-sans text-[#3F2E24]" style={{ backgroundColor: '#FDF2DF' }}>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">Available Stays & Lodging</h1>
        <p className="text-xs font-medium opacity-70 mt-1">Day 1 UI Showcase: Basic interactive filtering.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Extracted Sidebar Component */}
        <RoomFilterSidebar 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          showOnlyAvailable={showOnlyAvailable}
          setShowOnlyAvailable={setShowOnlyAvailable}
        />

        {/* Dynamic Card Display Grid */}
        <div className="lg:col-span-3">
          {filteredRooms.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#3F2E24]/10">
              <p className="font-bold text-gray-500">No rooms match your selections.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room, idx) => (
                <RoomCard key={room.room_id} room={room} index={idx} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}