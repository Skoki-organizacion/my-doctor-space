import AdminTitleSkeleton from "../../../dashboard/_components/skeleton/admin-title-skeleton";
import AdminStatsGridSkeleton from "../../../dashboard/_components/skeleton/admin-stats-grid-skeleton";
import DoctorTableSkeleton from "./doctor-table-skeleton";

export default function DoctorsSkeletonLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminTitleSkeleton />
      <AdminStatsGridSkeleton />
      <DoctorTableSkeleton />
    </div>
  );
}
