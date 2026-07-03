import StatCard from "./StatCard";
import { useAdminStore } from "../../../store/adminStore";
import {
  CalendarPlus,
  DoorOpen,
  LogIn,
  LogOut,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatsGrid = () => {
  const { rooms, reservations } = useAdminStore();

  const today = new Date();
  const availableRooms = rooms.filter((r) => r.is_available).length;
  const checkedIn = reservations.filter((r) => {
    const checkIn = new Date(r.check_in_date);
    const checkOut = new Date(r.check_out_date);
    return checkIn <= today && today <= checkOut;
  }).length;
  const checkedOut = reservations.filter(
    (r) => new Date(r.check_out_date) < today,
  ).length;

  const stats = [
    {
      icon: <CalendarPlus size={20} />,
      value: reservations.length,
      label: "New Booking",
      bgColor: "#ACE872",
      trend: <TrendingUp size={16} className="text-green-600" />,
    },
    {
      icon: <DoorOpen size={20} />,
      value: availableRooms,
      label: "Available Room",
      bgColor: "#FFDB78",
      trend: <TrendingDown size={16} className="text-red-500" />,
    },
    {
      icon: <LogIn size={20} />,
      value: checkedIn,
      label: "Check In",
      bgColor: "#ACE872",
      trend: <TrendingUp size={16} className="text-green-600" />,
    },
    {
      icon: <LogOut size={20} />,
      value: checkedOut,
      label: "Check Out",
      bgColor: "#FF9E5B",
      trend: <TrendingUp size={16} className="text-green-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default StatsGrid;
