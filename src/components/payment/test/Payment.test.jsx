import { render, screen } from "@testing-library/react";
import Payment from "../Payment";
import { fireEvent } from "@testing-library/react";

describe("Payment Component",()=>{
    test("renders Payment heading",()=>{
        render(<Payment/>);
        expect(screen.getByText("Payment")).toBeInTheDocument();
    })

    test("shows Card from when Card button is clicked",()=>{
        render(<Payment/>);

        const cardButton = screen.getByRole("button", {name:/card/i});
        fireEvent.click(cardButton);

        expect(screen.getByText("Card Payment")).toBeInTheDocument();
        expect(screen.queryByText("UPI Payment")).not.toBeInTheDocument();
    })

    test("renders Booking Summary",()=>{
        render(<Payment/>);
        expect(screen.getByText("Booking Summary")).toBeInTheDocument();
    })
})