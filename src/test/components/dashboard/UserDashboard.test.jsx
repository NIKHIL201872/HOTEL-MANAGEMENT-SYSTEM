import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserDashboard from "../../../components/UserDashboard";

describe("UserDashboard (integration)", () => {
  it("renders Navbar, Home carousel, and Footer together", () => {
    render(<UserDashboard />);
    expect(screen.getAllByText("Hotel Management").length).toBeGreaterThan(0);
    expect(screen.getByText("Top Rated Hotels")).toBeInTheDocument();
    expect(screen.getByText("Special Offers")).toBeInTheDocument();
    expect(screen.getAllByText("About Us").length).toBeGreaterThan(0);
  });

  it("renders all 4 top rated hotels within full page", () => {
    render(<UserDashboard />);
    expect(screen.getByText("Havanza Beach Resort")).toBeInTheDocument();
    expect(screen.getByText("Mountain Ridge Lodge")).toBeInTheDocument();
  });

  it("renders all 3 special offers within full page", () => {
    render(<UserDashboard />);
    expect(screen.getByText("Summer Escape")).toBeInTheDocument();
    expect(screen.getByText("Weekend Getaway")).toBeInTheDocument();
  });

  it("renders footer copyright at bottom of page", () => {
    render(<UserDashboard />);
    expect(screen.getByText(/2026 Hotel Management/)).toBeInTheDocument();
  });
});
