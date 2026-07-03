import TopRatedHCards from "./TopRatedHCards";

const TopRatedHotels = () => {
  const topHotels = [
    {
      hotel_id: 1,
      name: "Havanza Beach Resort",
      location: "Palm Jumeirah, Dubai",
      description:
        "Luxury beachfront resort with private pool, palm-lined courtyards, and direct beach access.",
    },
    {
      hotel_id: 2,
      name: "The Grandview Palace",
      location: "Lake Como, Italy",
      description:
        "Elegant lakeside hotel featuring classic Italian architecture and panoramic mountain views.",
    },
    {
      hotel_id: 3,
      name: "Azure Sands Hotel",
      location: "Malé, Maldives",
      description:
        "Overwater villas surrounded by crystal-clear lagoons, ideal for a tropical getaway.",
    },
    {
      hotel_id: 4,
      name: "Mountain Ridge Lodge",
      location: "Aspen, Colorado, USA",
      description:
        "Cozy alpine lodge with fireplace suites, ski-in access, and scenic mountain trails.",
    },
  ];
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/60 p-4 ">
      <h4 className="mb-4 mt-3 w-full text-center text-4xl font-bold sm:text-5xl lg:text-[6xl]">
        Top Rated Hotels
      </h4>
      <div className="flex w-full flex-wrap items-center justify-center gap-4 pb-6">
        {topHotels.map((topHotel) => (
          <TopRatedHCards key={topHotel.hotel_id} topHotel={topHotel} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedHotels;
