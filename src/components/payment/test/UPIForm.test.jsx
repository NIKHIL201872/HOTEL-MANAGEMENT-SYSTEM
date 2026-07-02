import {render,screen,fireEvent} from "@testing-library/react";
import UPIForm from "../UPIForm";
import userEvent from "@testing-library/user-event";

describe("UPIForm Component",()=>{
    test("render UPI Payment heading",()=>{
        render(<UPIForm/>);
        expect(screen.getByText("UPI Payment")).toBeInTheDocument();
    })
    test("render Label",()=>{
        render(<UPIForm/>);
        expect(screen.getByText("Enter your UPI ID")).toBeInTheDocument();
    })
    test("user able to enter upi id",async ()=>{
        render(<UPIForm/>);
        const input = screen.getByPlaceholderText("example@oksbi");
        await userEvent.type(input, "abc@oksbi");
        expect(input).toHaveValue("abc@oksbi");
    })
    // test("user able to click on pay",()=>{
    //     render(<UPIForm/>);
    //     const payButton = screen.getByPole("button",{name:/Pay Now/i})

    //     fireEvent.click(payButton)
    // })
})