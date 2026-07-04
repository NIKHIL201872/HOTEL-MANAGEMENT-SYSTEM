import { render, screen } from "@testing-library/react";
import Receipt from "../Receipt";

describe("Receipt Component", () => {

    test("renders Payment Successful heading", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Payment Successful")
        ).toBeInTheDocument();

    });

    test("renders Receipt Details heading", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Receipt Details")
        ).toBeInTheDocument();

    });

    test("renders Booking Details heading", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Booking Details")
        ).toBeInTheDocument();

    });

    test("renders Payment Summary heading", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Payment Summary")
        ).toBeInTheDocument();

    });

    test("renders transaction id", () => {

        render(<Receipt />);

        expect(
            screen.getByText("TXN202607010001")
        ).toBeInTheDocument();

    });

    test("renders payment method", () => {

        render(<Receipt />);

        expect(
            screen.getByText("UPI")
        ).toBeInTheDocument();

    });

    test("renders payment status", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Success")
        ).toBeInTheDocument();

    });

    test("renders hotel name", () => {

        render(<Receipt />);

        expect(
            screen.getByText("The Grand Palace")
        ).toBeInTheDocument();

    });

    test("renders room type", () => {

        render(<Receipt />);

        expect(
            screen.getByText("Deluxe Room")
        ).toBeInTheDocument();

    });

    test("renders total paid amount", () => {

        render(<Receipt />);

        expect(
            screen.getByText("$11800.00")
        ).toBeInTheDocument();

    });

    test("renders Back to Home button", () => {

        render(<Receipt />);

        expect(
            screen.getByRole("button", {
                name: /Back to Home/i
            })
        ).toBeInTheDocument();

    });

});