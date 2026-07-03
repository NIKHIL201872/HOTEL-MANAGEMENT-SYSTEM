import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReservationStore } from "../../store/reservationStore";
import { usePaymentStore } from "../../store/paymentStore";
import { getHotelById } from "../../utils/hotelApi";
import "./Receipt.css";

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function formatDate(isoDate) {
  if (!isoDate) return "—";
  return new Date(isoDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Receipt() {
  const navigate = useNavigate();

  const reservation = useReservationStore((s) => s.reservation);
  const room = useReservationStore((s) => s.room);
  const roomType = useReservationStore((s) => s.roomType);
  const payment = usePaymentStore((s) => s.payment);

  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    if (room?.hotel_id) {
      getHotelById(room.hotel_id)
        .then((res) => setHotelName(res.data[0]?.name || ""))
        .catch(() => setHotelName(""));
    }
  }, [room]);

  if (!payment || !reservation) {
    return (
      <div className="receipt-page">
        <div className="receipt-card">
          <p className="receipt-subtitle">Loading your receipt...</p>
        </div>
      </div>
    );
  }

  const nights = getNights(
    reservation.check_in_date,
    reservation.check_out_date,
  );
  const roomsBooked = 1;
  const roomPrice = roomType?.price_per_night || 0;
  const roomTotal = roomPrice * roomsBooked * nights;
  const gst = roomTotal * 0.18;
  // payment.amount is the actual amount charged (source of truth);
  // fall back to the recomputed total only if it's missing for some reason.
  const grandTotal = payment.amount ?? roomTotal + gst;

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-header">
          <h1 className="receipt-title"> Payment Successful </h1>
          <p className="receipt-subtitle"> Thank you for your booking. </p>
        </div>

        <hr className="receipt-divider" />
        <h2 className="receipt-section-title"> Receipt Details </h2>

        <div className="receipt-section">
          <div className="receipt-row">
            <span className="receipt-label">Transaction ID</span>
            <span>{payment.payment_id}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Payment Method</span>
            <span>{payment.payment_method || "Online Payment"}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Payment Status</span>
            <span className="receipt-status"> {payment.payment_status}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Payment Date</span>
            <span>{formatDate(payment.payment_date)}</span>
          </div>
        </div>

        <hr className="receipt-divider" />

        <h2 className="receipt-section-title">Booking Details</h2>

        <div className="receipt-section">
          <div className="receipt-row">
            <span className="receipt-label">Hotel</span>
            <span>{hotelName || "—"}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Room Type</span>
            <span>{roomType?.type_name || "—"}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Rooms Booked</span>
            <span>{roomsBooked}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Check In</span>
            <span>{formatDate(reservation.check_in_date)}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Check Out</span>
            <span>{formatDate(reservation.check_out_date)}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Total Nights</span>
            <span>{nights}</span>
          </div>
        </div>

        <hr className="receipt-divider" />

        <h2 className="receipt-section-title">Payment Summary</h2>

        <div className="receipt-section">
          <div className="receipt-row">
            <span>Price / Night</span>
            <span>${roomPrice}</span>
          </div>

          <div className="receipt-row">
            <span>Room Total</span>
            <span>${roomTotal}</span>
          </div>

          <div className="receipt-row">
            <span>GST (18%)</span>
            <span>${gst.toFixed(2)}</span>
          </div>
        </div>

        <hr className="receipt-divider" />
        <div className="receipt-total">
          <span className="receipt-total-label">Total Paid</span>
          <span className="receipt-total-price">
            ${Number(grandTotal).toFixed(2)}
          </span>
        </div>
        <div className="receipt-button-container">
          <button
            className="receipt-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
