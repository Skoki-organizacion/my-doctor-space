import { Book, Library, User2, Users } from "lucide-react";
import AdminStatsItem from "./admin-stats-item";
import { adminGetDashboardStats } from "@/app/data/admin/get-admin-dashboard-stats";

export default async function AdminStatsGrid() {
  const { totalUsers, totalStudies, latestUser, latestStudy } =
    await adminGetDashboardStats();

  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
      <AdminStatsItem
        icon={Users}
        link={"/admin/doctors"}
        title={"Doctors"}
        data={"Total: " + totalUsers.length}
      />

      <AdminStatsItem
        icon={Library}
        link={"/admin/studies"}
        title={"Studies"}
        data={"Total: " + totalStudies.length}
      />

      <AdminStatsItem
        icon={User2}
        link={`/admin/doctors/${latestUser && latestUser.id}`}
        title={"Latest User"}
        data={latestUser && latestUser.name}
      />

      <AdminStatsItem
        icon={Book}
        link={`/admin/studies/${latestStudy && latestStudy.id}`}
        title={"Latest Study"}
        data={latestStudy && latestStudy.study}
      />
    </div>
  );
}
