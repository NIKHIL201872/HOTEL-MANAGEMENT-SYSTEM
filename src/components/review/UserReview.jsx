import { useState } from "react";
import "./UserReview.css";
import { renderStars } from "../review/helper/renderStars";
import ReviewList from "./ReviewList";
import {
    createReview,
    updateReview,
    deleteReview
} from "../../services/reviewService";

function UserReview() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [editingReviewId, setEditingReviewId] = useState(null);

    const [refresh, setRefresh] = useState(false);

    const [selectedRating, setSelectedRating] = useState("all");

    function ratingHandler(sym) {

        if (sym === "+" && rating < 5) {
            setRating(rating + 1);
        }

        if (sym === "-" && rating > 0) {
            setRating(rating - 1);
        }

    }

    function commentHandler(e) {
        setComment(e.target.value);
    }

    async function submitHandler() {

        if (rating === 0) {
            alert("Please give a rating.");
            return;
        }

        if (comment.trim() === "") {
            alert("Please enter your review.");
            return;
        }

        const review = {
            reservation_id: 1,
            rating,
            comment,
            review_date: new Date().toISOString().split("T")[0]
        };

        try {

            if (editingReviewId === null) {

                await createReview(review);

                alert("Review submitted successfully!");

            } else {

                await updateReview(editingReviewId, review);

                alert("Review updated successfully!");

            }

            setRating(0);
            setComment("");
            setEditingReviewId(null);

            setRefresh(!refresh);

        }
        catch (error) {

            console.log(error);
            alert("Operation failed.");

        }

    }

    function handleEditReview(review) {

        setEditingReviewId(review.review_id);

        setRating(review.rating);

        setComment(review.comment);

    }

    async function handleDeleteReview(reviewId) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return;

        try {

            await deleteReview(reviewId);

            alert("Review deleted successfully!");

            if (editingReviewId === reviewId) {

                setEditingReviewId(null);
                setRating(0);
                setComment("");

            }

            setRefresh(!refresh);

        }
        catch (error) {

            console.log(error);
            alert("Failed to delete review.");

        }

    }

    return (

        <div className="review-page">

            <div className="review-card">

                <h2 className="review-title">
                    {editingReviewId ? "Update Review" : "Review"}
                </h2>

                <h4 className="review-user">
                    User Name
                </h4>

                <p className="review-date">
                    {new Date().toLocaleDateString()}
                </p>

                <p className="review-rating">

                    Rating :

                    <span className="stars">
                        {renderStars(rating)}
                    </span>

                    <span className="rating-value">
                        ({rating}/5)
                    </span>

                </p>

                <div className="review-rating-buttons">

                    <button
                        className="rating-button"
                        onClick={() => ratingHandler("+")}
                    >
                        +
                    </button>

                    <button
                        className="rating-button"
                        onClick={() => ratingHandler("-")}
                    >
                        -
                    </button>

                </div>

                <label className="review-label">
                    Enter your review
                </label>

                <textarea
                    className="review-input"
                    rows="5"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={commentHandler}
                />

                <button
                    className="submit-review-button"
                    onClick={submitHandler}
                >
                    {editingReviewId ? "Update Review" : "Submit"}
                </button>

            </div>

            <ReviewList
                refresh={refresh}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                isUser={true}
                handleEditReview={handleEditReview}
                handleDeleteReview={handleDeleteReview}
            />

        </div>

    );
}

export default UserReview;