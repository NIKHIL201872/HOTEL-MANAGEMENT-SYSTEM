import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenueChart";
import RecentActivities from "./RecentActivities";
import BookingsCard from "./BookingsCard";

const Dashboard = () => {
  return (
    <div className="flex bg-[#FDF2DF] min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Topbar />
        <div className="px-8 pb-8 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-[#3F2E24]">Hi, Admin!</h2>
            <p className="text-sm text-gray-500">
              Whole data about your business here.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <StatsGrid />
            <RevenueChart />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <RecentActivities />
            <BookingsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
