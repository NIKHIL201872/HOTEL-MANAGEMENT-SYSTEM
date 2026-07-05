import { useState } from "react";

import HotelSelector from "./HotelSelector";
import UserRooms from "./UserRooms";
import SelectedHotelBanner from "./SelectedHotelBanner";

export default function RoomsDashboard() {
  const [activeTab, setActiveTab] = useState("inventory"); // 'inventory' | 'types'

  return (
    <div className="min-h-screen p-6 font-sans text-[#2B1D14] bg-[#F3E4C6]">
      {/* Universal Control Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-[#2B1D14]/10 pb-5 mb-8 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-5 py-2 font-bold text-sm uppercase rounded-xl transition cursor-pointer ${
                activeTab === "inventory"
                  ? "bg-[#2B1D14] text-[#F3E4C6] shadow-sm"
                  : "text-[#2B1D14] hover:bg-[#2B1D14]/10"
              }`}
            >
              Live Room Catalog
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
          <UserRooms />
      </div>
    </div>
  );
}
