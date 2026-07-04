import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import PaymentList from "../PaymentList";

const mockPayments = [
    {
        id: "1",
        payment_id: 1,
        reservation_id: 101,
        amount: 1000,
        payment_status: "Paid",
        payment_date: "2026-07-01"
    },
    {
        id: "2",
        payment_id: 2,
        reservation_id: 102,
        amount: 2000,
        payment_status: "Pending",
        payment_date: "2026-07-02"
    }
];

describe("PaymentList Component", () => {

    test("renders payment cards", () => {

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={vi.fn()}
                handleDeletePayment={vi.fn()}
            />
        );

        expect(screen.getByText("Payment 1")).toBeInTheDocument();
        expect(screen.getByText("Payment 2")).toBeInTheDocument();

    });

    test("renders payment details", () => {

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={vi.fn()}
                handleDeletePayment={vi.fn()}
            />
        );

        expect(screen.getAllByText(/Payment ID/i)).toHaveLength(2);
        expect(screen.getAllByText(/Reservation ID/i)).toHaveLength(2);
        expect(screen.getAllByText(/Amount/i)).toHaveLength(2);

        expect(screen.getAllByText("Paid").length).toBeGreaterThan(0);

        expect(screen.getByText("2026-07-01")).toBeInTheDocument();
        expect(screen.getByText("2026-07-02")).toBeInTheDocument();

    });

    test("calls setSelectedStatus when status changes", () => {

        const setSelectedStatus = vi.fn();

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={setSelectedStatus}
                handleDeletePayment={vi.fn()}
            />
        );

        fireEvent.change(screen.getAllByRole("combobox")[0], {
            target: { value: "Paid" }
        });

        expect(setSelectedStatus).toHaveBeenCalled();

    });

    test("calls delete handler", () => {

        const handleDeletePayment = vi.fn();

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={vi.fn()}
                handleDeletePayment={handleDeletePayment}
            />
        );

        fireEvent.click(
            screen.getAllByRole("button", {
                name: /Delete Payment/i
            })[0]
        );

        expect(handleDeletePayment).toHaveBeenCalledWith(1);

    });

    test("renders Previous and Next buttons", () => {

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={vi.fn()}
                handleDeletePayment={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: /Previous/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /Next/i })
        ).toBeInTheDocument();

    });

    test("renders page number", () => {

        render(
            <PaymentList
                payments={mockPayments}
                selectedStatus="all"
                setSelectedStatus={vi.fn()}
                handleDeletePayment={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: "1" })
        ).toBeInTheDocument();

    });

});