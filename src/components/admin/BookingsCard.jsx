import { MdOutlineDateRange } from "react-icons/md";

const BookingsCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#3F2E24]">Bookings</h3>
        <button className="text-sm border rounded-lg px-3 py-1 text-gray-600 flex items-center gap-x-2">
          <MdOutlineDateRange fontSize={18} /> Monthly
        </button>
      </div>

      <div>
        <span className="text-2xl font-bold text-[#3F2E24]">20,395.50</span>
        <span className="text-sm text-gray-500 ml-2">Total Bookings</span>
      </div>

      <div className="flex gap-1 h-10 rounded-lg overflow-hidden">
        <div className="bg-[#ACE872]" style={{ width: "68%" }} />
        <div className="bg-[#FF9E5B]" style={{ width: "32%" }} />
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Online Booking</p>
          <p className="font-semibold text-[#3F2E24]">14,839</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Offline Booking</p>
          <p className="font-semibold text-[#3F2E24]">6,738</p>
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
