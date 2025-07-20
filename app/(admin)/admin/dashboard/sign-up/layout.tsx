import { ReactNode } from "react";
import AdminDashboardHeader from "../../../../../components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function SignUpAdminLayout({
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
