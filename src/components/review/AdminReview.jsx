import "./AdminReview.css";

function AdminReview() {

    const rating = 4.5;
    const comment = "Good Hotel and Excellent Services";
    const username = "MS Dhoni";

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
}

export default AdminReview;