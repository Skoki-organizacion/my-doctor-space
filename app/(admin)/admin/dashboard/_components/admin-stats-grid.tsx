import { Book, Library, User2, Users } from "lucide-react";
import AdminStatsItem from "./admin-stats-item";
import { AdminDataType } from "@/app/data/admin/admin-data-service";
import Link from "next/link";

interface AdminStatsGridProps {
  adminData: AdminDataType;
}

export default function AdminStatsGrid({ adminData }: AdminStatsGridProps) {
  const { doctors, studies, latestUser, latestStudy } = adminData;

  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 rounded-xl bg-linear-to-br from-sidebar/60 to-sidebar">
      <AdminStatsItem
        icon={Users}
        link={"/admin/doctors"}
        title={"Doctors"}
        data={`Total: ${doctors.length}`}
      />

      <AdminStatsItem
        icon={Library}
        link={"/admin/studies"}
        title={"Studies"}
        data={`Total: ${studies.length}`}
      />

      <AdminStatsItem
        icon={User2}
        link={`/admin/doctors/${latestUser?.id}`}
        title={"Latest User"}
        data={latestUser?.name || "N/A"}
      />

      <AdminStatsItem
        icon={Book}
        link={`/admin/studies/${latestStudy?.id}`}
        title={"Latest Study"}
        data={latestStudy?.study || "N/A"}
      />
    </div>
  );
}
