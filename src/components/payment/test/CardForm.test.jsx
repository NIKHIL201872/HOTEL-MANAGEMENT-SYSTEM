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

    test("user able to enter card holder name",async ()=>{
        render(<CardForm/>);
        const inputCardHolderName = screen.getByPlaceholderText("Enter card holder name");
        await userEvent.type(inputCardHolderName,"Abcde Xyz");
        expect(inputCardHolderName).toHaveValue("Abcde Xyz");
    })

    test("user able to enter card expiry date",async ()=>{
        render(<CardForm/>);
        const inputCardExpiry = screen.getByPlaceholderText("MM/YY");
        await userEvent.type(inputCardExpiry,"12/30");
        expect(inputCardExpiry).toHaveValue("12/30");
    })

    test("user able to enter cvv",async ()=>{
        render(<CardForm/>);
        const inputCVV = screen.getByPlaceholderText("***");
        await userEvent.type(inputCVV,"123");
        expect(inputCVV).toHaveValue("123");
    })
})