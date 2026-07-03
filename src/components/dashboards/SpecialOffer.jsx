const offers = [
  {
    id: 1,
    title: "Summer Escape",
    discount: "20% OFF",
    desc: "Book 3 nights, get 1 free at select beach resorts.",
  },
  {
    id: 2,
    title: "Early Bird Deal",
    discount: "15% OFF",
    desc: "Reserve 30 days in advance and save on luxury suites.",
  },
  {
    id: 3,
    title: "Weekend Getaway",
    discount: "10% OFF",
    desc: "Special rates on all weekend stays this month.",
  },
];

const SpecialOffer = () => {
  return (
    <div className="mx-auto flex flex-col gap-6 rounded-2xl  bg-white/30  border border-white/60 p-8 ">
      <h4 className="text-center text-3xl font-bold">Special Offers</h4>

      <div className="flex flex-wrap justify-center gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex h-48 w-64 flex-col items-center justify-center gap-2 rounded-xl border border-white/40  bg-white/60  p-4 
            hover:shadow-lg hover:-translate-y-2 hover:scale-110 transition duration-300"
          >
            <span className="text-red-500 font-bold text-lg">
              {offer.discount}
            </span>
            <h5 className="font-semibold text-center">{offer.title}</h5>
            <p className="text-sm text-gray-600 text-center">{offer.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
