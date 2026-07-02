const Navbar = () => {
  const general =
    "bg-[#be8c35] px-6 py-2 rounded-lg text-white !no-underline cursor-pointer hover:bg-[#5A463A] hover:text-[#f1d096] active:bg-[#2a1f18] transition duration-300";

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 bg-[#f1d096]">
      <div>
        <h1 className="text-3xl font-bold font-mono text-[#3F2E24]">
          Hotel Management
        </h1>
      </div>
      <div className="flex items-center justify-between gap-6">
        <a href="#" className={general}>
          Home
        </a>
        <a href="#" className={general}>
          Booking
        </a>
        <a href="#" className={general}>
          View Hotels
        </a>
        <a href="#about" className={general}>
          About Us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
