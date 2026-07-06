import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { lazy } from "react";
import Layout from "./Layout";

const UserDashboard = lazy(() => import("../components/dashboards/UserDashboard"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const HotelSearch = lazy(() => import("../components/Hotel/HotelSearch"));
const RoomsDashboard = lazy(() => import("../components/rooms/RoomsDashboard"));
const ReservationRegistration = lazy(() => import("../pages/ReservationRegistration"));
const Payment = lazy(() => import("../components/payment/Payment"));
const Dashboard = lazy(() => import("../components/dashboards/admin/Dashboard"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const AllReservations = lazy(() => import("../components/dashboards/admin/AllReservations"));
const Transaction = lazy(() => import("../components/dashboards/admin/Transaction"));
const Reviews = lazy(() => import("../components/dashboards/admin/Reviews"));
const AddSpecialOffers = lazy(() => import("../components/dashboards/admin/AddSpecialOffers"));
const AdminRooms = lazy(() => import("../components/rooms/AdminRooms.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "view-hotels",
        element: (
          <ProtectedRoute>
            <HotelSearch />
          </ProtectedRoute>
        ),
      },
      {
        path: "rooms",
        element: (
          <ProtectedRoute>
            <RoomsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "reservations",
        element: (
          <ProtectedRoute>
            <ReservationRegistration />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },

    ],
  },
  {
    path: "admin-dashboard",
    element: (
        <ProtectedRoute allowedRole="admin">
          <Dashboard />
        </ProtectedRoute>
    ),
    children: [
      {
        path: "view-all-reservations",
        element: <AllReservations />,
      },
      {
        path: "transactions",
        element: <Transaction />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "offers",
        element: <AddSpecialOffers />,
      },
      {
        path:"manage-rooms",
        element: <AdminRooms />,
      }
    ],
  },
]);
