import StatCard from "./StatCard";

const stats = [
  {
    icon: "📅",
    value: "1,839",
    label: "New Booking",
    bgColor: "#ACE872",
    trend: "📈",
  },
  {
    icon: "📋",
    value: "837",
    label: "Available Room",
    bgColor: "#FFDB78",
    trend: "📉",
  },
  {
    icon: "➡️",
    value: "148",
    label: "Check In",
    bgColor: "#ACE872",
    trend: "📈",
  },
  {
    icon: "⬅️",
    value: "82",
    label: "Check Out",
    bgColor: "#FF9E5B",
    trend: "📈",
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default StatsGrid;
