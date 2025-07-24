import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import AdminStatsGrid from "../dashboard/_components/admin-stats-grid";
import AdminDashboardTitle from "../dashboard/_components/admin-title";
import { getAllDoctors } from "@/app/data/admin/get-doctors";
import StudiusTable from "./_components/studies-table";
import getAllStudies from "@/app/data/admin/get-studies";

export default async function StudiesPage() {
  const doctors = await getAllDoctors();
  const studies = await getAllStudies();

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <AdminDashboardTitle doctors={doctors} />
        <AdminStatsGrid />

        <StudiusTable studies={studies} />
      </div>
    </SidebarInset>
  );
}
