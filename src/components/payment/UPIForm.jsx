import { useState } from "react";
import "./UPIForm.css";

function UPIForm({ submitPayment }) {

    const [upiDetails, setUpiDetails] = useState({
        upiId: "",
        amount: ""
    });

    function upiHandler(e) {

        const { name, value } = e.target;

        setUpiDetails({
            ...upiDetails,
            [name]: value
        });

    }

    function payHandler() {

        const { upiId, amount } = upiDetails;

        // Empty Validation
        if (!upiId || !amount) {
            alert("Please fill all fields.");
            return;
        }

        // UPI Validation
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;

        if (!upiRegex.test(upiId)) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        // Amount Validation
        if (Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const payment = {
            reservation_id: 1,
            amount: Number(amount),
            payment_date: new Date().toISOString().split("T")[0],
            payment_status: "Paid"
        };

        submitPayment(payment);

        // Clear form
        setUpiDetails({
            upiId: "",
            amount: ""
        });

    }

    return (
        <div className="upi-form">

            <h2 className="upi-title">
                UPI Payment
            </h2>

            <div>

                <label className="upi-label">
                    Enter your UPI ID
                </label>

                <input
                    type="text"
                    name="upiId"
                    value={upiDetails.upiId}
                    onChange={upiHandler}
                    placeholder="example@oksbi"
                    className="upi-input"
                />

            </div>

            <div>

                <label className="upi-label">
                    Amount to Pay
                </label>

                <input
                    type="number"
                    name="amount"
                    min="1"
                    value={upiDetails.amount}
                    onChange={upiHandler}
                    placeholder="Enter Amount"
                    className="upi-input"
                />

            </div>

            <button
                onClick={payHandler}
                className="upi-button"
            >
                Pay Now
            </button>

        </div>
    );
}

export default UPIForm;
