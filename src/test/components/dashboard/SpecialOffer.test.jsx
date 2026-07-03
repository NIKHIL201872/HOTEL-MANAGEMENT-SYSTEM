import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SpecialOffer from "../../../components/SpecialOffer";

describe("SpecialOffer", () => {
  it("renders section heading", () => {
    render(<SpecialOffer />);
    expect(screen.getByText("Special Offers")).toBeInTheDocument();
  });

  it("renders all 3 hardcoded offers", () => {
    render(<SpecialOffer />);
    expect(screen.getByText("Summer Escape")).toBeInTheDocument();
    expect(screen.getByText("Early Bird Deal")).toBeInTheDocument();
    expect(screen.getByText("Weekend Getaway")).toBeInTheDocument();
  });

  it("renders discount labels", () => {
    render(<SpecialOffer />);
    expect(screen.getByText("20% OFF")).toBeInTheDocument();
    expect(screen.getByText("15% OFF")).toBeInTheDocument();
    expect(screen.getByText("10% OFF")).toBeInTheDocument();
  });

  it("renders exactly 3 offer cards", () => {
    render(<SpecialOffer />);
    // each card has a discount span — count those as proxy for card count
    const discounts = screen.getAllByText(/% OFF/);
    expect(discounts).toHaveLength(3);
  });
});
