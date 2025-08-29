import { getDoctor } from "@/app/data/admin/get-doctor";
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import DashboardDoctorInfo from "@/components/dashboard-info";
import StudiesGrid from "@/app/(doctor)/dashboard/_components/studies-grid";
import { Suspense } from "react";
import { GetDoctorType } from "@/app/data/admin/get-doctor";
import DoctorDetailSkeletonLayout from "./skeleton/doctor-detail-skeleton-layout";

type Params = Promise<{ ["id"]: string }>;

export default function DoctorDetailsPage({ params }: { params: Params }) {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <Suspense fallback={<DoctorDetailSkeletonLayout />}>
        <RenderDoctorDetail params={params} />
      </Suspense>
    </SidebarInset>
  );
}

async function RenderDoctorDetail({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getDoctor(id);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <RenderDashboardInfo data={data} />
      <RenderStudiesGrid doctorData={data} />
    </div>
  );
}

async function RenderDashboardInfo({ data }: { data: GetDoctorType }) {
  return <DashboardDoctorInfo data={data} />;
}

async function RenderStudiesGrid({
  doctorData,
}: {
  doctorData: GetDoctorType;
}) {
  return <StudiesGrid doctorData={doctorData} />;
}
