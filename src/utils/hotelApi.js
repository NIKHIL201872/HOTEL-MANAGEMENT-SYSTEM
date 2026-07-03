import instance from "./axiosInstance";

export function getAllHotels() {
  return instance.get("/hotels");
}

export function getHotelById(hotelId) {
  return instance.get("/hotels?hotel_id=" + hotelId);
}

export function getAllAmenities() {
  return instance.get("/amenities");
}

export function getAmenityById(amenityId) {
  return instance.get("/amenities?amenity_id=" + amenityId);
}

export function getHotelAmenityLinks() {
  return instance.get("/hotelAmenities");
}

export function getAmenityLinksForHotel(hotelId) {
  return instance.get("/hotelAmenities?hotel_id=" + hotelId);
}

// gets ALL hotel ratings at once, instead of fetching one at a time per hotel
export function getHotelRatings() {
  return instance.get("/hotelRatings");
}