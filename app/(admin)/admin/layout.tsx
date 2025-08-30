import { requireAdmin } from "@/app/data/admin/require-admin";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboardSidebar } from "./dashboard/_components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
