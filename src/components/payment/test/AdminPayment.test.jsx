import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AdminPayment from "../AdminPayment";
import * as paymentService from "../../../services/paymentService";

vi.mock("../PaymentList", () => ({
    default: ({
        payments,
        setSelectedStatus,
        handleDeletePayment
    }) => (
        <div>
            <div>Payment List</div>

            <button
                onClick={() => setSelectedStatus("Paid")}
            >
                Change Status
            </button>

            <button
                onClick={() => handleDeletePayment(1)}
            >
                Delete Payment
            </button>

            <div>Total Payments : {payments.length}</div>
        </div>
    )
}));

vi.mock("../TotalRevenue", () => ({
    default: () => <div>Total Revenue</div>
}));

vi.mock("../../../services/paymentService", () => ({
    getPayments: vi.fn(),
    getPayment: vi.fn(),
    getPaymentsByStatus: vi.fn(),
    deletePayment: vi.fn()
}));

describe("AdminPayment Component", () => {

    beforeEach(() => {

        vi.clearAllMocks();

        paymentService.getPayments.mockResolvedValue({
            data: [
                {
                    payment_id: 1,
                    reservation_id: 101,
                    amount: 2500,
                    payment_status: "Paid",
                    payment_date: "2026-07-04"
                }
            ]
        });

        paymentService.getPayment.mockResolvedValue({
            data: [
                {
                    payment_id: 1,
                    reservation_id: 101,
                    amount: 2500,
                    payment_status: "Paid",
                    payment_date: "2026-07-04"
                }
            ]
        });

        paymentService.getPaymentsByStatus.mockResolvedValue({
            data: []
        });

        paymentService.deletePayment.mockResolvedValue({});

        window.alert = vi.fn();

        window.confirm = vi.fn(() => true);

    });

    test("renders Payment Management heading", () => {

        render(<AdminPayment />);

        expect(
            screen.getByText("Payment Management")
        ).toBeInTheDocument();

    });

    test("calls getPayments on mount", async () => {

        render(<AdminPayment />);

        await waitFor(() => {

            expect(
                paymentService.getPayments
            ).toHaveBeenCalled();

        });

    });

    test("searches payment by id", async () => {

        render(<AdminPayment />);

        fireEvent.change(
            screen.getByPlaceholderText("Enter Payment ID"),
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
                paymentService.getPayment
            ).toHaveBeenCalledWith("1");

        });

    });

    test("changes status filter", async () => {

        render(<AdminPayment />);

        fireEvent.click(
            screen.getByText("Change Status")
        );

        await waitFor(() => {

            expect(
                paymentService.getPaymentsByStatus
            ).toHaveBeenCalledWith("Paid");

        });

    });

    test("calls deletePayment API", async () => {

        render(<AdminPayment />);

        fireEvent.click(
            screen.getByText("Delete Payment")
        );

        await waitFor(() => {

            expect(
                paymentService.deletePayment
            ).toHaveBeenCalledWith(1);

        });

    });

    test("renders PaymentList component", () => {

        render(<AdminPayment />);

        expect(
            screen.getByText("Payment List")
        ).toBeInTheDocument();

    });

    test("renders TotalRevenue component", () => {

        render(<AdminPayment />);

        expect(
            screen.getByText("Total Revenue")
        ).toBeInTheDocument();

    });

});