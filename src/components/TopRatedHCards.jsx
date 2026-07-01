import img from "../assests/Login_img.jpg";

const TopRatedHCards = ({ topHotel }) => {
  return (
    <div
      className="h-112 w-80 rounded-2xl border border-white/40 bg-white/60 flex flex-col items-center gap-2 p-2
      hover:shadow-lg hover:-translate-y-2 hover:scale-108 transition duration-300"
    >
      <div className="w-full h-48">
        <img
          className="rounded-2xl w-full h-full object-cover"
          src={img}
          alt="Hotel Image"
        />
      </div>
      <div className="px-3">
        <h4 className="text-center font-semibold text-gray-900">
          {topHotel.name}
        </h4>
        <p className="text-center text-lg text-black">{topHotel.location}</p>
        <p className="text-center text-[1rem] text-black">
          {topHotel.description}
        </p>
      </div>
    </div>
  );
};
export default TopRatedHCards;
