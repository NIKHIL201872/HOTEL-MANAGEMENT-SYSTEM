import { useAdminStore } from "../../../store/adminStore";
import { NavLink } from "react-router-dom";
import {memo, useMemo} from "react";
const RecentActivities = ({render}) => {
  const { reservations, rooms } = useAdminStore();

  const roomMap = useMemo(() => {
      return new Map(rooms.map((r) => [r.room_id, r]))
  },[rooms])

  const activities = useMemo(() => {
      return [...reservations]
          .sort((a, b) => new Date(b.check_in_date) - new Date(a.check_in_date))
          .slice(0, 4)
          .map((res, idx) => {
              const room = roomMap.get(res.room_id);
              return {
                  name: res.guest_name,
                  desc: `Room #${room ? room.room_number : res.room_id}, Check-in ${res.check_in_date}`,
                  time: res.check_out_date,
                  img: `https://i.pravatar.cc/40?img=${(idx % 8) + 1}`,
              };
          })
  },[reservations,roomMap]);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#3F2E24]">Recent activities</h3>
        <NavLink
          to="/admin-dashboard/view-all-reservations"
          className="text-sm text-gray-500"
        >
          View all{">"}{" "}
        </NavLink>
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

export default memo(RecentActivities);
