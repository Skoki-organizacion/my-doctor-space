import { ReactNode } from "react";
import { DoctorDashboardSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireDoctor } from "@/app/data/doctor/require-doctor";

export default async function DoctorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireDoctor();

  return (
    <SidebarProvider>
      <DoctorDashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
