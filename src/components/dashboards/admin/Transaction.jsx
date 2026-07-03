import { useEffect, useState } from "react";
import { useAdminStore } from "../../../store/adminStore";
import StatCard from "./StatCard";

import { MdOutlineDownloadDone } from "react-icons/md";
import { FaHourglassHalf, FaCoins } from "react-icons/fa6";

const TransactionCard = ({ tx }) => {
  const statusColor =
    tx.payment_status === "Paid"
      ? "bg-[#ACE872]/30 text-[#3F2E24]"
      : tx.payment_status === "Pending"
        ? "bg-[#FF9E5B]/30 text-[#3F2E24]"
        : "bg-red-400/20 text-red-500";

  const stayColor =
    tx.stayStatus === "Checked In"
      ? "bg-[#ACE872]/30 text-[#3F2E24]"
      : tx.stayStatus === "Checked Out"
        ? "bg-gray-200 text-gray-600"
        : "bg-[#FF9E5B]/30 text-[#3F2E24]";

  const roomColor = tx.room_is_available
    ? "bg-[#ACE872]/30 text-[#3F2E24]"
    : "bg-[#FF9E5B]/30 text-[#3F2E24]";

  const initial = tx.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="bg-white rounded-2xl p-4 w-[286px] border border-gray-100 flex flex-col gap-4 hover:shadow-md transition duration-300 font-[georgia]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3F2E24] text-white flex items-center justify-center font-semibold text-sm">
            {initial}
          </div>
          <div>
            <p
              className="text-sm font-semibold text-[#3F2E24]"
              style={{ marginBottom: "5px" }}
            >
              {tx.name}
            </p>
            <p className="text-xs text-gray-400">{tx.phone}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {tx.payment_status}
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-[#3F2E24]">
          ${Number(tx.amount).toLocaleString()}
        </span>
        <span className="text-xs text-gray-400">{tx.date}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400">Room</p>
          <p className="text-sm font-medium text-[#3F2E24]">
            #{tx.room_number}
          </p>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${roomColor}`}
        >
          {tx.room_is_available ? "Available" : "Occupied"}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${stayColor}`}
        >
          {tx.stayStatus}
        </span>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { reservations, rooms, payments, fetchDashboardData, loading } =
    useAdminStore();
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!payments.length) fetchDashboardData();
  }, [fetchDashboardData, payments.length]);

  const reservationMap = new Map(
    reservations.map((r) => [r.reservation_id, r]),
  );
  const roomMap = new Map(rooms.map((r) => [r.room_id, r]));
  const today = new Date();

  const transactions = payments
    .map((p) => {
      const reservation = reservationMap.get(p.reservation_id);
      const room = reservation ? roomMap.get(reservation.room_id) : null;

      const checkIn = reservation ? new Date(reservation.check_in_date) : null;
      const checkOut = reservation
        ? new Date(reservation.check_out_date)
        : null;
      let stayStatus = "Upcoming";
      if (checkIn && checkOut) {
        if (checkOut < today) stayStatus = "Checked Out";
        else if (checkIn <= today && today <= checkOut)
          stayStatus = "Checked In";
      }

      return {
        id: p.payment_id,
        name: reservation?.guest_name || "—",
        phone: reservation?.guest_phone || "—",
        room_number: room?.room_number ?? "—",
        room_is_available: room?.is_available ?? false,
        amount: p.amount,
        date: p.payment_date,
        payment_status: p.payment_status,
        stayStatus,
      };
    })
    .filter((tx) => (dateFilter ? tx.date === dateFilter : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalRevenue = transactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );
  const paidCount = transactions.filter(
    (t) => t.payment_status === "Paid",
  ).length;
  const pendingCount = transactions.filter(
    (t) => t.payment_status === "Pending",
  ).length;

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      <h2 className="text-lg font-semibold text-[#3F2E24] sticky top-0 backdrop-blur-lg p-4">
        Transactions
      </h2>
      <div>
        <p className="text-sm text-gray-500">All payments across bookings.</p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center font-semibold text-[#3F2E24]/70 text-sm uppercase tracking-wider">
          Loading transactions...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<FaCoins />}
              value={`$${totalRevenue.toLocaleString()}`}
              label="Total Revenue"
              bgColor="#ACE872"
              trend=""
            />
            <StatCard
              icon={<MdOutlineDownloadDone />}
              value={paidCount}
              label="Paid"
              bgColor="#ACE872"
              trend=""
            />
            <StatCard
              icon={<FaHourglassHalf />}
              value={pendingCount}
              label="Pending"
              bgColor="#FF9E5B"
              trend=""
            />
          </div>

          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#3F2E24]">All Transactions</h3>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none text-gray-600 bg-white"
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter("")}
                  className="text-sm text-white hover:text-[#3F2E24]! bg-amber-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {transactions.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {transactions.map((tx) => (
                <TransactionCard key={tx.id} tx={tx} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-sm text-gray-400">
              No transactions found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Transaction;
