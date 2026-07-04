import {render,screen,fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserReview from "../UserReview";
import AdminReview from "../AdminReview";

describe("testing Review Componets",()=>{
    test("render Customer Review",()=>{
        render(<AdminReview/>);
        expect(screen.getByText("Customer Review")).toBeInTheDocument();
    })

    test("user able to increase the rating",async ()=>{
        render(<UserReview/>);
        const increaseButton = screen.getByRole("button",{name:"+"})
        await userEvent.click(increaseButton);
        expect(screen.getByText(/0.5\/5/)).toBeInTheDocument();
    })

    test("user able to decrease the rating",async ()=>{
        render(<UserReview/>);
        const decreaseButton = screen.getByRole("button",{name:"-"})
        await userEvent.click(decreaseButton);
        expect(screen.getByText(/0\/5/)).toBeInTheDocument();
    })

    test("user able to enter a comment", async () => {
        render(<UserReview />);
        const commentBox = screen.getByPlaceholderText("Write your review...");
        await userEvent.type(commentBox, "Excellent Hotel");
        expect(commentBox).toHaveValue("Excellent Hotel");
    })
})