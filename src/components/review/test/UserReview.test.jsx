import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UserReview from "../UserReview";
import * as reviewService from "../../../services/reviewService";

vi.mock("../ReviewList", () => ({
    default: () => <div>Review List</div>
}));

vi.mock("../../../services/reviewService", () => ({
    createReview: vi.fn(),
    updateReview: vi.fn(),
    deleteReview: vi.fn()
}));

describe("UserReview Component", () => {

    beforeEach(() => {

        vi.clearAllMocks();

        reviewService.createReview.mockResolvedValue({});

        reviewService.updateReview.mockResolvedValue({});

        reviewService.deleteReview.mockResolvedValue({});

        window.alert = vi.fn();

        window.confirm = vi.fn(() => true);

    });

    test("renders Review heading", () => {

        render(<UserReview />);

        expect(
            screen.getByText("Review")
        ).toBeInTheDocument();

    });

    test("initial rating is 0", () => {

        render(<UserReview />);

        expect(
            screen.getByText("(0/5)")
        ).toBeInTheDocument();

    });

    test("increase rating", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", { name: "+" })
        );

        expect(
            screen.getByText("(1/5)")
        ).toBeInTheDocument();

    });

    test("decrease rating", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", { name: "+" })
        );

        await userEvent.click(
            screen.getByRole("button", { name: "-" })
        );

        expect(
            screen.getByText("(0/5)")
        ).toBeInTheDocument();

    });

    test("user types review", async () => {

        render(<UserReview />);

        const textarea = screen.getByPlaceholderText(
            "Write your review..."
        );

        await userEvent.type(
            textarea,
            "Excellent Hotel"
        );

        expect(textarea).toHaveValue(
            "Excellent Hotel"
        );

    });

    test("cannot submit without rating", async () => {

        render(<UserReview />);

        await userEvent.type(
            screen.getByPlaceholderText("Write your review..."),
            "Excellent Hotel"
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Submit/i
            })
        );

        expect(window.alert).toHaveBeenCalled();

        expect(reviewService.createReview).not.toHaveBeenCalled();

    });

    test("cannot submit without comment", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", {
                name: "+"
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Submit/i
            })
        );

        expect(window.alert).toHaveBeenCalled();

        expect(reviewService.createReview).not.toHaveBeenCalled();

    });

    test("calls createReview API", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", {
                name: "+"
            })
        );

        await userEvent.type(
            screen.getByPlaceholderText("Write your review..."),
            "Excellent Hotel"
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Submit/i
            })
        );

        await waitFor(() => {

            expect(
                reviewService.createReview
            ).toHaveBeenCalled();

        });

    });

    test("createReview payload is correct", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", {
                name: "+"
            })
        );

        await userEvent.type(
            screen.getByPlaceholderText("Write your review..."),
            "Excellent Hotel"
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Submit/i
            })
        );

        await waitFor(() => {

            expect(
                reviewService.createReview
            ).toHaveBeenCalledWith({
                reservation_id: 1,
                rating: 1,
                comment: "Excellent Hotel",
                review_date: expect.any(String)
            });

        });

    });

});