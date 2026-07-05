import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components from your team
import UserDashboard from "./components/dashboards/UserDashboard";
import RoomsDashboard from "./components/rooms/RoomsDashboard";
import HotelSearch from "./components/hotel/HotelSearch";
import Payment from "./components/payment/Payment";
import AdminPayment from './components/payment/AdminPayment';

// Your Auth & Registration Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReservationRegistration from "./pages/ReservationRegistration";
import ProtectedRoute from './routes/ProtectedRoute'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<HotelSearch />} />
        <Route path="/rooms" element={<RoomsDashboard />} />
        
        {/* Protected User Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservations" 
          element={
            <ProtectedRoute>
              <ReservationRegistration />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/payments" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPayment />
            </ProtectedRoute>
          } 
        />

        {/* Default fallback */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}