import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const { isAuthenticated, logout, role } = useAuthStore();
  const general =
    " px-6 py-2 rounded-lg text-[#3F2E24]! font-serif no-underline! cursor-pointer hover:bg-[#5A463A]/80 hover:text-white! active:bg-[#2a1f18] transition duration-300";
  const active =
    "bg-[#5A463A]/50 px-6 py-2 rounded-lg text-white font-serif !no-underline cursor-pointer hover:bg-[#5A463A]/80 hover:text-[#f1d096] active:bg-[#2a1f18] transition duration-300";

  const logoutHover =
    "px-6 py-2 rounded-lg text-[#3F2E24]! font-serif no-underline! cursor-pointer hover:text-[#f1d096] active:bg-[#2a1f18] transition duration-300 hover:bg-red-400!";
  if (role !== "admin") {
    return (
      <div className="flex w-full items-center justify-between px-6 py-2 bg-[#f1d096]">
        <div>
          <NavLink
            to="/"
            className=" no-underline! font-bold font-mono text-[#3F2E24]!"
          >
            <p style={{ fontSize: "2rem" }}>Hotel Management</p>
          </NavLink>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center justify-between gap-6">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? active : general)}
            >
              Home
            </NavLink>
            {/* <NavLink to="#" className={general}>
          Booking
        </NavLink> */}
            <NavLink
              to="/view-hotels"
              className={({ isActive }) => (isActive ? active : general)}
            >
              View Hotels
            </NavLink>
            {/* <a href="#about" className={general}>
              About Us
            </a> */}
            <button className={logoutHover} onClick={logout} style={{}}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? active : general)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? active : general)}
            >
              SignUp
            </NavLink>
          </div>
        )}
      </div>
    );
  }
};

export default Navbar;
