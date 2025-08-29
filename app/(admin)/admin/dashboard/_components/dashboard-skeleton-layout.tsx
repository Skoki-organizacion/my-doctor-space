import AdminTitleSkeleton from "./admin-title-skeleton";
import AdminStatsGridSkeleton from "./admin-stats-grid-skeleton";
import AdminTotalStudiesSkeleton from "./admin-total-studies-skeleton";
import BasicInformationSkeleton from "./basic-information-skeleton";

export default function DashboardSkeletonLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminTitleSkeleton />
      <AdminStatsGridSkeleton />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[100vh] flex-1 md:min-h-min gap-6 mb-6">
        <div className="flex flex-col rounded-xl gap-6">
          <AdminTotalStudiesSkeleton />
          <AdminTotalStudiesSkeleton />
        </div>

        <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
          <BasicInformationSkeleton />
        </div>
      </div>
    </div>
  );
}
