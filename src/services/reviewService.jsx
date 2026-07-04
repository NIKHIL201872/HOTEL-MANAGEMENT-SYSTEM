import axios from "axios";

const API = "http://localhost:5000/reviews";

export function getReviews() {
    return axios.get(API);
}

export function createReview(review) {
    return axios.post(API, review);
}

export async function updateReview(reviewId, review) {

    const response = await axios.get(`${API}?review_id=${reviewId}`);

    if (response.data.length === 0) {
        throw new Error("Review not found");
    }

    const jsonServerId = response.data[0].id;

    return axios.put(`${API}/${jsonServerId}`, {
        ...response.data[0],
        ...review
    });
}

export async function deleteReview(reviewId) {

    const response = await axios.get(`${API}?review_id=${reviewId}`);

    if (response.data.length === 0) {
        throw new Error("Review not found");
    }

    const jsonServerId = response.data[0].id;

    return axios.delete(`${API}/${jsonServerId}`);
}

export function getReview(reviewId) {
    return axios.get(`${API}?review_id=${reviewId}`);
}

export function getReviewsByRating(rating) {
    return axios.get(`${API}?rating=${rating}`);
}