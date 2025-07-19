import { SidebarInset } from "@/components/ui/sidebar";
import DoctorDashboardHeader from "./_components/header";
import DoctorDashboardTitle from "./_components/title";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DoctorDashboardMainContent from "./_components/main-content";

export default async function DoctorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DoctorDashboardHeader user={session ? session.user : null} />
      <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
        <DoctorDashboardTitle user={session ? session.user : null} />
        <DoctorDashboardMainContent />
      </div>
    </SidebarInset>
  );
}
