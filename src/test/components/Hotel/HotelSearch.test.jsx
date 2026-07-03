import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi, beforeEach } from "vitest";
import HotelSearch from "../../../components/Hotel/HotelSearch";
import * as hotelApi from "../../../utils/hotelApi";

const fakeHotels = [
  { hotel_id: 1, name: "Grand Plaza Hotel", location: "Downtown City Center", description: "Luxury hotel." },
  { hotel_id: 2, name: "Oceanfront Resort & Spa", location: "Beachfront Paradise", description: "Relaxing resort." },
  { hotel_id: 3, name: "Downtown Oasis Hotel", location: "City Center", description: "Modern hotel." },
  { hotel_id: 4, name: "Seaside Retreat Lodge", location: "Coastal Area", description: "Scenic lodge." },
];

const fakeAmenities = [{ amenity_id: 1, name: "Wi-Fi" }];
const fakeHotelAmenityLinks = [{ id: "1", hotel_id: 1, amenity_id: 1 }];
const fakeRating = [{ id: "1", hotel_id: 1, rating: 4.5 }];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(hotelApi, "getAllHotels").mockResolvedValue({ data: fakeHotels });
  vi.spyOn(hotelApi, "getAllAmenities").mockResolvedValue({ data: fakeAmenities });
  vi.spyOn(hotelApi, "getHotelAmenityLinks").mockResolvedValue({ data: fakeHotelAmenityLinks });
  vi.spyOn(hotelApi, "getHotelRatings").mockResolvedValue({ data: fakeRating });
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

test("clicking a preview card opens the single hotel page", async () => {
  render(<HotelSearch />);
  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("Grand Plaza Hotel"));

  await waitFor(() => {
    expect(screen.getByText(/Stay Where Comfort Meets Luxury/i)).toBeInTheDocument();
  });
});

test("View All button shows the detailed all-hotels page", async () => {
  render(<HotelSearch />);
  await waitFor(() => {
    expect(screen.getByText("Grand Plaza Hotel")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("View All"));

  expect(screen.getByText(/All Hotels/i)).toBeInTheDocument();
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