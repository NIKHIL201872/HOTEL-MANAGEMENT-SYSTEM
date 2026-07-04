<<<<<<< HEAD
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
=======
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReservationRegistration from './pages/ReservationRegistration';
import Payment from "./components/payment/Payment";
import AdminPayment from './components/payment/AdminPayment';

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/reservations" element={<ReservationRegistration />} />

    //     {/* Temporary: send the root to login until the real landing page lands */}
    //     <Route path="/" element={<Navigate to="/login" replace />} />
    //   </Routes>
    // </BrowserRouter>
    <>
    <Payment/>
    <AdminPayment/>
    </>
  );
}
>>>>>>> 118b66c (Payment and Review completed done with all endpoints)
