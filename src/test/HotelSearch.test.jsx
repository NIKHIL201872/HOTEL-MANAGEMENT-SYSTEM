import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi, beforeEach } from "vitest";
import HotelSearch from "../components/Hotel/HotelSearch";
import * as hotelApi from "../utils/hotelApi";

// fake data used for testing, instead of calling the real json-server
const fakeHotels = [
  { hotel_id: 1, name: "Grand Plaza Hotel", location: "Downtown City Center", description: "Luxury hotel." },
  { hotel_id: 2, name: "Oceanfront Resort & Spa", location: "Beachfront Paradise", description: "Relaxing resort." },
  { hotel_id: 3, name: "Downtown Oasis Hotel", location: "City Center", description: "Modern hotel." },
  { hotel_id: 4, name: "Seaside Retreat Lodge", location: "Coastal Area", description: "Scenic lodge." },
];

const fakeAmenities = [
  { amenity_id: 1, name: "Wi-Fi" },
  { amenity_id: 2, name: "Pool" },
];

const fakeHotelAmenityLinks = [
  { id: 1, hotel_id: 1, amenity_id: 1 },
  { id: 2, hotel_id: 1, amenity_id: 2 },
];

// this runs before every single test below, so each test starts fresh
beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(hotelApi, "getAllHotels").mockResolvedValue({ data: fakeHotels });
  vi.spyOn(hotelApi, "getAllAmenities").mockResolvedValue({ data: fakeAmenities });
  vi.spyOn(hotelApi, "getHotelAmenityLinks").mockResolvedValue({ data: fakeHotelAmenityLinks });
});

test("shows loading message before hotels arrive", () => {
  render(<HotelSearch />);
  expect(screen.getByText("Loading hotels...")).toBeInTheDocument();
});

test("renders hotel names after data loads", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });
});

test("shows only top 3 hotels on the preview page", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  expect(screen.getByText("Oceanfront Resort & Spa")).toBeInTheDocument();
  expect(screen.getByText("Downtown Oasis Hotel")).toBeInTheDocument();
  expect(screen.queryByText("Seaside Retreat Lodge")).not.toBeInTheDocument();
});

test("renders hotel locations", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Downtown City Center")).toBeInTheDocument();
  });

  expect(screen.getByText("Beachfront Paradise")).toBeInTheDocument();
});

test("search box filters hotels by name", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  const searchBox = screen.getByPlaceholderText("Search location / hotel name here");
  await userEvent.type(searchBox, "Oceanfront");

  expect(screen.getByText("Oceanfront Resort & Spa")).toBeInTheDocument();
  expect(screen.queryByText("Grand Plaza Hotel")).not.toBeInTheDocument();
});

test("shows no results message when search matches nothing", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  const searchBox = screen.getByPlaceholderText("Search location / hotel name here");
  await userEvent.type(searchBox, "zzznotreal");

  expect(screen.getByText("No hotels found with that name")).toBeInTheDocument();
});

test("View All button is visible when more than 3 hotels match", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  expect(screen.getByText("View All")).toBeInTheDocument();
});

test("clicking View All shows the detailed all-hotels page", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));

  expect(screen.getByText(/All Hotels/i)).toBeInTheDocument();
  expect(screen.getByText("← Back")).toBeInTheDocument();
});

test("Back button returns to the search page", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));
  await userEvent.click(screen.getByText("← Back"));

  expect(screen.getByText("Search")).toBeInTheDocument();
});

test("amenity tags render correctly on detailed cards", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));

  await waitFor(() => {
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
  });

  expect(screen.getByText("Pool")).toBeInTheDocument();
});

test("Previous button is disabled on the first page", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));

  expect(screen.getByText("Previous")).toBeDisabled();
});

test("Next Page button moves to page 2 correctly", async () => {
  render(<HotelSearch />);

  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));

  expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

  await userEvent.click(screen.getByText("Next Page →"));

  expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
});

test("shows error message when hotel data fails to load", async () => {
  vi.spyOn(hotelApi, "getAllHotels").mockRejectedValue(new Error("network error"));

  render(<HotelSearch />);

  await waitFor(() => {
    expect(
      screen.getByText("Could not load hotel data. Please make sure json-server is running.")
    ).toBeInTheDocument();
  });
});