import { useEffect, useState } from "react";
import { useReservationStore } from "../../store/reservationStore";
import { getHotelById } from "../../utils/hotelApi";
import "./BookingSummary.css";

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function BookingSummary() {
  const { reservation, room, roomType } = useReservationStore();
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    if (room?.hotel_id) {
      getHotelById(room.hotel_id)
        .then((res) => setHotelName(res.data[0]?.name || ""))
        .catch(() => setHotelName(""));
    }
  }, [room]);
  // console.log(reservation);
  if (!reservation) {
    return (
      <div className="booking-card">
        <h2 className="booking-title">Booking Summary</h2>
        <p>No reservation found. Please book a room first.</p>
      </div>
    );
  }

  const nights = getNights(
    reservation.check_in_date,
    reservation.check_out_date,
  );
  const roomPrice = roomType?.price_per_night || 0;
  const roomsBooked = 1;
  const roomTotal = roomPrice * roomsBooked * nights;
  const gst = roomTotal * 0.18;
  const grandTotal = roomTotal + gst;

  return (
    <div className="booking-card">
      <h2 className="booking-title">Booking Summary</h2>

      <div className="booking-details">
        <div className="booking-row">
          <span className="booking-label">Hotel Name</span>
          <span>{hotelName || "—"}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Room Type</span>
          <span>{roomType?.type_name || "—"}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Rooms Booked</span>
          <span>{roomsBooked}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Check In</span>
          <span>{reservation.check_in_date}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Check Out</span>
          <span>{reservation.check_out_date}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Total Nights</span>
          <span>{nights}</span>
        </div>
      </div>

      <hr className="booking-divider" />
      <div className="booking-summary">
        <div className="booking-summary-row">
          <span className="booking-label">Price / Night </span>
          <span>${roomPrice}</span>
        </div>

        <div className="booking-summary-row">
          <span className="booking-label">Room Total : </span>
          <span>${roomTotal}</span>
        </div>

        <div className="booking-summary-row">
          <span className="booking-label">GST (18%): </span>
          <span>${gst.toFixed(2)}</span>
        </div>
      </div>
      <hr className="booking-divider" />
      <div className="booking-total">
        <span className="booking-total-label">Total Amount: </span>
        <span className="booking-total-price">${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default BookingSummary;
