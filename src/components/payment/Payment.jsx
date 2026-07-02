import { useState } from "react";
import CardForm from "./CardForm";
import UPIForm from "./UPIForm";
import BookingSummary from "./BookingSummary";
import Receipt from "./Receipt";
import "./Payment.css";
import UserReview from "../review/UserReview";
import AdminReview from "../review/AdminReview";

function Payment() {

    const [paymentMethod, setPaymentMethod] = useState("upi");

    function paymentMethodHandler(newMethod) {
        setPaymentMethod(newMethod);
        console.log(paymentMethod);
    }

    return (
        <div className="payment-page">
            <h1 className="payment-title">Payment</h1>
            <div className="payment-container">
                <div>
                    <BookingSummary />
                </div>
                <div className="payment-card">
                    <p className="payment-method">
                        Selected Payment Method :
                        <span className="payment-method-name">{paymentMethod}</span>
                    </p>
                    <div className="payment-buttons">
                        <button onClick={() => paymentMethodHandler("upi")} className={`payment-button ${paymentMethod === "upi"? "payment-button-upi": "payment-button-inactive"}`}>UPI</button>
                        <button onClick={() => paymentMethodHandler("card")} className={`payment-button ${paymentMethod === "card"? "payment-button-card": "payment-button-inactive" }`}>Card</button>
                    </div>
                    <div className="payment-form">
                        {
                            paymentMethod === "upi" &&
                            <UPIForm />
                        }

                        {
                            paymentMethod === "card" &&
                            <CardForm />
                        }
                    </div>
                </div>
            </div>

            <Receipt />
            <UserReview/>
            <AdminReview/>
        </div>
    );
}

export default Payment;