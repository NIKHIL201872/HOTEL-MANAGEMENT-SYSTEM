import { useState } from "react";
import offersStore from "../../../store/offersStore";
import { RiFileAddFill } from "react-icons/ri";

const STATUS_OPTIONS = ["Upcoming", "Live", "Expired"];

const statusClass = {
  Live: "bg-[#DFF4C8] text-[#2F5316]",
  Upcoming: "bg-[#FCE7B2] text-[#6A4B00]",
  Expired: "bg-[#FFE3D0] text-[#D96A1B]",
};

const emptyForm = { title: "", discount: "", desc: "", status: "Upcoming" };

const AddSpecialOffers = () => {
  const { offers, addOffer } = offersStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const openModal = () => {
    setForm(emptyForm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.discount.trim()) return;

    addOffer({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      discount: form.discount.trim(),
      desc: form.desc.trim(),
      status: form.status,
    });

    closeModal();
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-12 font-[georgia]">
      <h4 className="text-2xl font-semibold text-[#3F2E24]">
        Add Special Offers
      </h4>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-gray-500">
          All the offers u have given is listed here. U can also add offers via
          Add Button
        </p>
        <button
          onClick={openModal}
          className="shrink-0 flex gap-x-2 px-4 py-3 rounded-lg bg-[#3F2E24] text-white text-sm font-semibold hover:bg-[#2B1D14] transition"
        >
          <RiFileAddFill fontSize={20} className="font-bold" />
          Add Offer
        </button>
      </div>

      <div>
        {offers.length === 0 ? (
          <h4 className="text-gray-500">No Offers to Show</h4>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {offers.map((off) => (
              <div
                key={off.id}
                className="rounded-2xl border border-[#2B1D14]/10 bg-white/90 p-4 shadow-sm"
              >
                <h4 className="font-semibold text-[#3F2E24]">{off.title}</h4>
                <p className="text-xl text-gray-600 mt-1">{off.discount}</p>
                <p className="text-lg text-gray-500 mt-1">{off.desc}</p>
                <span
                  className={`inline-block mt-2 px-4 py-2 rounded-xl text-lg font-semibold ${statusClass[off.status] || "bg-gray-100 text-gray-600"}`}
                >
                  {off.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[3px]"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg "
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-semibold text-[#3F2E24] mb-4">
              Add Special Offer
            </h4>

            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm text-[#3F2E24]">
                Title
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Summer Getaway"
                  className="rounded-lg border border-[#2B1D14]/20 px-3 py-2 text-sm"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-[#3F2E24]">
                Discount
                <input
                  type="text"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 20% off"
                  className="rounded-lg border border-[#2B1D14]/20 px-3 py-2 text-sm"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-[#3F2E24]">
                Description
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Short description of the offer"
                  className="rounded-lg border border-[#2B1D14]/20 px-3 py-2 text-sm resize-none"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-[#3F2E24]">
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-lg border border-[#2B1D14]/20 px-3 py-2 text-sm"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#3F2E24] border border-[#2B1D14]/20 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#3F2E24] text-white hover:bg-[#2B1D14]"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSpecialOffers;
