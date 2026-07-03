import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../../../components/Navbar";

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Hotel Management")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("View Hotels")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("About Us link points to #about", () => {
    render(<Navbar />);
    const aboutLink = screen.getByText("About Us");
    expect(aboutLink).toHaveAttribute("href", "#about");
  });

  it("renders exactly 4 nav links", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });
});
