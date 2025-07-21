import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import AdminStatsGrid from "../dashboard/_components/admin-stats-grid";
import AdminDashboardTitle from "../dashboard/_components/admin-title";
import DoctorsTable from "./_components/doctor-table";
import { getAllDoctors } from "@/app/data/admin/get-doctors";

export default async function DoctorsPage() {
  const doctors = await getAllDoctors();

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <AdminDashboardTitle doctors={doctors} />
        <AdminStatsGrid />

        <DoctorsTable doctors={doctors} />
      </div>
    </SidebarInset>
  );
}
