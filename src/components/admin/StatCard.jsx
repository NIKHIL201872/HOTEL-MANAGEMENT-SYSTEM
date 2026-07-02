const StatCard = ({ icon, value, label, bgColor, trend }) => {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-gray-100">
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        <span className="text-sm">{trend}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#3F2E24]">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
