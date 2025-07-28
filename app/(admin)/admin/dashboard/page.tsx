import { SidebarInset } from "@/components/ui/sidebar";
import ContactsTable from "@/app/(admin)/admin/dashboard/_components/contacts-table";
import AdminDashboardTitle from "./_components/admin-title";

import AdminStatsGrid from "./_components/admin-stats-grid";
import DashboardHeader from "../../../../components/dashboard-header";
import { getAllDoctors } from "@/app/data/admin/get-doctors";
import { getLatestUser } from "@/app/data/admin/get-latest-user";

export default async function DoctorDashboardPage() {
  const doctors = await getAllDoctors();

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <AdminDashboardTitle doctors={doctors} />
        <AdminStatsGrid />

        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <h1>qbqwb</h1>
        </div>
      </div>
    </SidebarInset>
  );
}
