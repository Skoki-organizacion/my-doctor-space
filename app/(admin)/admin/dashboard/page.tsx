import { SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "../../../../components/dashboard-header";
import { Suspense } from "react";
import DashboardSkeletonLayout from "./_components/dashboard-skeleton-layout";
import { getAllDoctors, GetAllDoctorsType } from "@/app/data/admin/get-doctors";
import {
  getLatestUpdatedStudy,
  LatestUpdatedStudyType,
} from "@/app/data/admin/get-latest-updated-study";
import AdminStatsGrid from "./_components/admin-stats-grid";
import { TotalStudies } from "./_components/admin-total-studies";
import BasicInformation from "@/app/(doctor)/dashboard/[id]/_components/basic-information";
import AdminDashboardTitle from "./_components/admin-title";

export default function DoctorDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<DashboardSkeletonLayout />}>
        <RenderDashboard />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderDashboard() {
  const { doctors, studyDetails } = await getDashboardData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <RenderAdminTitle doctors={doctors} />
      <RenderAdminStatsGrid />
      <RenderDashboardContent doctors={doctors} studyDetails={studyDetails} />
    </div>
  );
}

async function RenderAdminTitle({ doctors }: { doctors: GetAllDoctorsType[] }) {
  return <AdminDashboardTitle doctors={doctors} />;
}

async function RenderAdminStatsGrid() {
  return <AdminStatsGrid />;
}

async function RenderDashboardContent({
  doctors,
  studyDetails,
}: {
  doctors: GetAllDoctorsType[];
  studyDetails: LatestUpdatedStudyType | null;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[100vh] flex-1 md:min-h-min gap-6 mb-6">
      <div className="flex flex-col rounded-xl gap-6">
        <TotalStudies completed={false} title="In progress" doctors={doctors} />
        <TotalStudies completed={true} title="Completed" doctors={doctors} />
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <BasicInformation studyDetails={studyDetails} />
      </div>
    </div>
  );
}

async function getDashboardData() {
  const [doctors, studyDetails] = await Promise.all([
    getAllDoctors(),
    getLatestUpdatedStudy(),
  ]);

  return { doctors, studyDetails };
}
