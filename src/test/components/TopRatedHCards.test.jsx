import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TopRatedHCards from "../../components/TopRatedHCards";

const mockHotel = {
  hotel_id: 1,
  name: "Havanza Beach Resort",
  location: "Palm Jumeirah, Dubai",
  description: "Luxury beachfront resort with private pool.",
};

describe("TopRatedHCards", () => {
  it("renders hotel name", () => {
    render(<TopRatedHCards topHotel={mockHotel} />);
    expect(screen.getByText("Havanza Beach Resort")).toBeInTheDocument();
  });

  it("renders hotel location", () => {
    render(<TopRatedHCards topHotel={mockHotel} />);
    expect(screen.getByText("Palm Jumeirah, Dubai")).toBeInTheDocument();
  });

  it("renders hotel description", () => {
    render(<TopRatedHCards topHotel={mockHotel} />);
    expect(screen.getByText(/Luxury beachfront resort/)).toBeInTheDocument();
  });

  it("renders hotel image with alt text", () => {
    render(<TopRatedHCards topHotel={mockHotel} />);
    expect(screen.getByAltText("Hotel Image")).toBeInTheDocument();
  });

  it("does not crash if optional fields missing", () => {
    const partialHotel = { hotel_id: 2, name: "Test Hotel" };
    render(<TopRatedHCards topHotel={partialHotel} />);
    expect(screen.getByText("Test Hotel")).toBeInTheDocument();
  });
});
