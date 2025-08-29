import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import DoctorsSkeletonLayout from "./_components/skeleton/doctors-skeleton-layout";
import {
  getAdminData,
  AdminDataType,
} from "@/app/data/admin/admin-data-service";
import DoctorsTable from "./_components/doctor-table";
import AdminStatsGrid from "../dashboard/_components/admin-stats-grid";
import AdminDashboardTitle from "../dashboard/_components/admin-title";

export default function DoctorsPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<DoctorsSkeletonLayout />}>
        <RenderDoctors />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderDoctors() {
  // ✅ Reuse the same data service - eliminates duplicate API calls
  const adminData = await getAdminData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <AdminDashboardTitle adminData={adminData} />
      <AdminStatsGrid adminData={adminData} />
      <DoctorsTable doctors={adminData.doctors} />
    </div>
  );
}
