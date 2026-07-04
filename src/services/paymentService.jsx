import axios from "axios";

const API = "http://localhost:5000/payments";

export function getPayments() {
    return axios.get(API);
}

export function createPayment(payment) {
    return axios.post(API, payment);
}

export function getPayment(paymentId) {
    return axios.get(`${API}?payment_id=${paymentId}`);
}

export function getPaymentsByStatus(status) {
    return axios.get(`${API}?payment_status=${status}`);
}

export function deletePayment(id) {
    return axios.delete(`${API}/${id}`);
}