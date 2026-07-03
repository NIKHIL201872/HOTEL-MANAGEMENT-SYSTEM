import img1 from "../../assests/Home_main.png";
import img2 from "../../assests/Home_img1.png";
import img3 from "../../assests/Home_img2.png";

const Home = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide mt-6 w-[95vw] p-2 rounded-2xl border-2 border-amber-200 shadow-xl shadow-amber-400"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner rounded-2xl">
        <div className="carousel-item active relative" data-bs-interval="4000">
          <h4></h4>
          <img
            src={img1}
            className="d-block w-100 h-[80vh] object-fit rounded-2xl"
            alt="..."
          />
          {/* <div className="carousel-caption d-none d-md-block text-black">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div> */}
        </div>
        <div className="carousel-item" data-bs-interval="3000">
          <img
            src={img2}
            className="d-block w-100 h-[80vh] object-fit rounded-2xl"
            alt="..."
          />
          {/* <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div> */}
        </div>
        <div className="carousel-item" data-bs-interval="3000">
          <img
            src={img3}
            className="d-block w-100 h-[80vh] object-fit rounded-2xl"
            alt="..."
          />
          {/* <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div> */}
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Home;
