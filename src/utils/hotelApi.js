import instance from "./axiosInstance";

// gets the full list of hotels
export function getAllHotels() {
  return instance.get("/hotels");
}

// gets one hotel by its id
export function getHotelById(hotelId) {
  return instance.get("/hotels?hotel_id=" + hotelId);
}

// gets all amenities
export function getAllAmenities() {
  return instance.get("/amenities");
}

// gets one amenity by its id
export function getAmenityById(amenityId) {
  return instance.get("/amenities?amenity_id=" + amenityId);
}

// gets the hotel-amenity link table
export function getHotelAmenityLinks() {
  return instance.get("/hotelAmenities");
}

// gets only the links for one specific hotel
export function getAmenityLinksForHotel(hotelId) {
  return instance.get("/hotelAmenities?hotel_id=" + hotelId);
}