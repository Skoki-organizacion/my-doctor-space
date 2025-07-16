import { SidebarInset } from "@/components/ui/sidebar";
import DoctorDashboardHeader from "./_components/header";
import DoctorDashboardTitle from "./_components/title";

export default function DoctorDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DoctorDashboardHeader />
      <DoctorDashboardTitle />
    </SidebarInset>
  );
}
