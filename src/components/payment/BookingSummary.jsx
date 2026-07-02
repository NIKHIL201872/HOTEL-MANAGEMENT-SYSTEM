import "./BookingSummary.css";

function BookingSummary() {

    const bookingData = {
        hotelName: "The Grand Palace",
        roomType: "Deluxe Room",
        roomPrice: 2500,
        roomsBooked: 2,
        checkIn: "10 Jul 2026",
        checkOut: "12 Jul 2026",
        nights: 2
    };

    const roomTotal = bookingData.roomPrice * bookingData.roomsBooked * bookingData.nights;

    const gst = roomTotal * 0.18;

    const grandTotal = roomTotal + gst;

    return (
        <div className="booking-card">

            <h2 className="booking-title">
                Booking Summary
            </h2>

            <div className="booking-details">

                <div className="booking-row">
                    <span className="booking-label">Hotel Name</span>
                    <span>{bookingData.hotelName}</span>
                </div>

                <div className="booking-row">
                    <span className="booking-label">Room Type</span>
                    <span>{bookingData.roomType}</span>
                </div>

                <div className="booking-row">
                    <span className="booking-label">Rooms Booked</span>
                    <span>{bookingData.roomsBooked}</span>
                </div>

                <div className="booking-row">
                    <span className="booking-label">Check In</span>
                    <span>{bookingData.checkIn}</span>
                </div>

                <div className="booking-row">
                    <span className="booking-label">Check Out</span>
                    <span>{bookingData.checkOut}</span>
                </div>

                <div className="booking-row">
                    <span className="booking-label">Total Nights</span>
                    <span>{bookingData.nights}</span>
                </div>
            </div>

            <hr className="booking-divider" />
            <div className="booking-summary">
                <div className="booking-summary-row">
                    <span className="booking-label">Price / Night </span>
                    <span>${bookingData.roomPrice}</span>
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