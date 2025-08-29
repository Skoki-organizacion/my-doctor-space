import DashboardInfoSkeleton from "./dashboard-info-skeleton";
import StudiesGridSkeleton from "./studies-grid-skeleton";

export default function DoctorDetailSkeletonLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <DashboardInfoSkeleton />
      <StudiesGridSkeleton />
    </div>
  );
}
