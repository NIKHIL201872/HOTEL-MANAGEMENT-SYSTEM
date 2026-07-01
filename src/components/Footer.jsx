import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";
import { FaInstagram, FaFacebookSquare, FaHotel } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 mt-10 px-10 py-10">
      <div className="flex flex-wrap justify-between gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-2xl font-bold font-mono">
            Hotel Management
          </h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Luxury stays, handpicked destinations. Your comfort, our priority.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-1">Quick Links</h4>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <IoHome fontSize={17} />
            Home
          </a>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <TfiWrite fontSize={17} />
            Booking
          </a>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <FaHotel fontSize={17} />
            View Hotels
          </a>
          <a
            href="#about"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <FcAbout fontSize={18} />
            About Us
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-1">Contact</h4>
          <p className="text-sm text-gray-400 flex gap-x-2 items-center">
            <FaLocationDot fontSize={18} />
            Kolkata, West Bengal, India
          </p>
          <p className="text-sm text-gray-400 flex gap-x-2 items-center">
            <IoCall fontSize={18} />
            +91-9876543210
          </p>
          <p className="text-sm text-gray-400 flex gap-x-2 items-center">
            <MdEmail fontSize={18} />
            support@hotelmgmt.com
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-1">Follow Us</h4>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <FaInstagram fontSize={18} />
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <FaFacebookSquare fontSize={18} />
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-white text-sm flex gap-x-2 items-center"
          >
            <FaSquareXTwitter fontSize={18} />
            Twitter
          </a>
        </div>
      </div>

      <div className="border-t border-white/70 mt-8 pt-4 text-sm text-gray-500 flex gap-x-2 items-center justify-center">
        <FaRegCopyright /> 2026 Hotel Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
