// this function just matches up amenity ids to amenity names for one hotel

export function HotelAmenity(hotelId, amenityList, hotelAmenityList) {
  // find all amenity ids linked to this hotel
  const linkedAmenityIds = hotelAmenityList
    .filter((row) => row.hotel_id === hotelId)
    .map((row) => row.amenity_id);

  // now turn those ids into actual amenity names
  const amenityNames = amenityList.filter((amenity) => linkedAmenityIds.includes(amenity.amenity_id)).map((amenity) => amenity.name);

  return amenityNames;
}