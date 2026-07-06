import { useState, useEffect } from "react";
import {
  getAllHotels,
  getAllAmenities,
  getHotelAmenityLinks,
  getHotelRatings,
} from "../../utils/hotelApi";
import { HotelAmenity } from "./HotelAmenity";
import { hotelImageFolder } from "./HotelImage";
import "./HotelSearch.css";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../store/roomStore";

const cardColors = ["#d8a48f", "#e8c39e", "#c9a66b"];
const HOTELS_PER_PAGE = 3;

// builds the image path for one hotel's image number (1, 2, or 3)
// used by both HotelCard and HotelDetails, so the logic only lives in one place
function getHotelImagePath(hotelName, imageNumber) {
  const folderNumber = hotelImageFolder[hotelName];
  return new URL(
    "../../assests/hotel/" + folderNumber + "/" + imageNumber + ".jpg",
    import.meta.url,
  ).href;
}

// finds the rating for one hotel from the full ratings list already loaded
function getRatingForHotel(hotelId, ratingList) {
  const match = ratingList.find((row) => row.hotel_id === hotelId);
  return match ? match.rating : null;
}

// small card shown in the first 3-hotel preview - clicking it opens the single hotel page
function HotelCard({ hotel, index, onCardClick }) {
  const cardColor = cardColors[index % cardColors.length];
  const imagePath = getHotelImagePath(hotel.name, 1);

  return (
    <div
      className="hotel-card"
      style={{ backgroundColor: cardColor }}
      onClick={() => onCardClick(hotel)}
    >
      <div className="hotel-card-img-placeholder">
        <img src={imagePath} alt={hotel.name} className="preview-img" />
      </div>
      <div className="hotel-card-body">
        <h5 className="hotel-name">{hotel.name}</h5>
        <p className="hotel-location">{hotel.location}</p>
      </div>
    </div>
  );
}

// shared detail block used by both the single hotel page and the View All page
function HotelDetails({ hotel, amenityList, hotelAmenityList, ratingList }) {
  const amenities = HotelAmenity(hotel.hotel_id, amenityList, hotelAmenityList);
  const rating = getRatingForHotel(hotel.hotel_id, ratingList);
  const navigate = useNavigate();
  const setSelectedHotelId = useRoomStore((state) => state.setSelectedHotelId);

  const handleViewRooms = () => {
    setSelectedHotelId(hotel.hotel_id);
    //console.log("hotel_id: ", hotel.hotel_id);
    navigate("/rooms");
  };

  const image1 = getHotelImagePath(hotel.name, 1);
  const image2 = getHotelImagePath(hotel.name, 2);
  const image3 = getHotelImagePath(hotel.name, 3);

  return (
    <div className="hotel-row-card">
      <div className="hotel-row-img-main">
        <img src={image1} alt={hotel.name} />
      </div>

      <div className="hotel-row-img-stack">
        <img src={image2} alt={hotel.name} />
        <img src={image3} alt={hotel.name} />
      </div>

      <div className="hotel-row-info">
        <h4 className="hotel-name">{hotel.name}</h4>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-description">{hotel.description}</p>

        {rating && <p className="hotel-rating">⭐ {rating} out of 5</p>}

        <div className="amenity-tags">
          {amenities.length > 0 ? (
            amenities.map((name) => (
              <span className="amenity-tag" key={name}>
                {name}
              </span>
            ))
          ) : (
            <span className="amenity-tag amenity-tag-empty">
              no amenities listed
            </span>
          )}
        </div>

        <button className="view-rooms-btn" onClick={handleViewRooms}>
          View Rooms
        </button>
      </div>
    </div>
  );
}

function HotelSearch() {
  const [hotels, setHotels] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [hotelAmenityList, setHotelAmenityList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [currentView, setCurrentView] = useState("search");
  const [selectedHotel, setSelectedHotel] = useState(null);

  // load hotels, amenities, hotel-amenity links, and ratings all at once
  // instead of one after another, so the page loads faster
  useEffect(() => {
    async function loadData() {
      try {
        const [
          hotelsResponse,
          amenitiesResponse,
          linksResponse,
          ratingsResponse,
        ] = await Promise.all([
          getAllHotels(),
          getAllAmenities(),
          getHotelAmenityLinks(),
          getHotelRatings(),
        ]);
        //console.log(hotelsResponse);
        setHotels(hotelsResponse.data);
        setAmenityList(amenitiesResponse.data);
        setHotelAmenityList(linksResponse.data);
        setRatingList(ratingsResponse.data);
        setLoading(false);
      } catch (error) {
        //console.log("could not load data from json-server:", error);
        setLoadError(true);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const searchResults = hotels.filter((hotel) => {
    const text = searchText.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(text) ||
      hotel.location.toLowerCase().includes(text)
    );
  });

  const topThreeHotels = searchResults.slice(0, 3);

  const totalPages = Math.ceil(searchResults.length / HOTELS_PER_PAGE) || 1;
  const startIndex = (page - 1) * HOTELS_PER_PAGE;
  const endIndex = startIndex + HOTELS_PER_PAGE;
  const hotelsOnThisPage = searchResults.slice(startIndex, endIndex);

  function goToSearchPage() {
    setCurrentView("search");
    setPage(1);
  }

  function openSingleHotel(hotel) {
    setSelectedHotel(hotel);
    setCurrentView("single");
  }

  if (loading) {
    return (
      <section className="hotel-search-section">
        <div className="container py-4">
          <p className="text-center">Loading hotels...</p>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="hotel-search-section">
        <div className="container py-4">
          <p className="text-center">
            Could not load hotel data. Please make sure json-server is running.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hotel-search-section">
      <div className="container py-4">
        {currentView === "search" && (
          <>
            <div className="search-bar-row">
              <input
                type="text"
                className="search-input"
                placeholder="Search location / hotel name here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-btn" onClick={goToSearchPage}>
                {" "}
                Search{" "}
              </button>
            </div>

            <div className="preview-panel">
              <div className="row g-4">
                {topThreeHotels.length > 0 ? (
                  topThreeHotels.map((hotel, index) => (
                    <div className="col-12 col-md-4" key={hotel.hotel_id}>
                      <HotelCard
                        hotel={hotel}
                        index={index}
                        onCardClick={openSingleHotel}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hotels found with that name</p>
                )}
              </div>

              {searchResults.length > 3 && (
                <div className="text-end mt-4">
                  <button
                    className="view-all-btn"
                    onClick={() => setCurrentView("viewAll")}
                  >
                    View All
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {currentView === "single" && selectedHotel && (
          <>
            <div className="mb-3">
              <button className="back-btn" onClick={goToSearchPage}>
                ← Back
              </button>
            </div>

            <h2 className="single-hotel-tagline">
              Stay Where Comfort Meets Luxury
            </h2>

            <HotelDetails
              hotel={selectedHotel}
              amenityList={amenityList}
              hotelAmenityList={hotelAmenityList}
              ratingList={ratingList}
            />
          </>
        )}

        {currentView === "viewAll" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="back-btn" onClick={goToSearchPage}>
                ← Back
              </button>
              <h4 className="section-heading m-0">
                All Hotels ({searchResults.length})
              </h4>
            </div>

            <div className="d-flex flex-column gap-4">
              {hotelsOnThisPage.map((hotel) => (
                <HotelDetails
                  hotel={hotel}
                  amenityList={amenityList}
                  hotelAmenityList={hotelAmenityList}
                  ratingList={ratingList}
                  key={hotel.hotel_id}
                />
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="app-btn-outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <span className="page-info">
                Page {page} of {totalPages}
              </span>

              <button
                className="app-btn-outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next Page →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default HotelSearch;
