import UserDashboard from "./components/dashboards/UserDashboard";
import RoomsDashboard from "./components/rooms/RoomsDashboard";
import HotelSearch from "./components/hotel/HotelSearch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReservationRegistration from "./pages/ReservationRegistration";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDF2DF] font-mono ">
      <UserDashboard />
      <HotelSearch />
      <RoomsDashboard />
      <Login />
      <Signup />
      <ReservationRegistration />
    </div>
  );
};

export default App;
