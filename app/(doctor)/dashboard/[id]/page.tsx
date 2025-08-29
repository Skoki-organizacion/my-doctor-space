import { getDoctor } from "@/app/data/admin/get-doctor";
import { getStudy } from "@/app/data/admin/get-study";
import DashboardHeader from "@/components/dashboard-header";
import DashboardDoctorInfo from "@/components/dashboard-info";
import { SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import DoctorDashboardMainContent from "./_components/main-content";
import { Suspense } from "react";
import DoctorDashboardDetailSkeletonLayout from "./_components/skeleton/doctor-dashboard-detail-skeleton-layout";
import { GetDoctorType } from "@/app/data/admin/get-doctor";
import { GetStudyType } from "@/app/data/admin/get-study";

type Params = Promise<{ ["id"]: string }>;

export default function DashboardStudyDetailsPage({
  params,
}: {
  params: Params;
}) {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<DoctorDashboardDetailSkeletonLayout />}>
        <RenderDoctorDashboardDetail params={params} />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderDoctorDashboardDetail({ params }: { params: Params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return notFound();
  }

  const data = await getDoctor(session?.user.id);
  const studyDetails = await getStudy(id);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <RenderDashboardInfo data={data} />
      <RenderMainContent studyDetails={studyDetails} />
    </div>
  );
}

async function RenderDashboardInfo({ data }: { data: GetDoctorType }) {
  return <DashboardDoctorInfo data={data} />;
}

async function RenderMainContent({
  studyDetails,
}: {
  studyDetails: GetStudyType | null;
}) {
  return <DoctorDashboardMainContent studyDetails={studyDetails} />;
}
