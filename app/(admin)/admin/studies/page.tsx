import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import StudiesSkeletonLayout from "./_components/skeleton/studies-skeleton-layout";
import {
  getAdminData,
  AdminDataType,
} from "@/app/data/admin/admin-data-service";
import AdminStatsGrid from "../dashboard/_components/admin-stats-grid";
import AdminDashboardTitle from "../dashboard/_components/admin-title";
import StudiusTable from "./_components/studies-table";

export default function StudiesPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<StudiesSkeletonLayout />}>
        <RenderStudies />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderStudies() {
  const adminData = await getAdminData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminDashboardTitle adminData={adminData} />
      <AdminStatsGrid adminData={adminData} />
      <StudiusTable studies={adminData.studies} />
    </div>
  );
}
