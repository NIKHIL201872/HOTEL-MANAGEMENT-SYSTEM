import { MdOutlineDateRange } from "react-icons/md";
import { useAdminStore } from "../../../store/adminStore";

const BookingsCard = () => {
  const rooms = useAdminStore((s) => s.rooms);
  const reservations = useAdminStore((s) => s.reservations);

  const totalRooms = rooms.length || 1;
  const bookedRooms = rooms.filter((r) => !r.is_available).length;
  const availableRooms = totalRooms - bookedRooms;
  const bookedPercent = Math.round((bookedRooms / totalRooms) * 100);
  const availablePercent = 100 - bookedPercent;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#3F2E24]">Bookings</h3>
        <button className="text-sm border rounded-lg px-3 py-1 text-gray-600 flex items-center gap-x-2">
          <MdOutlineDateRange fontSize={18} /> Monthly
        </button>
      </div>

      <div>
        <span className="text-2xl font-bold text-[#3F2E24]">{reservations.length}</span>
        <span className="text-sm text-gray-500 ml-2">Total Bookings</span>
      </div>

      <div className="flex gap-1 h-10 rounded-lg overflow-hidden">
        <div className="bg-[#ACE872]" style={{ width: `${bookedPercent}%` }} />
        <div className="bg-[#FF9E5B]" style={{ width: `${availablePercent}%` }} />
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Booked Rooms</p>
          <p className="font-semibold text-[#3F2E24]">{bookedRooms}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Available Rooms</p>
          <p className="font-semibold text-[#3F2E24]">{availableRooms}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
