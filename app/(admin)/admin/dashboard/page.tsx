import { SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "../../../../components/dashboard-header";
import { Suspense } from "react";
import DashboardSkeletonLayout from "./_components/dashboard-skeleton-layout";
import {
  getAdminData,
  AdminDataType,
} from "@/app/data/admin/admin-data-service";
import AdminStatsGrid from "./_components/admin-stats-grid";
import { TotalStudies } from "./_components/admin-total-studies";
import BasicInformation from "@/app/(doctor)/dashboard/[id]/_components/basic-information";
import AdminDashboardTitle from "./_components/admin-title";

export default function AdminDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<DashboardSkeletonLayout />}>
        <RenderDashboard />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderDashboard() {
  // ✅ Single data fetch for entire dashboard - eliminates multiple API calls
  const adminData = await getAdminData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminDashboardTitle adminData={adminData} />
      <AdminStatsGrid adminData={adminData} />
      <RenderDashboardContent adminData={adminData} />
    </div>
  );
}

async function RenderDashboardContent({
  adminData,
}: {
  adminData: AdminDataType;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[100vh] flex-1 md:min-h-min gap-6 mb-6">
      <div className="flex flex-col rounded-xl gap-6">
        <TotalStudies
          completed={false}
          title="In progress"
          doctors={adminData.doctors}
        />
        <TotalStudies
          completed={true}
          title="Completed"
          doctors={adminData.doctors}
        />
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <BasicInformation studyDetails={adminData.latestStudy} />
      </div>
    </div>
  );
}
