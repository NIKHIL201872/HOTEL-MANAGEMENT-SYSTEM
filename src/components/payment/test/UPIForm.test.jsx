import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UPIForm from "../UPIForm";

describe("UPIForm Component", () => {

    test("renders UPI Payment heading", () => {

        render(<UPIForm submitPayment={vi.fn()} />);

        expect(
            screen.getByText("UPI Payment")
        ).toBeInTheDocument();

    });

    test("renders all input fields", () => {

        render(<UPIForm submitPayment={vi.fn()} />);

        expect(
            screen.getByPlaceholderText("example@oksbi")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Enter Amount")
        ).toBeInTheDocument();

    });

    test("user can type UPI ID", async () => {

        render(<UPIForm submitPayment={vi.fn()} />);

        const input = screen.getByPlaceholderText("example@oksbi");

        await userEvent.type(input, "akshay@oksbi");

        expect(input).toHaveValue("akshay@oksbi");

    });

    test("user can type amount", async () => {

        render(<UPIForm submitPayment={vi.fn()} />);

        const input = screen.getByPlaceholderText("Enter Amount");

        await userEvent.type(input, "2500");

        expect(input).toHaveValue(2500);

    });

    test("does not call submitPayment when fields are empty", async () => {

        const submitPayment = vi.fn();

        render(<UPIForm submitPayment={submitPayment} />);

        await userEvent.click(
            screen.getByRole("button", {
                name: /Pay Now/i
            })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("does not call submitPayment for invalid UPI", async () => {

        const submitPayment = vi.fn();

        render(<UPIForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("example@oksbi"),
            "akshay"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter Amount"),
            "2500"
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /Pay Now/i
            })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("does not call submitPayment for invalid amount", async () => {

        const submitPayment = vi.fn();

        render(<UPIForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("example@oksbi"),
            "akshay@oksbi"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter Amount"),
            "0"
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /Pay Now/i
            })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("calls submitPayment with correct payment object", async () => {

        const submitPayment = vi.fn();

        render(<UPIForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("example@oksbi"),
            "akshay@oksbi"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter Amount"),
            "2500"
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /Pay Now/i
            })
        );

        expect(submitPayment).toHaveBeenCalledTimes(1);

        expect(submitPayment).toHaveBeenCalledWith({
            reservation_id: 1,
            amount: 2500,
            payment_date: expect.any(String),
            payment_status: "Paid"
        });

    });

});