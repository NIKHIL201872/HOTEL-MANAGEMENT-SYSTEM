import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../../../components/Home";

describe("Home (Carousel)", () => {
  it("renders carousel container with correct id", () => {
    const { container } = render(<Home />);
    expect(
      container.querySelector("#carouselExampleCaptions"),
    ).toBeInTheDocument();
  });

  it("renders 3 carousel images", () => {
    render(<Home />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  it('first carousel item has "active" class', () => {
    const { container } = render(<Home />);
    const items = container.querySelectorAll(".carousel-item");
    expect(items[0]).toHaveClass("active");
    expect(items[1]).not.toHaveClass("active");
  });

  it("renders prev and next control buttons", () => {
    const { container } = render(<Home />);
    expect(
      container.querySelector(".carousel-control-prev"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".carousel-control-next"),
    ).toBeInTheDocument();
  });

  it("renders 3 carousel indicators", () => {
    const { container } = render(<Home />);
    const indicators = container.querySelectorAll(
      ".carousel-indicators button",
    );
    expect(indicators).toHaveLength(3);
  });
});
