import { Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#FDF2DF]/30 backdrop-blur-sm flex items-center justify-between px-8 py-3">
      <h1 className="text-2xl font-bold text-[#3F2E24]">Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64 mr-14">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search"
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
