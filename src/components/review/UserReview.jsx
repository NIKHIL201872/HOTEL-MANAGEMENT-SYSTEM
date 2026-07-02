import { useState } from "react";
import "./UserReview.css";

function UserReview() {

    const [rating, setRating] = useState(0.0);

    function ratingHandler(sym) {
        if (rating < 5 && sym === "+") {
            setRating(rating + 0.5);
        }

        if (rating > 0 && sym === "-") {
            setRating(rating - 0.5);
        }
    }

    const [comment, setComment] = useState("");

    function commentHandler(e) {
        setComment(e.target.value);
    }

    function submitHandler() {
        console.log(rating);
        console.log(comment);
    }

    return (
        <div className="review-page">
            <div className="review-card">
                <h2 className="review-title">Review</h2>
                <h4 className="review-user">User Name</h4>
                <p className="review-date">Date & Time</p>
                <p className="review-rating">Rating : {rating}/5</p>
                <div className="review-rating-buttons">
                    <button className="rating-button" onClick={() => ratingHandler("+")}>+</button>
                    <button className="rating-button" onClick={() => ratingHandler("-")}>-</button>
                </div>
                <label className="review-label">Enter your review</label>
                <textarea value={comment} onChange={commentHandler} className="review-input" rows="5" placeholder="Write your review..."/>
                <button className="submit-review-button" onClick={submitHandler}>Submit</button>
            </div>
        </div>
    );
}

export default UserReview;