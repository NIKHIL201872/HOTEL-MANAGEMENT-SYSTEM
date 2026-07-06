import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenueChart";
import RecentActivities from "./RecentActivities";
import BookingsCard from "./BookingsCard";
import { useAdminStore } from "../../../store/adminStore";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const {fetchDashboardData,loading} = useAdminStore();
  const { pathname } = useLocation();
  const isAdminHome = pathname === "/admin-dashboard";

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="flex bg-[#FDF2DF] min-h-screen w-full font-[georgia]">
      <Sidebar />
      <div className="flex-1 ml-60">
        {isAdminHome && <Topbar />}
        <div className="px-8 pb-8 flex flex-col gap-6">
          {isAdminHome ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-[#3F2E24]">
                  Hi, Admin!
                </h2>
                <p className="text-sm text-gray-500">
                  Whole data about your business here.
                </p>
              </div>

              {loading ? (
                <div className="h-64 flex items-center justify-center font-semibold text-[#3F2E24]/70 text-sm uppercase tracking-wider">
                  Loading dashboard data...
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <StatsGrid render={fetchDashboardData} />
                    <RevenueChart render={fetchDashboardData} />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <RecentActivities render={fetchDashboardData} />
                    <BookingsCard render={fetchDashboardData} />
                  </div>
                </>
              )}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
