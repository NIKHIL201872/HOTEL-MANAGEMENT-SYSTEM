import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UserReview from "../UserReview";
import AdminReview from "../AdminReview";

vi.mock("../ReviewList", () => ({
    default: () => <div>Review List</div>
}));

vi.mock("../../../services/reviewService", () => ({
    createReview: vi.fn(),
    updateReview: vi.fn(),
    deleteReview: vi.fn()
}));

describe("Review Components", () => {

    beforeEach(() => {
        window.alert = vi.fn();
        window.confirm = vi.fn(() => true);
    });

    test("renders Customer Reviews heading", () => {

        render(<AdminReview />);

        expect(
            screen.getByText("Customer Reviews")
        ).toBeInTheDocument();

    });

    test("user able to increase the rating", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", { name: "+" })
        );

        await waitFor(() => {
            expect(
                screen.getByText("(1/5)")
            ).toBeInTheDocument();
        });

    });

    test("user able to decrease the rating", async () => {

        render(<UserReview />);

        await userEvent.click(
            screen.getByRole("button", { name: "+" })
        );

        await userEvent.click(
            screen.getByRole("button", { name: "-" })
        );

        await waitFor(() => {
            expect(
                screen.getByText("(0/5)")
            ).toBeInTheDocument();
        });

    });

    test("user able to enter a comment", async () => {

        render(<UserReview />);

        const commentBox = screen.getByPlaceholderText(
            "Write your review..."
        );

        await userEvent.type(
            commentBox,
            "Excellent Hotel"
        );

        expect(commentBox).toHaveValue(
            "Excellent Hotel"
        );

    });

});