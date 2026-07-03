import { expect, test } from "vitest";
import { HotelAmenity } from "../../../components/Hotel/HotelAmenity";

const amenityList = [
  { amenity_id: 1, name: "Wi-Fi" },
  { amenity_id: 2, name: "Pool" },
  { amenity_id: 3, name: "Gym" },
];

const hotelAmenityList = [
  { id: "1", hotel_id: 10, amenity_id: 1 },
  { id: "2", hotel_id: 10, amenity_id: 2 },
  { id: "3", hotel_id: 20, amenity_id: 3 },
];

test("returns correct amenity names for a hotel with matches", () => {
  const result = HotelAmenity(10, amenityList, hotelAmenityList);
  expect(result).toEqual(["Wi-Fi", "Pool"]);
});

test("returns only one amenity when hotel has just one match", () => {
  const result = HotelAmenity(20, amenityList, hotelAmenityList);
  expect(result).toEqual(["Gym"]);
});

test("returns empty array when hotel has no amenities linked", () => {
  const result = HotelAmenity(999, amenityList, hotelAmenityList);
  expect(result).toEqual([]);
});

test("returns empty array when amenity or link lists are empty", () => {
  const result = HotelAmenity(10, [], []);
  expect(result).toEqual([]);
});