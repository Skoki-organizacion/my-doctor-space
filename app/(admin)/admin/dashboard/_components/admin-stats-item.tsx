import { cn } from "@/lib/utils";
import Link from "next/link";

type iAppProps = {
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  title: string;
  data: number | string | null;
  trun?: boolean;
};

export default function AdminStatsItem({
  icon: Icon,
  link,
  title,
  data,
  trun,
}: iAppProps) {
  return (
    <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 hover:bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 transition rounded-xl">
      <div className="relative flex items-center gap-4">
        <div className="max-[480px]:hidden size-10 shrink-0 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400">
          <Icon className="size-6" />
        </div>
        <div>
          <Link
            href={link}
            className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0"
          >
            {title}
          </Link>
          <div
            className={cn(
              trun ? "w-23/24 truncate" : "w-full",
              "text-2xl font-semibold mb-2"
            )}
          >
            {data}
          </div>
          <div className="text-xs text-muted-foreground/60">vs last week</div>
        </div>
      </div>
    </div>
  );
}
