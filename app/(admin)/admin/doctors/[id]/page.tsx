import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function DoctorDetailsPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />

        <h1>OVDE ADSADB</h1>
      </div>
    </SidebarInset>
  );
}
