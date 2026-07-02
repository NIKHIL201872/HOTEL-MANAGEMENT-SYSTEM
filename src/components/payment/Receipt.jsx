import "./Receipt.css";

function Receipt() {

    const receiptData = {
        transactionId: "TXN202607010001",
        paymentMethod: "UPI",
        paymentStatus: "Success",
        paymentDate: "01 Jul 2026",
        paymentTime: "05:30 PM",

        hotelName: "The Grand Palace",
        roomType: "Deluxe Room",
        roomsBooked: 2,
        checkIn: "10 Jul 2026",
        checkOut: "12 Jul 2026",
        nights: 2,

        roomPrice: 2500
    };

    const roomTotal = receiptData.roomPrice * receiptData.roomsBooked * receiptData.nights;

    const gst = roomTotal * 0.18;

    const grandTotal = roomTotal + gst;

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
                        <span>{receiptData.transactionId}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Payment Method</span>
                        <span>{receiptData.paymentMethod}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Payment Status</span>
                        <span className="receipt-status"> {receiptData.paymentStatus}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Payment Date</span>
                        <span>{receiptData.paymentDate}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Payment Time</span>
                        <span>{receiptData.paymentTime}</span>
                    </div>

                </div>

                <hr className="receipt-divider" />

                <h2 className="receipt-section-title">Booking Details</h2>

                <div className="receipt-section">

                    <div className="receipt-row">
                        <span className="receipt-label">Hotel</span>
                        <span>{receiptData.hotelName}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Room Type</span>
                        <span>{receiptData.roomType}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Rooms Booked</span>
                        <span>{receiptData.roomsBooked}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Check In</span>
                        <span>{receiptData.checkIn}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Check Out</span>
                        <span>{receiptData.checkOut}</span>
                    </div>

                    <div className="receipt-row">
                        <span className="receipt-label">Total Nights</span>
                        <span>{receiptData.nights}</span>
                    </div>

                </div>

                <hr className="receipt-divider" />

                <h2 className="receipt-section-title">Payment Summary</h2>

                <div className="receipt-section">

                    <div className="receipt-row">
                        <span>Price / Night</span>
                        <span>${receiptData.roomPrice}</span>
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
                    <span className="receipt-total-price">${grandTotal.toFixed(2)}</span>
                </div>
                <div className="receipt-button-container">
                    <button className="receipt-button">Back to Home</button>
                </div>
            </div>
        </div>
    );
}

export default Receipt;