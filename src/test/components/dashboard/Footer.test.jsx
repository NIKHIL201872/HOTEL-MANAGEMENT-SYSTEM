import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/Footer";

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Hotel Management")).toBeInTheDocument();
  });

  it("renders quick links section", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("View Hotels")).toBeInTheDocument();
  });

  it("About Us footer link points to #about", () => {
    render(<Footer />);
    const link = screen.getByText("About Us").closest("a");
    expect(link).toHaveAttribute("href", "#about");
  });

  it("renders contact details", () => {
    render(<Footer />);
    expect(screen.getByText(/Kolkata, West Bengal, India/)).toBeInTheDocument();
    expect(screen.getByText("support@hotelmgmt.com")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/2026 Hotel Management/)).toBeInTheDocument();
  });
});
