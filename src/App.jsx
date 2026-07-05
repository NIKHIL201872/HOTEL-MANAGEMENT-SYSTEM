import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReservationRegistration from './pages/ReservationRegistration';
// Adjust this import path depending on exactly where you saved ProtectedRoute.jsx
import ProtectedRoute from './routes/ProtectedRoute'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* MODIFIED: Wrapped the reservation route in the security gate */}
        <Route 
          path="/reservations" 
          element={
            <ProtectedRoute>
              <ReservationRegistration />
            </ProtectedRoute>
          } 
        />

        {/* Temporary: send the root to login until the real landing page lands */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}