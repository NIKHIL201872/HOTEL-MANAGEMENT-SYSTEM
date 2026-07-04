import { useEffect, useState } from "react";
import "./AdminPayment.css";
import PaymentList from "./PaymentList";
import TotalRevenue from "./TotalRevenue";
import {
    getPayments,
    getPayment,
    getPaymentsByStatus,
    deletePayment
} from "../../services/paymentService";

function AdminPayment() {

    const [payments, setPayments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [paymentId, setPaymentId] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        fetchPayments(selectedStatus);
    }, [selectedStatus]);

    async function fetchPayments(status = "all") {

        try {

            let response;

            if (status === "all") {
                response = await getPayments();
            } else {
                response = await getPaymentsByStatus(status);
            }

            setPayments(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    async function fetchPaymentById() {

        if (!paymentId.trim()) {
            alert("Please enter Payment ID");
            return;
        }

        try {

            const response = await getPayment(paymentId);

            if (response.data.length > 0) {
                setSelectedPayment(response.data[0]);
            } else {
                setSelectedPayment(null);
                alert("Payment not found");
            }

        } catch (error) {
            console.log(error);
            alert("Payment not found");
        }

    }

    async function handleDeletePayment(paymentId) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this payment?"
        );

        if (!confirmDelete) return;

        try {

            await deletePayment(paymentId);

            alert("Payment deleted successfully!");

            fetchPayments(selectedStatus);

            if (
                selectedPayment &&
                selectedPayment.payment_id === paymentId
            ) {
                setSelectedPayment(null);
            }

        } catch (error) {

            console.log(error);
            alert("Failed to delete payment.");

        }

    }

    return (

        <div className="admin-payment-page">

            <h1 className="admin-payment-heading">
                Payment Management
            </h1>

            <TotalRevenue payments={payments} />

            <div className="payment-search">

                <input
                    type="number"
                    placeholder="Enter Payment ID"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                />

                <button onClick={fetchPaymentById}>
                    Search
                </button>

            </div>

            {selectedPayment && (

                <div className="payment-details-card">

                    <h2>Payment Details</h2>

                    <p>
                        <strong>Payment ID :</strong> {selectedPayment.payment_id}
                    </p>

                    <p>
                        <strong>Reservation ID :</strong> {selectedPayment.reservation_id}
                    </p>

                    <p>
                        <strong>Amount :</strong> ₹ {selectedPayment.amount}
                    </p>

                    <p>
                        <strong>Status :</strong> {selectedPayment.payment_status}
                    </p>

                    <p>
                        <strong>Date :</strong> {selectedPayment.payment_date}
                    </p>

                </div>

            )}

            <PaymentList
                payments={payments}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                handleDeletePayment={handleDeletePayment}
            />

        </div>

    );
}

export default AdminPayment;