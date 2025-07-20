import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AdminDashboardSidebar } from "../dashboard/_components/admin-sidebar";

export default function DoctorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AdminDashboardSidebar />
        {children}
      </SidebarProvider>
    </>
  );
}
