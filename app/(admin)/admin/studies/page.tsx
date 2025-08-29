import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import StudiesSkeletonLayout from "./_components/skeleton/studies-skeleton-layout";
import { getAllDoctors, GetAllDoctorsType } from "@/app/data/admin/get-doctors";
import { GetAllStudiesType } from "@/app/data/admin/get-studies";
import getAllStudies from "@/app/data/admin/get-studies";
import AdminStatsGrid from "../dashboard/_components/admin-stats-grid";
import AdminDashboardTitle from "../dashboard/_components/admin-title";
import StudiusTable from "./_components/studies-table";

export default function StudiesPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<StudiesSkeletonLayout />}>
        <RenderStudies />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderStudies() {
  const { doctors, studies } = await getStudiesData();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <RenderAdminTitle doctors={doctors} />
      <RenderAdminStatsGrid />
      <RenderStudiesTable studies={studies} />
    </div>
  );
}

async function RenderAdminTitle({ doctors }: { doctors: GetAllDoctorsType[] }) {
  return <AdminDashboardTitle doctors={doctors} />;
}

async function RenderAdminStatsGrid() {
  return <AdminStatsGrid />;
}

async function RenderStudiesTable({
  studies,
}: {
  studies: GetAllStudiesType[];
}) {
  return <StudiusTable studies={studies} />;
}

async function getStudiesData() {
  const [doctors, studies] = await Promise.all([
    getAllDoctors(),
    getAllStudies(),
  ]);

  return { doctors, studies };
}
