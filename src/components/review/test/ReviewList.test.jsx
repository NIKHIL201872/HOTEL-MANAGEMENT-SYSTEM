import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ReviewList from "../ReviewList";
import * as reviewService from "../../../services/reviewService";

vi.mock("../../../services/reviewService", () => ({
    getReviews: vi.fn(),
    getReviewsByRating: vi.fn()
}));

const mockReviews = [
    {
        id: "1",
        review_id: 1,
        rating: 5,
        comment: "Excellent Hotel",
        review_date: "2026-07-04"
    },
    {
        id: "2",
        review_id: 2,
        rating: 4,
        comment: "Very Good",
        review_date: "2026-07-03"
    },
    {
        id: "3",
        review_id: 3,
        rating: 3,
        comment: "Average",
        review_date: "2026-07-02"
    }
];

describe("ReviewList Component", () => {

    beforeEach(() => {

        vi.clearAllMocks();

        reviewService.getReviews.mockResolvedValue({
            data: mockReviews
        });

        reviewService.getReviewsByRating.mockResolvedValue({
            data: [mockReviews[0]]
        });

    });

    test("calls getReviews on mount", async () => {

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={vi.fn()}
            />
        );

        await waitFor(() => {

            expect(reviewService.getReviews).toHaveBeenCalled();

        });

    });

    test("renders reviews", async () => {

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={vi.fn()}
            />
        );

        expect(
            await screen.findByText("Excellent Hotel")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Very Good")
        ).toBeInTheDocument();

    });

    test("changes rating filter", async () => {

        const setSelectedRating = vi.fn();

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={setSelectedRating}
            />
        );

        fireEvent.change(
            screen.getAllByRole("combobox")[0],
            {
                target: {
                    value: "5"
                }
            }
        );

        expect(setSelectedRating).toHaveBeenCalled();

    });

    test("calls getReviewsByRating", async () => {

        render(
            <ReviewList
                selectedRating="5"
                setSelectedRating={vi.fn()}
            />
        );

        await waitFor(() => {

            expect(
                reviewService.getReviewsByRating
            ).toHaveBeenCalledWith("5");

        });

    });

    test("changes date filter", () => {

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={vi.fn()}
            />
        );

        fireEvent.change(
            screen.getAllByRole("combobox")[1],
            {
                target: {
                    value: "newest"
                }
            }
        );

        expect(
            screen.getAllByRole("combobox")[1]
        ).toHaveValue("newest");

    });

    test("renders Previous button", () => {

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: /Previous/i
            })
        ).toBeInTheDocument();

    });

    test("renders Next button", () => {

        render(
            <ReviewList
                selectedRating="all"
                setSelectedRating={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: /Next/i
            })
        ).toBeInTheDocument();

    });

    test("renders Update and Delete buttons for user", async () => {

        render(
            <ReviewList
                isUser={true}
                selectedRating="all"
                setSelectedRating={vi.fn()}
                handleEditReview={vi.fn()}
                handleDeleteReview={vi.fn()}
            />
        );

        expect(
            await screen.findAllByRole("button", {
                name: /Update/i
            })
        ).toHaveLength(3);

        expect(
            screen.getAllByRole("button", {
                name: /Delete/i
            })
        ).toHaveLength(3);

    });

    test("calls handleEditReview", async () => {

        const handleEditReview = vi.fn();

        render(
            <ReviewList
                isUser={true}
                selectedRating="all"
                setSelectedRating={vi.fn()}
                handleEditReview={handleEditReview}
                handleDeleteReview={vi.fn()}
            />
        );

        fireEvent.click(
            (await screen.findAllByRole("button", {
                name: /Update/i
            }))[0]
        );

        expect(handleEditReview).toHaveBeenCalled();

    });

    test("calls handleDeleteReview", async () => {

        const handleDeleteReview = vi.fn();

        render(
            <ReviewList
                isUser={true}
                selectedRating="all"
                setSelectedRating={vi.fn()}
                handleEditReview={vi.fn()}
                handleDeleteReview={handleDeleteReview}
            />
        );

        fireEvent.click(
            (await screen.findAllByRole("button", {
                name: /Delete/i
            }))[0]
        );

        expect(handleDeleteReview).toHaveBeenCalledWith(1);

    });

});