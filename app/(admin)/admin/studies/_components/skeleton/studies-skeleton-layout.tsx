import AdminStatsGridSkeleton from "../../../dashboard/_components/admin-stats-grid-skeleton";
import AdminTitleSkeleton from "../../../dashboard/_components/admin-title-skeleton";
import StudiesTableSkeleton from "./studies-table-skeleton";

export default function StudiesSkeletonLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminTitleSkeleton />
      <AdminStatsGridSkeleton />
      <StudiesTableSkeleton />
    </div>
  );
}
