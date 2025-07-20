import { SidebarInset } from "@/components/ui/sidebar";
import ContactsTable from "@/app/(admin)/admin/dashboard/_components/contacts-table";
import AdminDashboardTitle from "./_components/admin-title";
import AdminDashboardHeader from "./_components/admin-header";
import AdminStatsGrid from "./_components/admin-stats-grid";

export default async function DoctorDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <AdminDashboardHeader />
        <AdminDashboardTitle />
        <AdminStatsGrid />

        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <ContactsTable />
        </div>
      </div>
    </SidebarInset>
  );
}
