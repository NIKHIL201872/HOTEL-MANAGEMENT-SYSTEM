const AboutUs = () => {
  return (
    <div
      id="about"
      className="w-[95vw] mx-auto mt-6 rounded-2xl p-8 flex flex-col gap-6 font-[georgia]"
    >
      <h2 className="text-3xl font-bold text-center">About Us</h2>

      <div className="w-full h-64 bg-blue-300 opacity-70 rounded-xl flex items-center justify-center">
        <p className="text-gray-950 px-8 text-center text-[29px]">
          We bring you handpicked luxury stays across the world, blending
          comfort, elegance, and unforgettable experiences for every traveler.
        </p>
      </div>

      <div className="flex items-center justify-between border-t pt-4 ">
        <p className=" bg-blue-500 px-4 py-1 text-white rounded-lg">
          Location: Kolkata, India
        </p>
        <p className="text-white rounded-lg bg-blue-500 opacity-90 px-4 py-1 font-mono">
          Contact: +91-9876543210
        </p>
        {/* <button className="border-2 border-gray-400 rounded-2xl px-5 py-2 bg-yellow-200 hover:bg-gray-100">
          Map
        </button> */}
      </div>
    </div>
  );
};

export default AboutUs;
