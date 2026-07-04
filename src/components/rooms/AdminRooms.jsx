import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRoomStore } from "../../store/roomStore";
import { useRoomFilters } from "../../hooks/useRoomFilters";
import { useFilteredRooms } from "../../hooks/useRoomFilterPipeline";
import DashboardHeader from "./DashboardHeader";
import RoomFilterSidebar from "./RoomFilterSidebar";
import RoomCard from "./RoomCard";
import RoomManagementModal from "./RoomManagementModal";
import Pagination from "./Pagination";
import RoomDetailView from "./RoomDetailView"; // Imported Detail View
import AdminReview from "../review/AdminReview";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

export default function AdminRooms() {
  const navigate = useNavigate();
  const { rooms, loading, selectedHotelId, fetchModuleData } = useRoomStore();
  const filters = useRoomFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomView, setSelectedRoomView] = useState(null); // Added view state
  const [roomToEdit, setRoomToEdit] = useState(null); // Added edit state
  const [modalMode, setModalMode] = useState("create");

  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData]);

  const filteredRooms = useFilteredRooms({
    rooms,
    userRole: "admin",
    selectedHotelId,
    filters,
  });

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const currentRooms = useMemo(
    () =>
      filteredRooms.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredRooms, currentPage],
  );

  const handleFilterChange = useCallback((setter, val) => {
    setter(val);
    setCurrentPage(1);
  }, []);

  const handleRedirectToBooking = useCallback(
    (room) => {
      // Standard routing redirect action target
      // window.location.href = `/reservations?room=${room.room_id}`;
      navigate(`/reservations?room=${room.room_id}`);
    },
    [navigate],
  );

  const openModalFor = useCallback((mode, room = null) => {
    setModalMode(mode);
    setRoomToEdit(room);
    setIsModalOpen(true);
  }, []);

  const handleCreate = useCallback(
    () => openModalFor("create"),
    [openModalFor],
  );
  const handleEdit = useCallback(
    (room) => openModalFor("edit", room),
    [openModalFor],
  );
  const handleDelete = useCallback(
    (room) => openModalFor("delete", room),
    [openModalFor],
  );
  const handleSelectRoom = useCallback((room) => setSelectedRoomView(room), []);
  const handleBack = useCallback(() => setSelectedRoomView(null), []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setRoomToEdit(null); // Clears targets when closed
    setModalMode("create");
  }, []);

  const handleTypeCheckboxChange = useCallback(
    (type) => {
      filters.handleTypeCheckboxChange(type);
      setCurrentPage(1);
    },
    [filters],
  );

  const handleSetMaxPrice = useCallback(
    (val) => handleFilterChange(filters.setMaxPrice, val),
    [filters, handleFilterChange],
  );
  const handleSetMinRating = useCallback(
    (val) => handleFilterChange(filters.setMinRating, val),
    [filters, handleFilterChange],
  );
  const handleSetMinOccupancy = useCallback(
    (val) => handleFilterChange(filters.setMinOccupancy, val),
    [filters, handleFilterChange],
  );
  const handleSetAdminAvailabilityFilter = useCallback(
    (val) => handleFilterChange(filters.setAdminAvailabilityFilter, val),
    [filters, handleFilterChange],
  );
  const handleClearFilters = useCallback(() => {
    filters.clearFilters();
    setCurrentPage(1);
  }, [filters]);

  // Conditional Flipkart Detail Intercept Matrix
  if (selectedRoomView) {
    return (
      <RoomDetailView
        room={selectedRoomView}
        onBack={handleBack}
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
          onClick={handleCreate}
          className="text-[#F3E4C6] font-bold px-6 py-3 rounded-xl transition duration-200 text-xs uppercase tracking-wider cursor-pointer shadow-sm bg-[#2B1D14] whitespace-nowrap hover:opacity-90 hover:shadow-md"
        >
          + Create New Room Entry
        </button>
      </DashboardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <RoomFilterSidebar
          userRole="admin"
          selectedTypes={filters.selectedTypes}
          handleTypeCheckboxChange={handleTypeCheckboxChange}
          maxPrice={filters.maxPrice}
          setMaxPrice={handleSetMaxPrice}
          minRating={filters.minRating}
          setMinRating={handleSetMinRating}
          minOccupancy={filters.minOccupancy}
          setMinOccupancy={handleSetMinOccupancy}
          adminAvailabilityFilter={filters.adminAvailabilityFilter}
          setAdminAvailabilityFilter={handleSetAdminAvailabilityFilter}
          clearFilters={handleClearFilters}
        />

        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="h-64 flex items-center justify-center font-bold text-[#2B1D14]/70 text-sm uppercase tracking-wider">
              Querying Data Records...
            </div>
          ) : currentRooms.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#2B1D14]/10">
              <p className="font-bold text-[#2B1D14]/60">
                No active rooms match your current filters.
              </p>
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
                    onSelect={handleSelectRoom}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
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
          mode={modalMode}
          roomToEdit={roomToEdit}
          onClose={handleCloseModal}
        />
      )}
      <AdminReview></AdminReview>
    </div>
  );
}
