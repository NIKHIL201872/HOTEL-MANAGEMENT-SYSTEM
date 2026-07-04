import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CardForm from "../CardForm";

describe("CardForm Component", () => {

    test("renders Card Payment heading", () => {

        render(<CardForm submitPayment={vi.fn()} />);

        expect(screen.getByText("Card Payment")).toBeInTheDocument();

    });

    test("renders all input fields", () => {

        render(<CardForm submitPayment={vi.fn()} />);

        expect(screen.getByPlaceholderText("1234567812345678")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter card holder name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("MM/YY")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("***")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();

    });

    test("user can type in all fields", async () => {

        render(<CardForm submitPayment={vi.fn()} />);

        await userEvent.type(
            screen.getByPlaceholderText("1234567812345678"),
            "1234567812345678"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter card holder name"),
            "Akshay Raj"
        );

        await userEvent.type(
            screen.getByPlaceholderText("MM/YY"),
            "12/30"
        );

        await userEvent.type(
            screen.getByPlaceholderText("***"),
            "123"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter amount"),
            "2500"
        );

        expect(
            screen.getByPlaceholderText("1234567812345678")
        ).toHaveValue("1234567812345678");

        expect(
            screen.getByPlaceholderText("Enter amount")
        ).toHaveValue(2500);

    });

    test("does not call submitPayment when fields are empty", async () => {

        const submitPayment = vi.fn();

        render(<CardForm submitPayment={submitPayment} />);

        await userEvent.click(
            screen.getByRole("button", { name: /Pay Now/i })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("does not call submitPayment for invalid card number", async () => {

        const submitPayment = vi.fn();

        render(<CardForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("1234567812345678"),
            "1234"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter card holder name"),
            "Akshay Raj"
        );

        await userEvent.type(
            screen.getByPlaceholderText("MM/YY"),
            "12/30"
        );

        await userEvent.type(
            screen.getByPlaceholderText("***"),
            "123"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter amount"),
            "2500"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /Pay Now/i })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("does not call submitPayment for invalid CVV", async () => {

        const submitPayment = vi.fn();

        render(<CardForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("1234567812345678"),
            "1234567812345678"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter card holder name"),
            "Akshay Raj"
        );

        await userEvent.type(
            screen.getByPlaceholderText("MM/YY"),
            "12/30"
        );

        await userEvent.type(
            screen.getByPlaceholderText("***"),
            "12"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter amount"),
            "2500"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /Pay Now/i })
        );

        expect(submitPayment).not.toHaveBeenCalled();

    });

    test("calls submitPayment for valid data", async () => {

        const submitPayment = vi.fn();

        render(<CardForm submitPayment={submitPayment} />);

        await userEvent.type(
            screen.getByPlaceholderText("1234567812345678"),
            "1234567812345678"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter card holder name"),
            "Akshay Raj"
        );

        await userEvent.type(
            screen.getByPlaceholderText("MM/YY"),
            "12/30"
        );

        await userEvent.type(
            screen.getByPlaceholderText("***"),
            "123"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter amount"),
            "2500"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /Pay Now/i })
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