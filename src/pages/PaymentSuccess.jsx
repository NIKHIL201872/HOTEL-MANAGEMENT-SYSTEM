import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Receipt from "../components/payment/Receipt";
import { usePaymentStore } from "../store/paymentStore";
import { useReservationStore } from "../store/reservationStore";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment");
  const reservationId = searchParams.get("reservation");

  const fetchPayment = usePaymentStore((s) => s.fetchPayment);
  const payment = usePaymentStore((s) => s.payment);
  const reservation = useReservationStore((s) => s.reservation);
  const fetchReservation = useReservationStore((s) => s.fetchReservation);

  useEffect(() => {
    if (paymentId) fetchPayment(paymentId);
  }, [paymentId, fetchPayment]);

  useEffect(() => {
    if (reservationId && !reservation) fetchReservation(reservationId);
  }, [reservationId, reservation, fetchReservation]);

  return <Receipt paymentId={payment?.payment_id || paymentId} />;
}
