import { useState } from "react";
import {
  LayoutGrid,
  Calendar,
  ArrowLeftRight,
  TableOfContents,
  Menu,
  X,
} from "lucide-react";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", to: "/admin-dashboard" },
  {
    icon: Calendar,
    label: "All Reservations",
    to: "/admin-dashboard/view-all-reservations",
  },
  {
    icon: ArrowLeftRight,
    label: "Transaction",
    to: "/admin-dashboard/transactions",
  },
  { icon: TableOfContents, label: "Reviews", to: "/admin-dashboard//reviews" },
];

const Sidebar = () => {
  const { name, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger - only for mobile  */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-sm text-[#3F2E24]"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay — mobile only, shown when sidebar open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-60 h-screen xl:h-[979px] bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between px-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#3F2E24] flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-lg font-bold text-[#3F2E24]">Hotel</span>
            </div>

            {/* Close — mobile only */}
            <button
              onClick={closeSidebar}
              className="lg:hidden text-gray-400 hover:text-[#3F2E24]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ icon: Icon, label, to }) => {
              const classes = ({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#3F2E24] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`;

              return to ? (
                <NavLink
                  key={label}
                  to={to}
                  className={classes}
                  onClick={closeSidebar}
                  end
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ) : (
                <button
                  key={label}
                  disabled
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-y-4 -ml-9 font-[georgia]">
          <button
            className="border-2 border-red-400 px-2 py-1 rounded-xl! bg-red-400 text-white font-serif! flex items-center gap-x-2"
            onClick={handleLogout}
          >
            <IoLogOutOutline />
            Logout
          </button>
          <div className="flex items-center gap-0 px-2">
            <img
              src="https://thumbs.dreamstime.com/b/print-173513015.jpg"
              className="w-20 h-18 rounded-full"
              alt="admin_img"
            />
            <div className="h-8 space-y-px!">
              <p className="text-sm font-medium text-[#3F2E24]">
                {name || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
