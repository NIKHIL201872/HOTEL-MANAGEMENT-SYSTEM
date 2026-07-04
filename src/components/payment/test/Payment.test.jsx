import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Payment from "../Payment";
import * as paymentService from "../../../services/paymentService";

vi.mock("../BookingSummary", () => ({
    default: () => <div>Booking Summary</div>
}));

vi.mock("../Receipt", () => ({
    default: () => <div>Receipt</div>
}));

vi.mock("../../review/UserReview", () => ({
    default: () => <div>User Review</div>
}));

vi.mock("../../review/AdminReview", () => ({
    default: () => <div>Admin Review</div>
}));

vi.mock("../CardForm", () => ({
    default: ({ submitPayment }) => (
        <button
            onClick={() =>
                submitPayment({
                    reservation_id: 1,
                    amount: 5000,
                    payment_date: "2026-07-04",
                    payment_status: "Paid"
                })
            }
        >
            Mock Card Payment
        </button>
    )
}));

vi.mock("../UPIForm", () => ({
    default: ({ submitPayment }) => (
        <button
            onClick={() =>
                submitPayment({
                    reservation_id: 1,
                    amount: 3000,
                    payment_date: "2026-07-04",
                    payment_status: "Paid"
                })
            }
        >
            Mock UPI Payment
        </button>
    )
}));

vi.mock("../../../services/paymentService", () => ({
    getPayments: vi.fn(),
    createPayment: vi.fn()
}));

describe("Payment Component", () => {

    beforeEach(() => {

        vi.clearAllMocks();

        paymentService.getPayments.mockResolvedValue({
            data: []
        });

        paymentService.createPayment.mockResolvedValue({});

        window.alert = vi.fn();

    });

    test("renders Payment heading", () => {

        render(<Payment />);

        expect(screen.getByText("Payment")).toBeInTheDocument();

    });

    test("renders Booking Summary", () => {

        render(<Payment />);

        expect(screen.getByText("Booking Summary")).toBeInTheDocument();

    });

    test("UPI form shown by default", () => {

        render(<Payment />);

        expect(screen.getByText("Mock UPI Payment")).toBeInTheDocument();

    });

    test("switches to Card form", () => {

        render(<Payment />);

        fireEvent.click(
            screen.getByRole("button", { name: /Card/i })
        );

        expect(
            screen.getByText("Mock Card Payment")
        ).toBeInTheDocument();

    });

    test("switches back to UPI", () => {

        render(<Payment />);

        fireEvent.click(
            screen.getByRole("button", { name: /Card/i })
        );

        fireEvent.click(
            screen.getByRole("button", { name: /UPI/i })
        );

        expect(
            screen.getByText("Mock UPI Payment")
        ).toBeInTheDocument();

    });

    test("calls getPayments and createPayment API", async () => {

        render(<Payment />);

        fireEvent.click(
            screen.getByText("Mock UPI Payment")
        );

        await waitFor(() => {

            expect(
                paymentService.getPayments
            ).toHaveBeenCalled();

            expect(
                paymentService.createPayment
            ).toHaveBeenCalled();

        });

    });

});