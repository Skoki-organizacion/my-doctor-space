import DoctorDashboardMainContent from "@/app/(doctor)/dashboard/[id]/_components/main-content";
import { getStudy } from "@/app/data/admin/get-study";
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { GetStudyType } from "@/app/data/admin/get-study";
import StudyDetailSkeletonLayout from "../_components/skeleton/study-detail-skeleton-layout";

type Params = Promise<{ ["id"]: string }>;

export default function StudyDetailsPage({ params }: { params: Params }) {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<StudyDetailSkeletonLayout />}>
        <RenderStudyDetail params={params} />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderStudyDetail({ params }: { params: Params }) {
  const { id } = await params;
  const studyDetails = await getStudy(id);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <RenderMainContent studyDetails={studyDetails} />
    </div>
  );
}

async function RenderMainContent({
  studyDetails,
}: {
  studyDetails: GetStudyType | null;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <DoctorDashboardMainContent studyDetails={studyDetails} />
    </div>
  );
}
