import DoctorDashboardMainContent from "@/app/(doctor)/dashboard/[id]/_components/main-content";
import { getStudy } from "@/app/data/admin/get-study";
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

type Params = Promise<{ ["id"]: string }>;

export default async function StudyDetailsPage({ params }: { params: Params }) {
  const { id } = await params;
  const studyDetails = await getStudy(id);

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          <DoctorDashboardMainContent studyDetails={studyDetails} />
        </div>
      </div>
    </SidebarInset>
  );
}
