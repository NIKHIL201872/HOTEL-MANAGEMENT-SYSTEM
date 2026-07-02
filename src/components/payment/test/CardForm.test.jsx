import {render,screen} from "@testing-library/react";
import CardForm from "../CardForm";
import userEvent from "@testing-library/user-event";

describe("CardForm Component",()=>{
    test("render Card Payment heading",()=>{
        render(<CardForm/>);
        expect(screen.getByText("Card Payment")).toBeInTheDocument();
    })
    test("render Labels",()=>{
        render(<CardForm/>);
        expect(screen.getByText("Card Number")).toBeInTheDocument();
        expect(screen.getByText("Card Holder Name")).toBeInTheDocument();
        expect(screen.getByText("Expiry Date")).toBeInTheDocument();
        expect(screen.getByText("CVV")).toBeInTheDocument();
    })
    test("user able to enter card number",async ()=>{
        render(<CardForm/>);
        const inputCardNumber = screen.getByPlaceholderText("1234 5678 9012 3456");
        await userEvent.type(inputCardNumber,"0987654321123456");
        expect(inputCardNumber).toHaveValue("0987654321123456");
    })
})