import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUs from "../../../components/AboutUs";

describe("AboutUs", () => {
  it('renders section with id="about" for navbar anchor scroll', () => {
    const { container } = render(<AboutUs />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });

  it("renders heading", () => {
    render(<AboutUs />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders location and contact info", () => {
    render(<AboutUs />);
    expect(screen.getByText(/Kolkata, India/)).toBeInTheDocument();
    expect(screen.getByText(/\+91-9876543210/)).toBeInTheDocument();
  });

  it("renders Map button", () => {
    render(<AboutUs />);
    expect(screen.getByRole("button", { name: /map/i })).toBeInTheDocument();
  });
});
