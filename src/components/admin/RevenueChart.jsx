import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { MdOutlineDateRange } from "react-icons/md";

const data = [
  { day: "Sat", value: 8000 },
  { day: "Sun", value: 12500 },
  { day: "Mon", value: 9000 },
  { day: "Tue", value: 15940 },
  { day: "Wed", value: 11000 },
  { day: "Thu", value: 13500 },
  { day: "Fri", value: 10000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#3F2E24]">Revenue Stat</h3>
        <button className="text-sm border rounded-lg px-3 py-1 text-gray-600 flex items-center gap-x-2">
          <MdOutlineDateRange fontSize={18} />
          Monthly
        </button>
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl font-bold text-[#3F2E24]">$48,748.50</span>
        <span className="text-green-600 text-sm font-medium">
          ↑ 16% from last month
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

export default RevenueChart;
