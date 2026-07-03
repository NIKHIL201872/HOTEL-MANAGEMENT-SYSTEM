import HotelSearch from "./components/Hotel/HotelSearch";

// this file is only for testing my portion locally
// not connected to App.jsx, safe to keep without affecting the group project
const TestHotelSearch = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDF2DF] font-mono">
      <HotelSearch />
    </div>
  );
};

export default TestHotelSearch;