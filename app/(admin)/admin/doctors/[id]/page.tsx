import { getDoctor } from "@/app/data/admin/get-doctor";
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import DashboardDoctorInfo from "@/components/dashboard-info";
import StudiesGrid from "@/app/(doctor)/dashboard/_components/studies-grid";

type Params = Promise<{ ["id"]: string }>;

export default async function DoctorDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const data = await getDoctor(id);

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />
        <DashboardDoctorInfo data={data} />

        <StudiesGrid doctorData={data} />
      </div>
    </SidebarInset>
  );
}
