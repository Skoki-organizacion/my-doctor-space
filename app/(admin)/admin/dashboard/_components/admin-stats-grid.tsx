import { getAllDoctors } from "@/app/data/admin/get-doctors";
import { StatsGrid } from "./stats-grid";
import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";
import { Users } from "lucide-react";

export default async function AdminStatsGrid() {
  const data = await getAllDoctors();

  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
      <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30">
        <div className="relative flex items-center gap-4">
          <RiArrowRightUpLine
            className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
            size={20}
            aria-hidden="true"
          />
          <div className="max-[480px]:hidden size-10 shrink-0 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400">
            <Users className="size-6" />
          </div>
          <div>
            <Link
              href={"/admin/users"}
              className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0"
            >
              Users
            </Link>
            <div className="text-2xl font-semibold mb-2">
              Total: {data.length}
            </div>
            <div className="text-xs text-muted-foreground/60">vs last week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
