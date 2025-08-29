import DashboardInfoSkeleton from "../../../_components/skeleton/dashboard-info-skeleton";
import MainContentSkeleton from "./main-content-skeleton";

export default function DoctorDashboardDetailSkeletonLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <DashboardInfoSkeleton />
      <MainContentSkeleton />
    </div>
  );
}
