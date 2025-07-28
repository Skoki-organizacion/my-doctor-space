import { SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import DashboardDoctorInfo from "@/components/dashboard-info";
import { getDoctor } from "@/app/data/admin/get-doctor";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import StudiesGrid from "./_components/studies-grid";

export default async function DoctorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const data = await getDoctor(session?.user.id);

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
        <DashboardDoctorInfo data={data} />

        <StudiesGrid doctorData={data} />
      </div>
    </SidebarInset>
  );
}
