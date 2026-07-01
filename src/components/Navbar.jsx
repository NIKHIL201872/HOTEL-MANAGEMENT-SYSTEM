const Navbar = () => {
  const general =
    "bg-indigo-600 px-6 py-2 rounded-lg text-white text-decoration-none hover:bg-indigo-700 cursor-pointer active:bg-indigo-900 transition duration-300";

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 bg-blue-500 text-white">
      <div>
        <h1 className="text-3xl font-bold font-mono">Hotel Management</h1>
      </div>
      <div className="flex items-center justify-between gap-6">
        <a className={`${general}  `}>Home</a>
        <a className={`${general}  `}>Booking</a>
        <a className={`${general}  `}>View Hotels</a>
        <a href="#about" className={`${general}  `}>
          About Us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
