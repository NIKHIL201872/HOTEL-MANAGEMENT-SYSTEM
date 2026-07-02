import { useState, useEffect } from "react";
import { getAllHotels, getAllAmenities, getHotelAmenityLinks } from "../../utils/hotelApi";
import { HotelAmenity } from "./HotelAmenity";
import { hotelImageFolder } from "./HotelImage";
import "./HotelSearch.css";

const cardColors = ["#d8a48f", "#e8c39e", "#c9a66b"];
const HOTELS_PER_PAGE = 3;

function HotelCard({ hotel, index }) {
  const cardColor = cardColors[index % cardColors.length];
  const folderNumber = hotelImageFolder[hotel.name];

  const imagePath = new URL(
    "../../assests/hotel/" + folderNumber + "/1.jpg",
    import.meta.url
  ).href;

  return (
    <div className="hotel-card" style={{ backgroundColor: cardColor }}>
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

function HotelCardDetailed({ hotel, amenityList, hotelAmenityList }) {
  const amenities = HotelAmenity(hotel.hotel_id, amenityList, hotelAmenityList);
  const folderNumber = hotelImageFolder[hotel.name];

  const image1 = new URL("../../assests/hotel/" + folderNumber + "/1.jpg", import.meta.url).href;
  const image2 = new URL("../../assests/hotel/" + folderNumber + "/2.jpg", import.meta.url).href;
  const image3 = new URL("../../assests/hotel/" + folderNumber + "/3.jpg", import.meta.url).href;

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
        <p className="hotel-description">{hotel.description}</p>

        <div className="amenity-tags">
          {amenities.length > 0 ? (
            amenities.map((name) => (
              <span className="amenity-tag" key={name}>
                {name}
              </span>
            ))
          ) : (
            <span className="amenity-tag amenity-tag-empty">no amenities listed</span>
          )}
        </div>

        <button className="view-rooms-btn">View Rooms</button>
      </div>
    </div>
  );
}

function HotelSearch() {
  const [hotels, setHotels] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [hotelAmenityList, setHotelAmenityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [showAllPage, setShowAllPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const hotelsResponse = await getAllHotels();
        const amenitiesResponse = await getAllAmenities();
        const linksResponse = await getHotelAmenityLinks();

        setHotels(hotelsResponse.data);
        setAmenityList(amenitiesResponse.data);
        setHotelAmenityList(linksResponse.data);
        setLoading(false);
      } catch (error) {
        console.log("could not load data from json-server:", error);
        setLoadError(true);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const searchResults = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const topThreeHotels = searchResults.slice(0, 3);

  const totalPages = Math.ceil(searchResults.length / HOTELS_PER_PAGE) || 1;
  const startIndex = (page - 1) * HOTELS_PER_PAGE;
  const endIndex = startIndex + HOTELS_PER_PAGE;
  const hotelsOnThisPage = searchResults.slice(startIndex, endIndex);

  function resetPage() {
    setShowAllPage(false);
    setPage(1);
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
        {!showAllPage ? (
          <>
            <div className="search-bar-row">
              <input type="text" className="search-input" placeholder="Search location / hotel name here"
                value={searchText} onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-btn" onClick={resetPage}> Search </button>
            </div>

            <div className="preview-panel">
              <div className="row g-4">
                {topThreeHotels.length > 0 ? (
                  topThreeHotels.map((hotel, index) => (
                    <div className="col-12 col-md-4" key={hotel.hotel_id}>
                      <HotelCard hotel={hotel} index={index} />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hotels found with that name</p>
                )}
              </div>

              {searchResults.length > 3 && (
                <div className="text-end mt-4">
                  <button className="view-all-btn" onClick={() => setShowAllPage(true)}>
                    View All
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="back-btn" onClick={resetPage}>
                ← Back
              </button>
              <h4 className="section-heading m-0">All Hotels ({searchResults.length})</h4>
            </div>

            <div className="d-flex flex-column gap-4">
              {hotelsOnThisPage.map((hotel) => (
                <HotelCardDetailed
                  hotel={hotel}
                  amenityList={amenityList}
                  hotelAmenityList={hotelAmenityList}
                  key={hotel.hotel_id}
                />
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="app-btn-outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}>
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