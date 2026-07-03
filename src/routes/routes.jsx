import { createBrowserRouter } from "react-router-dom";
import UserDashboard from "../components/dashboards/UserDashboard";
import Layout from "./Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HotelSearch from "../components/hotel/HotelSearch";
import RoomsDashboard from "../components/rooms/RoomsDashboard";
import ReservationRegistration from "../pages/ReservationRegistration";
import Payment from "../components/payment/Payment";
import Dashboard from "../components/dashboards/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PaymentSuccess from "../pages/PaymentSuccess";
import AllReservations from "../components/dashboards/admin/AllReservations";
import Transaction from "../components/dashboards/admin/Transaction";
import Reviews from "../components/dashboards/admin/Reviews";

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
        ],
      },
    ],
  },
]);
