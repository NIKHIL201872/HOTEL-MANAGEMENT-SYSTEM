import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import UserDashboard from "./components/dashboards/UserDashboard";
import RoomsDashboard from "./components/rooms/RoomsDashboard";
import HotelSearch from "./components/hotel/HotelSearch";
import Payment from "./components/payment/Payment";
import AdminPayment from './components/payment/AdminPayment';


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReservationRegistration from "./pages/ReservationRegistration";
import ProtectedRoute from './routes/ProtectedRoute'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
        <Route path="/search" element={<HotelSearch />} />
        <Route path="/rooms" element={<RoomsDashboard />} />
        
        
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

       
        <Route 
          path="/admin/payments" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPayment />
            </ProtectedRoute>
          } 
        />

        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}