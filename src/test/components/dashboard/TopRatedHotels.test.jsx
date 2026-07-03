import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TopRatedHotels from "../../../components/TopRatedHotels";

describe("TopRatedHotels", () => {
  it("renders section heading", () => {
    render(<TopRatedHotels />);
    expect(screen.getByText("Top Rated Hotels")).toBeInTheDocument();
  });

  it("renders all 4 hardcoded hotel cards", () => {
    render(<TopRatedHotels />);
    expect(screen.getByText("Havanza Beach Resort")).toBeInTheDocument();
    expect(screen.getByText("The Grandview Palace")).toBeInTheDocument();
    expect(screen.getByText("Azure Sands Hotel")).toBeInTheDocument();
    expect(screen.getByText("Mountain Ridge Lodge")).toBeInTheDocument();
  });

  it("renders exactly 4 hotel images", () => {
    render(<TopRatedHotels />);
    const images = screen.getAllByAltText("Hotel Image");
    expect(images).toHaveLength(4);
  });

  it("each hotel card renders its location", () => {
    render(<TopRatedHotels />);
    expect(screen.getByText("Palm Jumeirah, Dubai")).toBeInTheDocument();
    expect(screen.getByText("Lake Como, Italy")).toBeInTheDocument();
    expect(screen.getByText("Malé, Maldives")).toBeInTheDocument();
    expect(screen.getByText("Aspen, Colorado, USA")).toBeInTheDocument();
  });
});
