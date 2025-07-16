import { SidebarInset } from "@/components/ui/sidebar";
import DoctorDashboardHeader from "./_components/header";

export default function DoctorDashboardPage() {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <DoctorDashboardHeader />
      <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Oilà, Larry!</h1>
            <p className="text-sm text-muted-foreground">
              Here&rsquo;s an overview of your contacts. Manage or create new
              ones with ease!
            </p>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
