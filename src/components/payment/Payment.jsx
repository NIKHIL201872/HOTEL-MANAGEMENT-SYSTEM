import {useState, useEffect, useMemo} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardForm from "./CardForm";
import UPIForm from "./UPIForm";
import BookingSummary from "./BookingSummary";
import "./Payment.css";
import UserReview from "../review/UserReview";
import AdminReview from "../review/AdminReview";

import {useReservationStore} from "../../store/reservationStore.js";
import {usePaymentStore} from "../../store/paymentStore.js";

function getNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
}

function Payment() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reservationId = searchParams.get("reservation");

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const {reservation,fetchReservation,roomType} = useReservationStore();
    const createPayment = usePaymentStore((s) => s.createPayment);

    useEffect(() => {
        if (
            reservationId &&
            (!reservation ||
                String(reservation.reservation_id) !== String(reservationId))
        ) {
            fetchReservation(reservationId);
        }
    }, [reservationId, reservation, fetchReservation]);

    const amount = useMemo(() => {
        if (!reservation) return 0;
        const nights = getNights(
            reservation.check_in_date,
            reservation.check_out_date,
        );
        const roomTotal = nights * (roomType?.price_per_night || 0);
        return Number((roomTotal * 1.18).toFixed(2));
    }, [reservation, roomType]);

    function paymentMethodHandler(newMethod) {
        setPaymentMethod(newMethod);
    }

    async function submitPayment(paymentData) {

        if (!reservation) return;

        const result = await createPayment({
            reservation_id: reservation.reservation_id,
            amount,
            payment_method: paymentMethod === "upi" ? "UPI" : "Card",
        });

        if (result.success) {
            navigate(
                `/payment-success?payment=${result.payment.payment_id}&reservation=${reservation.reservation_id}`,
            );
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
                                    onPay={submitPayment}
                                />
                            )
                        }

                    </div>

                </div>

            </div>

            {/* <Receipt />

            <UserReview />

            <AdminReview /> */}

        </div>
    );
}

export default Payment;