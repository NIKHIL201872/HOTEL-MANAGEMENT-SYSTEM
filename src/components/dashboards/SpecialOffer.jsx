import { useState } from "react";
import useSpecialOffers from "../../hooks/useSpecialOffers";
import { RxCross2 } from "react-icons/rx";

const OfferCard = ({ offer }) => (
  <div
    className="flex h-48 w-64 flex-col items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/60 p-4
    hover:shadow-lg hover:-translate-y-2 hover:scale-110 transition duration-300"
  >
    <div className="flex justify-around items-center gap-x-6">
      <span className="text-red-500 font-bold text-lg">{offer.discount}</span>
      <span className="bg-red-700 text-white rounded-xl px-3 py-1">
        {offer.status}
      </span>
    </div>
    <h5 className="font-semibold text-center">{offer.title}</h5>
    <p className="text-sm text-gray-600 text-center">{offer.desc}</p>
  </div>
);

const SpecialOffer = () => {
  const { offers, isLoading, error } = useSpecialOffers();
  const [showAll, setShowAll] = useState(false);

  const liveOffers = offers.filter((off) => off.status === "Live");
  const previewOffers = liveOffers.slice(0, 4);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h4 className="text-red-700!">Error...</h4>;
  }

  return (
    <div className="mx-auto flex flex-col gap-6 rounded-2xl bg-white/30 border border-white/60 p-8">
      <h4 className="text-center text-3xl font-bold">Special Offers</h4>

      <div className="flex flex-wrap justify-center gap-6">
        {previewOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {liveOffers.length > 4 && (
        <button
          onClick={() => setShowAll(true)}
          className="mx-auto rounded-xl bg-red-700 px-6 py-2 font-semibold text-white transition hover:bg-red-800"
        >
          View All
        </button>
      )}

      {showAll && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[6px]"
          onClick={() => setShowAll(false)}
        >
          <div
            className="relative flex max-h-[80vh] w-full max-w-4xl flex-col gap-6 rounded-2xl bg-[#FDF2DF] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold">All Special Offers</h4>
              <button
                onClick={() => setShowAll(false)}
                className="text-2xl leading-none text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <RxCross2 fontSize={20} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6  overflow-y-auto pr-2">
              {liveOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOffer;
