import { useEffect, useState } from "react";
import "./AdminReview.css";
import ReviewList from "./ReviewList";
import {
    getReviews,
    getReviewsByRating,
    getReview
} from "../../services/reviewService";
import { renderStars } from "../review/helper/renderStars";

function AdminReview() {
  const rating = 4.5;
  const comment = "Good Hotel and Excellent Services";
  const username = "MS Dhoni";

<<<<<<< HEAD
  return (
    <div className="admin-review-page">
      <div className="admin-review-card">
        <h2 className="admin-review-title">Customer Review</h2>
        <h4 className="admin-review-user">{username}</h4>
        <p className="admin-review-date">Date & Time</p>
        <p className="admin-review-rating">Rating : {rating}/5</p>
        <p className="admin-review-comment">{comment}</p>
      </div>
    </div>
  );
=======
    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState("all");
    const [reviewId, setReviewId] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        fetchReviews(selectedRating);
    }, [selectedRating]);

    async function fetchReviews(rating = "all") {

        try {

            let response;

            if (rating === "all") {
                response = await getReviews();
            } else {
                response = await getReviewsByRating(rating);
            }

            setReviews(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    async function fetchReviewById() {

        if (!reviewId.trim()) {
            alert("Please enter Review ID");
            return;
        }

        try {

            const response = await getReview(reviewId);

            if (response.data.length > 0) {
                setSelectedReview(response.data[0]);
            } else {
                setSelectedReview(null);
                alert("Review not found");
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }

    }

    return (
        <div className="admin-review-page">

            <h1 className="admin-review-heading">
                Customer Reviews
            </h1>

            <div className="review-search">

                <input
                    type="number"
                    placeholder="Enter Review ID"
                    value={reviewId}
                    onChange={(e) => setReviewId(e.target.value)}
                />

                <button onClick={fetchReviewById}>
                    Search
                </button>

            </div>

            {selectedReview && (

                <div className="admin-review-card">

                    <h2 className="admin-review-title">
                        Review Details
                    </h2>

                    <h4 className="admin-review-user">
                        Review #{selectedReview.review_id}
                    </h4>

                    <p className="admin-review-date">
                        {selectedReview.review_date}
                    </p>

                    <p className="admin-review-rating">
                        Rating :
                        <span className="stars">
                            {renderStars(selectedReview.rating)}
                        </span>
                    </p>

                    <p className="admin-review-comment">
                        {selectedReview.comment}
                    </p>

                </div>

            )}

            <ReviewList
                reviews={reviews}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
            />

        </div>
    );
>>>>>>> 118b66c (Payment and Review completed done with all endpoints)
}

export default AdminReview;
