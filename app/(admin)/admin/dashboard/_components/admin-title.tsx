import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import Link from "next/link";
import { UserSwitcher } from "./admin-user-toggler";
import { AdminDataType } from "@/app/data/admin/admin-data-service";

interface AdminDashboardTitleProps {
  adminData: AdminDataType;
}

export default function AdminDashboardTitle({
  adminData,
}: AdminDashboardTitleProps) {
  const userName = adminData.doctors[0]?.name || "Admin";

  return (
    <div className="flex items-center justify-between gap-4 mt-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold flex gap-2">Oilà, {userName}!</h1>
        <p className="text-sm text-muted-foreground">
          Here&rsquo;s an overview of your clinical insights. Track your
          progress and add new data with ease!
        </p>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <UserSwitcher doctors={adminData.doctors} />
        <Link href={"/admin/dashboard/sign-up"}>
          <Button variant={"outline"} className="flex">
            <ClipboardPlus className="size-4 text-primary" />
            New Doctor
          </Button>
        </Link>
      </div>
    </div>
  );
}
