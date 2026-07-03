import { expect, test, vi, beforeEach } from "vitest";
import instance from "../../../utils/axiosInstance";
import {
  getAllHotels,
  getHotelById,
  getAllAmenities,
  getAmenityById,
  getHotelAmenityLinks,
  getAmenityLinksForHotel,
  getHotelRatings,
} from "../../../utils/hotelApi";

beforeEach(() => {
  vi.restoreAllMocks();
});

test("getAllHotels calls the correct endpoint", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getAllHotels();
  expect(spy).toHaveBeenCalledWith("/hotels");
});

test("getHotelById calls the correct endpoint with hotel id", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getHotelById(5);
  expect(spy).toHaveBeenCalledWith("/hotels?hotel_id=5");
});

test("getAllAmenities calls the correct endpoint", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getAllAmenities();
  expect(spy).toHaveBeenCalledWith("/amenities");
});

test("getAmenityById calls the correct endpoint with amenity id", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getAmenityById(3);
  expect(spy).toHaveBeenCalledWith("/amenities?amenity_id=3");
});

test("getHotelAmenityLinks calls the correct endpoint", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getHotelAmenityLinks();
  expect(spy).toHaveBeenCalledWith("/hotelAmenities");
});

test("getAmenityLinksForHotel calls the correct endpoint with hotel id", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getAmenityLinksForHotel(7);
  expect(spy).toHaveBeenCalledWith("/hotelAmenities?hotel_id=7");
});

test("getHotelRatings calls the correct endpoint", async () => {
  const spy = vi.spyOn(instance, "get").mockResolvedValue({ data: [] });
  await getHotelRatings();
  expect(spy).toHaveBeenCalledWith("/hotelRatings");
});

test("getAllHotels returns the data from the response", async () => {
  const fakeData = [{ hotel_id: 1, name: "Grand Plaza Hotel" }];
  vi.spyOn(instance, "get").mockResolvedValue({ data: fakeData });
  const response = await getAllHotels();
  expect(response.data).toEqual(fakeData);
});

test("getAllHotels throws an error when the request fails", async () => {
  vi.spyOn(instance, "get").mockRejectedValue(new Error("network error"));
  await expect(getAllHotels()).rejects.toThrow("network error");
});