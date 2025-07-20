import { SidebarInset } from "@/components/ui/sidebar";
import ContactsTable from "@/app/(admin)/admin/dashboard/_components/contacts-table";
import AdminDashboardTitle from "./_components/admin-title";

import AdminStatsGrid from "./_components/admin-stats-grid";
import DashboardHeader from "../../../../components/dashboard-header";

export default async function DoctorDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <AdminDashboardTitle />
        <AdminStatsGrid />

        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <ContactsTable />
        </div>
      </div>
    </SidebarInset>
  );
}
