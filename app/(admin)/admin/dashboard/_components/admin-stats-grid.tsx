import { getAllDoctors } from "@/app/data/admin/get-doctors";
import { Library, Users } from "lucide-react";
import getAllStudies from "@/app/data/admin/get-studies";
import AdminStatsItem from "./admin-stats-item";

export default async function AdminStatsGrid() {
  const doctors = await getAllDoctors();
  const studies = await getAllStudies();

  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
      <AdminStatsItem
        icon={Users}
        link={"/admin/users"}
        title={"Users"}
        data={doctors.length}
      />

      <AdminStatsItem
        icon={Library}
        link={"/admin/studies"}
        title={"Studies"}
        data={studies.length}
      />
    </div>
  );
}
