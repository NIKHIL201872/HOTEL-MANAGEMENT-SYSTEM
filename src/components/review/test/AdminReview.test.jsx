import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AdminReview from "../AdminReview";
import * as reviewService from "../../../services/reviewService";

// Mock ReviewList
vi.mock("../ReviewList", () => ({
    default: ({ setSelectedRating }) => (
        <div>
            <div>Review List</div>

            <button
                onClick={() => setSelectedRating("5")}
            >
                Change Rating
            </button>
        </div>
    )
}));

vi.mock("../../../services/reviewService", () => ({
    getReviews: vi.fn(),
    getReview: vi.fn(),
    getReviewsByRating: vi.fn()
}));

describe("AdminReview Component", () => {

    beforeEach(() => {

        vi.clearAllMocks();

        reviewService.getReviews.mockResolvedValue({
            data: [
                {
                    review_id: 1,
                    reservation_id: 1,
                    rating: 5,
                    comment: "Excellent Hotel",
                    review_date: "2026-07-04"
                }
            ]
        });

        reviewService.getReview.mockResolvedValue({
            data: [
                {
                    review_id: 1,
                    reservation_id: 1,
                    rating: 5,
                    comment: "Excellent Hotel",
                    review_date: "2026-07-04"
                }
            ]
        });

        reviewService.getReviewsByRating.mockResolvedValue({
            data: []
        });

        window.alert = vi.fn();

    });

    test("renders Customer Reviews heading", () => {

        render(<AdminReview />);

        expect(
            screen.getByText("Customer Reviews")
        ).toBeInTheDocument();

    });

    test("calls getReviews on mount", async () => {

        render(<AdminReview />);

        await waitFor(() => {

            expect(
                reviewService.getReviews
            ).toHaveBeenCalled();

        });

    });

    test("renders search input", () => {

        render(<AdminReview />);

        expect(
            screen.getByPlaceholderText("Enter Review ID")
        ).toBeInTheDocument();

    });

    test("searches review by id", async () => {

        render(<AdminReview />);

        fireEvent.change(
            screen.getByPlaceholderText("Enter Review ID"),
            {
                target: {
                    value: "1"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Search/i
            })
        );

        await waitFor(() => {

            expect(
                reviewService.getReview
            ).toHaveBeenCalledWith("1");

        });

    });

    test("changes rating filter", async () => {

        render(<AdminReview />);

        fireEvent.click(
            screen.getByText("Change Rating")
        );

        await waitFor(() => {

            expect(
                reviewService.getReviewsByRating
            ).toHaveBeenCalledWith("5");

        });

    });

    test("renders selected review details", async () => {

        render(<AdminReview />);

        fireEvent.change(
            screen.getByPlaceholderText("Enter Review ID"),
            {
                target: {
                    value: "1"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Search/i
            })
        );

        expect(
            await screen.findByText("Excellent Hotel")
        ).toBeInTheDocument();

    });

    test("shows alert when Review ID is empty", () => {

        render(<AdminReview />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /Search/i
            })
        );

        expect(window.alert).toHaveBeenCalled();

    });

    test("renders ReviewList component", () => {

        render(<AdminReview />);

        expect(
            screen.getByText("Review List")
        ).toBeInTheDocument();

    });

});