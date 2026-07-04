import { render, screen } from "@testing-library/react";
import BookingSummary from "../BookingSummary";

describe("BookingSummary Component", () => {

    test("renders Booking Summary heading", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("Booking Summary")
        ).toBeInTheDocument();

    });

    test("renders hotel name", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("The Grand Palace")
        ).toBeInTheDocument();

    });

    test("renders room type", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("Deluxe Room")
        ).toBeInTheDocument();

    });

    test("renders room price", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("$2500")
        ).toBeInTheDocument();

    });

    test("renders GST amount", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("$1800.00")
        ).toBeInTheDocument();

    });

    test("renders total amount", () => {

        render(<BookingSummary />);

        expect(
            screen.getByText("$11800.00")
        ).toBeInTheDocument();

    });

});