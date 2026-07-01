import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import SpecialOffer from "./SpecialOffer";
import TopRatedHotels from "./TopRatedHotels";
import img from "../assests/aboutus.png";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <Home />
      <div className="relative mx-auto mt-6 w-[95vw] overflow-hidden rounded-2xl">
        <img
          src={img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="relative z-10 flex flex-col gap-6 p-3 sm:p-4">
          <TopRatedHotels />
          <SpecialOffer />
        </div>
      </div>
      <div className="relative mx-auto mt-6 w-[95vw] overflow-hidden rounded-2xl">
        <img
          src={img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="relative z-10 flex flex-col gap-6 p-3 sm:p-4">
          <AboutUs />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
