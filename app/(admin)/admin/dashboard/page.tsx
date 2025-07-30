import { SidebarInset } from "@/components/ui/sidebar";
import AdminDashboardTitle from "./_components/admin-title";
import AdminStatsGrid from "./_components/admin-stats-grid";
import DashboardHeader from "../../../../components/dashboard-header";
import { getAllDoctors } from "@/app/data/admin/get-doctors";
import { TotalStudies } from "./_components/admin-total-studies";
import BasicInformation from "@/app/(doctor)/dashboard/[id]/_components/basic-information";
import { getRecentlyUpdated } from "@/app/data/admin/get-recent-updated";

export default async function DoctorDashboardPage() {
  const doctors = await getAllDoctors();
  const studyDetails = await getRecentlyUpdated();

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <AdminDashboardTitle doctors={doctors} />
        <AdminStatsGrid />

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[100vh] flex-1 md:min-h-min gap-6 mb-6">
          <div className="flex flex-col rounded-xl gap-6">
            <TotalStudies
              completed={false}
              title="In progress"
              doctors={doctors}
            />
            <TotalStudies
              completed={true}
              title="Completed"
              doctors={doctors}
            />
          </div>

          <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
            <BasicInformation studyDetails={studyDetails} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
