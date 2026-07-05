import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminStore } from "../../../store/adminStore";

const getPageNumbers = (currentPage, totalPages, delta = 1) => {
  const range = [];
  const rangeWithDots = [];
  let last;

  for (let i = 1; i <= totalPages; i++) {
    if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    last = i;
  }

  return rangeWithDots;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const goToPage = (p) => onPageChange(Math.min(Math.max(p, 1), totalPages));

  return (
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        {getPageNumbers(currentPage, totalPages).map((p, i) =>
            p === "..." ? (
                <span
                    key={`dots-${i}`}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
                >
            ...
          </span>
            ) : (
                <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition shrink-0 ${
                        p === currentPage
                            ? "bg-[#3F2E24] text-white"
                            : "text-gray-600 border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  {p}
                </button>
            ),
        )}

        <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
  );
};

const ReservationCardAdmin = ({ name, img, roomNumber, checkIn, checkOut }) => {
  const today = new Date();
  const checkedIn = today >= new Date(checkIn) && today <= new Date(checkOut);
  const checkedOut = today > new Date(checkOut);

  const statusLabel = checkedOut
      ? "Checked Out"
      : checkedIn
          ? "Checked In"
          : "Upcoming";
  const statusClass = checkedOut
      ? "bg-[#FFE3D0] text-[#D96A1B]"
      : checkedIn
          ? "bg-[#DFF4C8] text-[#2F5316]"
          : "bg-[#FCE7B2] text-[#6A4B00]";

  return (
      <div className="group rounded-2xl border border-[#2B1D14]/10 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:border-[#2B1D14]/20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
                src={img}
                className="w-12 h-12 rounded-full border-2 border-[#F3E4C6] object-cover shadow-sm"
                alt={name}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#3F2E24] truncate">
                {name}
              </p>
              <p className="text-xs text-gray-500 mt-1">Room #{roomNumber}</p>
              <p className="text-xs text-gray-400 mt-1">
                {checkIn} to {checkOut}
              </p>
            </div>
          </div>
          <span
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusClass}`}
          >
          {statusLabel}
        </span>
        </div>
      </div>
  );
};

const AllReservations = () => {
  const { reservations, rooms } = useAdminStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const roomMap = useMemo(
      () => new Map(rooms.map((r) => [r.room_id, r])),
      [rooms],
  );

  const activities = useMemo(
      () =>
          [...reservations]
              .sort((a, b) => new Date(b.check_in_date) - new Date(a.check_in_date))
              .map((res, idx) => {
                const room = roomMap.get(res.room_id);
                return {
                  name: res.guest_name,
                  roomNumber: room ? room.room_number : res.room_id,
                  checkIn: res.check_in_date,
                  checkOut: res.check_out_date,
                  img: `https://i.pravatar.cc/40?img=${(idx % 8) + 1}`,
                };
              }),
      [reservations, roomMap],
  );

  const totalPages = Math.ceil(activities.length / itemsPerPage) || 1;

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const currentReservations = activities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
  );

  return (
      <div className=" w-full min-h-[calc(100vh-120px)] flex flex-col gap-6 pt-12 font-[georgia]">
        <h1 className="font-semibold text-[#3F2E24] text-3xl sticky top-0 backdrop-blur-lg py-2">
          All Reservations
        </h1>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-gray-500 mt-1">
              Review every reservation record from one page.
            </p>
          </div>

          <span className="text-sm text-gray-500">{activities.length} total</span>
        </div>

        {activities.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#2B1D14]/15 bg-white/80 p-12 text-center">
              <p className="font-semibold text-[#3F2E24]">No reservations found.</p>
              <p className="text-sm text-gray-500 mt-2">
                Reservation records will appear here once bookings are available.
              </p>
            </div>
        ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4">
                {currentReservations.map((a, idx) => (
                    <ReservationCardAdmin
                        key={`${a.name}-${a.checkIn}-${idx}`}
                        {...a}
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
  );
};

export default AllReservations;