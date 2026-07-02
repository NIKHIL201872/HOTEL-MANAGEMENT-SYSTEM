import React, { useState, useEffect } from 'react';
import { useRoomStore } from '../../store/roomStore';
import { useRoomFilters } from '../../hooks/useRoomFilters';
import { useFilteredRooms } from '../../hooks/useRoomFilterPipeline';
import DashboardHeader from './DashboardHeader';
import RoomFilterSidebar from './RoomFilterSidebar';
import RoomCard from './RoomCard';
import RoomManagementModal from './RoomManagementModal';
import Pagination from './Pagination';
import RoomDetailView from './RoomDetailView'; // Imported Detail View

export default function AdminRooms() {
  const { rooms, loading, selectedHotelId, fetchModuleData } = useRoomStore();
  const filters = useRoomFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomView, setSelectedRoomView] = useState(null); // Added view state
  const [roomToEdit, setRoomToEdit] = useState(null); // Added edit state
  const itemsPerPage = 6;

  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData]);

  const filteredRooms = useFilteredRooms({
    rooms,
    userRole: 'admin',
    selectedHotelId,
    filters
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const currentRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (setter, val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleRedirectToBooking = (room) => {
    // Standard routing redirect action target
    window.location.href = `/reservations?room=${room.room_id}`;
  };

  // Conditional Flipkart Detail Intercept Matrix
  if (selectedRoomView) {
    return (
      <RoomDetailView 
        room={selectedRoomView}
        onBack={() => setSelectedRoomView(null)}
        onRedirectToReservation={handleRedirectToBooking}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <DashboardHeader 
        title="Rooms Management Console"
        subtitle="Full operational controls, scheduling status modifications, and profile indexing flags."
      >
        <button 
          onClick={() => {
            setRoomToEdit(null); // Clear previous edit selection so modal registers as a fresh entry form
            setIsModalOpen(true);
          }}
          className="text-[#F3E4C6] font-bold px-6 py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider cursor-pointer shadow-sm bg-[#2B1D14] whitespace-nowrap hover:opacity-90 hover:shadow-md"
        >
          + Create New Room Entry
        </button>
      </DashboardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <RoomFilterSidebar 
          userRole="admin"
          selectedTypes={filters.selectedTypes}
          handleTypeCheckboxChange={(type) => { filters.handleTypeCheckboxChange(type); setCurrentPage(1); }}
          maxPrice={filters.maxPrice}
          setMaxPrice={(val) => handleFilterChange(filters.setMaxPrice, val)}
          minRating={filters.minRating}
          setMinRating={(val) => handleFilterChange(filters.setMinRating, val)}
          minOccupancy={filters.minOccupancy}
          setMinOccupancy={(val) => handleFilterChange(filters.setMinOccupancy, val)}
          adminAvailabilityFilter={filters.adminAvailabilityFilter}
          setAdminAvailabilityFilter={(val) => handleFilterChange(filters.setAdminAvailabilityFilter, val)}
          clearFilters={() => { filters.clearFilters(); setCurrentPage(1); }}
        />

        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="h-64 flex items-center justify-center font-bold text-[#2B1D14]/70 text-sm uppercase tracking-wider">Querying Data Records...</div>
          ) : currentRooms.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#2B1D14]/10">
              <p className="font-bold text-[#2B1D14]/60">No active rooms match your current filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRooms.map((room, idx) => (
                  <RoomCard 
                    key={room.room_id} 
                    room={room} 
                    index={idx} 
                    userRole="admin" 
                    onSelect={(chosenRoom) => setSelectedRoomView(chosenRoom)}
                    onEdit={(chosenRoom) => {
                      setRoomToEdit(chosenRoom); // Sets the current asset targeted for editing
                      setIsModalOpen(true); // Triggers modal setup window
                    }}
                  />
                ))}
              </div>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <RoomManagementModal 
          roomToEdit={roomToEdit}
          onClose={() => {
            setIsModalOpen(false);
            setRoomToEdit(null); // Clears targets when closed
          }} 
        />
      )}
    </div>
  );
}