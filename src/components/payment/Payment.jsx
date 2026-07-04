import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardForm from "./CardForm";
import UPIForm from "./UPIForm";
import BookingSummary from "./BookingSummary";
import "./Payment.css";
import UserReview from "../review/UserReview";
import AdminReview from "../review/AdminReview";
import {
    createPayment,
    getPayments
} from "../../services/paymentService";

function Payment() {

    const [paymentMethod, setPaymentMethod] = useState("upi");

    function paymentMethodHandler(newMethod) {
        setPaymentMethod(newMethod);
    }

    async function submitPayment(paymentData) {

        try {

            const response = await getPayments();

            const payments = response.data;

            const nextPaymentId =
                payments.length === 0
                    ? 1
                    : Math.max(...payments.map(payment => payment.payment_id)) + 1;

            const payment = {
                payment_id: nextPaymentId,
                ...paymentData
            };

            await createPayment(payment);

            alert("Payment Successful!");

            console.log(payment);

        }
        catch (error) {

            console.log(error);
            alert("Payment Failed!");

        }

    }

    return (
        <div className="payment-page">

            <h1 className="payment-title">
                Payment
            </h1>

            <div className="payment-container">

                <div>
                    <BookingSummary />
                </div>

                <div className="payment-card">

                    <p className="payment-method">
                        Selected Payment Method :
                        <span className="payment-method-name">
                            {paymentMethod}
                        </span>
                    </p>

                    <div className="payment-buttons">

                        <button
                            onClick={() => paymentMethodHandler("upi")}
                            className={`payment-button ${
                                paymentMethod === "upi"
                                    ? "payment-button-upi"
                                    : "payment-button-inactive"
                            }`}
                        >
                            UPI
                        </button>

                        <button
                            onClick={() => paymentMethodHandler("card")}
                            className={`payment-button ${
                                paymentMethod === "card"
                                    ? "payment-button-card"
                                    : "payment-button-inactive"
                            }`}
                        >
                            Card
                        </button>

                    </div>

                    <div className="payment-form">

                        {
                            paymentMethod === "upi" && (
                                <UPIForm
                                    submitPayment={submitPayment}
                                />
                            )
                        }

                        {
                            paymentMethod === "card" && (
                                <CardForm
                                    submitPayment={submitPayment}
                                />
                            )
                        }

                    </div>

                </div>

            </div>

            <Receipt />

            <UserReview />

            <AdminReview />

        </div>
    );
}

export default Payment;
