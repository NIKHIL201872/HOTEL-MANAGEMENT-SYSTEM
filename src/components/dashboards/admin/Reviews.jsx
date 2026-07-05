import { useEffect, useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminStore } from "../../../store/adminStore";

const ITEMS_PER_PAGE = 16;

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={14}
                className={
                    i < rating
                        ? "fill-[#FFDB78] text-[#FFDB78]"
                        : "fill-transparent text-gray-300"
                }
            />
        ))}
    </div>
);

const ReviewCard = ({ review }) => {
    const initial = review.guest_name?.charAt(0)?.toUpperCase() || "?";

    return (
        <div className="bg-white w-full rounded-2xl p-3 border border-gray-100 flex flex-col gap-3 hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3F2E24] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                        {initial}
                    </div>
                    <div>
                        <p
                            className="text-sm font-semibold text-[#3F2E24]"
                            style={{ marginBottom: "5px" }}
                        >
                            {review.guest_name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {review.room_number ? `Room #${review.room_number}` : "—"}
                        </p>
                    </div>
                </div>
                <StarRating rating={review.rating} />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 font-bold">
                {review.comment}
            </p>

            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                {review.review_date}
            </p>
        </div>
    );
};

const Reviews = () => {
    const { reviews, reservations, rooms, fetchDashboardData, loading } =
        useAdminStore();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!reviews.length) fetchDashboardData();
    }, [fetchDashboardData, reviews.length]);

    const data = useMemo(() => {
        const reservationMap = new Map(
            reservations.map((r) => [r.reservation_id, r]),
        );
        const roomMap = new Map(rooms.map((r) => [r.room_id, r]));

        return reviews
            .map((rv) => {
                const reservation = reservationMap.get(rv.reservation_id);
                const room = reservation ? roomMap.get(reservation.room_id) : null;

                return {
                    id: rv.review_id,
                    guest_name: reservation?.guest_name || "Guest",
                    room_number: room?.room_number,
                    comment: rv.comment,
                    review_date: rv.review_date,
                    rating: rv.rating,
                };
            })
            .sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
    }, [reviews, reservations, rooms]);

    const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const paginated = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const avgRating = data.length
        ? (
            data.reduce((sum, r) => sum + Number(r.rating), 0) / data.length
        ).toFixed(1)
        : "0.0";

    const goToPage = (p) => setPage(Math.min(Math.max(p, 1), totalPages));

    const getPageNumbers = () => {
        const delta = 1; // pages shown around current
        const range = [];
        const rangeWithDots = [];
        let last;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        for (const i of range) {
            if (last) {
                if (i - last === 2) {
                    rangeWithDots.push(last + 1);
                } else if (i - last > 2) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            last = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="w-full flex flex-col flex-wrap gap-6 pt-12 font-[georgia]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#3F2E24]">Reviews</h2>
                    <p className="text-sm text-gray-500">
                        {data.length} reviews · Avg rating {avgRating}
                    </p>
                </div>
                <StarRating rating={Math.round(avgRating)} />
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center font-semibold text-[#3F2E24]/70 text-sm uppercase tracking-wider">
                    Loading reviews...
                </div>
            ) : data.length ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {paginated.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>

                            {getPageNumbers().map((p, i) =>
                                    p === "..." ? (
                                        <span
                                            key={`dots-${i}`}
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
                                        >
                    ...
                  </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => goToPage(p)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition shrink-0 ${
                                                p === currentPage
                                                    ? "bg-[#3F2E24] text-white"
                                                    : "text-gray-600 border border-gray-200 hover:bg-gray-100"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ),
                            )}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-8 px-3 flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-sm text-gray-400">
                    No reviews found.
                </div>
            )}
        </div>
    );
};

export default Reviews;