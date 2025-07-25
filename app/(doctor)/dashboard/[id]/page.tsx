import { getDoctor } from "@/app/data/admin/get-doctor";
import { getStudy } from "@/app/data/admin/get-study";
import DashboardHeader from "@/components/dashboard-header";
import DashboardDoctorInfo from "@/components/dashboard-info";
import { SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Params = Promise<{ ["id"]: string }>;

export default async function DashboardStudyDetailsPage({
  params,
}: {
  params: Params;
}) {
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
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
        <DashboardDoctorInfo data={data} />

        {JSON.stringify(studyDetails)}
      </div>
    </SidebarInset>
  );
}
