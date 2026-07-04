import { useState } from "react";
import "./AdminPayment.css";

function PaymentList({
    payments,
    selectedStatus,
    setSelectedStatus,
    handleDeletePayment
}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [dateFilter, setDateFilter] = useState("all");

    const paymentsPerPage = 5;

    let filteredPayments = [...payments];

    if (dateFilter === "newest") {
        filteredPayments.sort(
            (a, b) => new Date(b.payment_date) - new Date(a.payment_date)
        );
    }

    if (dateFilter === "oldest") {
        filteredPayments.sort(
            (a, b) => new Date(a.payment_date) - new Date(b.payment_date)
        );
    }

    const lastPaymentIndex = currentPage * paymentsPerPage;
    const firstPaymentIndex = lastPaymentIndex - paymentsPerPage;

    const currentPayments = filteredPayments.slice(
        firstPaymentIndex,
        lastPaymentIndex
    );

    const totalPages = Math.ceil(
        filteredPayments.length / paymentsPerPage
    );

    return (
        <>

            <div className="payment-filters">

                <select
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                </select>

                <select
                    value={dateFilter}
                    onChange={(e) => {
                        setDateFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Dates</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>

            </div>

            <div className="payment-list">

                {currentPayments.map((payment, index) => (

                    <div
                        className="payment-section"
                        key={payment.id}
                    >

                        <div className="payment-card">

                            <h4 className="payment-user">
                                Payment {firstPaymentIndex + index + 1}
                            </h4>

                            <p className="payment-id">
                                <strong>Payment ID :</strong> {payment.payment_id}
                            </p>

                            <p className="reservation-id">
                                <strong>Reservation ID :</strong> {payment.reservation_id}
                            </p>

                            <p className="payment-amount">
                                <strong>Amount :</strong> $ {payment.amount}
                            </p>

                            <p className="payment-status">
                                <strong>Status :</strong> {payment.payment_status}
                            </p>

                            <p className="payment-date">
                                <strong>Date :</strong> {payment.payment_date}
                            </p>

                            <button
                                className="delete-payment-btn"
                                onClick={() => handleDeletePayment(payment.payment_id)}
                            >
                                Delete Payment
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <div className="pagination">

                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (

                    <button
                        key={index}
                        className={
                            currentPage === index + 1
                                ? "active-page"
                                : ""
                        }
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>

                ))}

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

            </div>

        </>
    );
}

export default PaymentList;