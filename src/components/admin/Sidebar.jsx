import {
  LayoutGrid,
  Calendar,
  Users,
  ArrowLeftRight,
  TableOfContents,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Calendar, label: "Booking" },
  { icon: Users, label: "Guests" },
  { icon: ArrowLeftRight, label: "Transaction" },
  { icon: TableOfContents, label: "Reviews" },
];

const Sidebar = () => {
  return (
    <div className="fixed w-60 h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-[#3F2E24] flex items-center justify-center text-white font-bold">
            H
          </div>
          <span className="text-lg font-bold text-[#3F2E24]">Hotel</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-[#3F2E24] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 px-2">
        <img
          src="https://i.pravatdssdsar.cc/40?img=5"
          className="w-9 h-9 rounded-full"
          alt="admin_img"
        />
        <div className="h-8 space-y-px!">
          <p className="text-sm font-medium text-[#3F2E24]">Animesh</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
