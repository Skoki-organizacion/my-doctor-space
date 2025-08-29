import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import DoctorsSkeletonLayout from "./_components/skeleton/doctors-skeleton-layout";
import { getAllDoctors, GetAllDoctorsType } from "@/app/data/admin/get-doctors";
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
  const doctors = await getDoctorsData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <RenderAdminTitle doctors={doctors} />
      <RenderAdminStatsGrid />
      <RenderDoctorsTable doctors={doctors} />
    </div>
  );
}

async function RenderAdminTitle({ doctors }: { doctors: GetAllDoctorsType[] }) {
  return <AdminDashboardTitle doctors={doctors} />;
}

async function RenderAdminStatsGrid() {
  return <AdminStatsGrid />;
}

async function RenderDoctorsTable({
  doctors,
}: {
  doctors: GetAllDoctorsType[];
}) {
  return <DoctorsTable doctors={doctors} />;
}

async function getDoctorsData() {
  return await getAllDoctors();
}
