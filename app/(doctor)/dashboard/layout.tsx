import { ReactNode } from "react";
import { DoctorDashboardSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DoctorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <DoctorDashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
