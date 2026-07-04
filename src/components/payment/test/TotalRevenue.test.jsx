import { render, screen } from "@testing-library/react";
import TotalRevenue from "../TotalRevenue";

describe("TotalRevenue Component", () => {

    test("renders total revenue heading", () => {

        render(<TotalRevenue payments={[]} />);

        expect(
            screen.getByText(/Total Revenue/i)
        ).toBeInTheDocument();

    });

    test("calculates total revenue correctly", () => {

        const payments = [
            {
                payment_id: 1,
                amount: 1000
            },
            {
                payment_id: 2,
                amount: 2000
            },
            {
                payment_id: 3,
                amount: 3000
            }
        ];

        render(<TotalRevenue payments={payments} />);

        expect(
            screen.getByText(/Total Revenue : \$\s*6000/)
        ).toBeInTheDocument();

    });

    test("shows zero revenue when payment list is empty", () => {

        render(<TotalRevenue payments={[]} />);

        expect(
            screen.getByText(/Total Revenue : \$\s*0/)
        ).toBeInTheDocument();

    });

});