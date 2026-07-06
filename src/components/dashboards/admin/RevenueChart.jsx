import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// import { MdOutlineDateRange } from "react-icons/md";
import { useAdminStore } from "../../../store/adminStore";
import {memo} from "react";

const RevenueChart = ({render}) => {
  const payments = useAdminStore((s) => s.payments);

  //storing the payment as payment_data:amount
  const totalsByDate = new Map();
  payments.forEach((p) => {
    const current = totalsByDate.get(p.payment_date) || 0;
    totalsByDate.set(p.payment_date, current + Number(p.amount));
  });

  //converting the map to Array of [{day:date,value:value}] of last 7 days
  const data = Array.from(totalsByDate.entries())
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .slice(-7)
    .map(([date, value]) => ({ day: date, value }));

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#3F2E24]">Revenue Stat</h3>
        {/* <button className="text-sm border rounded-lg px-3 py-1 text-gray-600 flex items-center gap-x-2">
          <MdOutlineDateRange fontSize={18} />
          Monthly
        </button> */}
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl font-bold font-mono text-[#3F2E24]">
          ${totalRevenue.toLocaleString()}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="day" axisLine={true} tickLine={false} />
          <YAxis axisLine={true} tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#ACE872"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(RevenueChart);
