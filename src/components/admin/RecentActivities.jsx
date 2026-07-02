const activities = [
  {
    name: "Wade Warren",
    desc: "Room #2747, requested for a coffee and water",
    time: "16 mins",
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Esther Howard",
    desc: "Room #3565, Book and manage conference.",
    time: "24 mins",
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Leslie Alexander",
    desc: "Room #3546, Provide information about local.",
    time: "32 mins",
    img: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Guy Hawkins",
    desc: "Room #5654, Allow guests to view and settle.",
    time: "48 mins",
    img: "https://i.pravatar.cc/40?img=4",
  },
];

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#3F2E24]">Recent activities</h3>
        <button className="text-sm text-gray-500">View all ›</button>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {activities.map((a) => (
          <div key={a.name} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <img src={a.img} className="w-9 h-9 rounded-full" alt={a.name} />
              <div>
                <p className="text-sm font-medium text-[#3F2E24]">{a.name}</p>
                <p className="text-xs text-gray-400">{a.desc}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
