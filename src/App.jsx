// src/App.jsx
import React from 'react'
import RoomsDashboard from './components/rooms/RoomsDashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* If your team is using a navbar component, you can put it here */}
      
      <main>
        <RoomsDashboard />
      </main>
    </div>
  )
}

export default App
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReservationRegistration from './pages/ReservationRegistration';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reservations" element={<ReservationRegistration />} />

        {/* Temporary: send the root to login until the real landing page lands */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
