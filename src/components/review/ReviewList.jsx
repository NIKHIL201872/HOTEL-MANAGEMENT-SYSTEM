import { useEffect, useState } from "react";
import "./AdminReview.css";
import { renderStars } from "../review/helper/renderStars";
import {
    getReviews,
    getReviewsByRating
} from "../../services/reviewService";

function ReviewList({
    refresh,
    selectedRating,
    setSelectedRating,
    isUser = false,
    handleEditReview,
    handleDeleteReview
}) {

    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateFilter, setDateFilter] = useState("all");

    const reviewsPerPage = 5;

    useEffect(() => {
        fetchReviews(selectedRating);
    }, [selectedRating, refresh]);

    async function fetchReviews(ratingFilter = "all") {

        try {

            let response;

            if (ratingFilter === "all") {
                response = await getReviews();
            }
            else {
                response = await getReviewsByRating(ratingFilter);
            }

            setReviews(response.data);

        }
        catch (error) {
            console.log(error);
        }

    }

    let filteredReviews = [...reviews];

    if (dateFilter === "newest") {
        filteredReviews.sort(
            (a, b) => new Date(b.review_date) - new Date(a.review_date)
        );
    }

    if (dateFilter === "oldest") {
        filteredReviews.sort(
            (a, b) => new Date(a.review_date) - new Date(b.review_date)
        );
    }

    const lastReviewIndex = currentPage * reviewsPerPage;
    const firstReviewIndex = lastReviewIndex - reviewsPerPage;

    const currentReviews = filteredReviews.slice(
        firstReviewIndex,
        lastReviewIndex
    );

    const totalPages = Math.ceil(
        filteredReviews.length / reviewsPerPage
    );

    return (
        <>

            <div className="review-filters">

                <select
                    value={selectedRating}
                    onChange={(e) => {
                        setSelectedRating(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
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

            <div className="admin-review-list">

                {currentReviews.map((review, index) => (

                    <div
                        className="review-section"
                        key={review.id}
                    >

                        <div className="admin-review-card">

                            <h4 className="admin-review-user">
                                User {firstReviewIndex + index + 1}
                            </h4>

                            <p className="admin-review-date">
                                {review.review_date}
                            </p>

                            <p className="admin-review-rating">
                                Rating :
                                <span className="stars">
                                    {renderStars(review.rating)}
                                </span>
                            </p>

                            <p className="admin-review-comment">
                                {review.comment}
                            </p>

                            {isUser && (

                                <div className="review-action-buttons">

                                    <button
                                        className="update-review-btn"
                                        onClick={() => handleEditReview(review)}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="delete-review-btn"
                                        onClick={() => handleDeleteReview(review.review_id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            )}

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

export default ReviewList;