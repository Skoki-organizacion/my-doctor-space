import { ReactNode } from "react";
import AdminDashboardHeader from "../_components/admin-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function StudyAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 h-screen">
      <AdminDashboardHeader />
      {children}
    </SidebarInset>
  );
}
