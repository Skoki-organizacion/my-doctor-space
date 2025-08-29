import { Skeleton } from "@/components/ui/skeleton";

export default function AdminStatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar p-6 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-8 w-[80px] rounded-md" />
          <Skeleton className="h-8 w-[120px] rounded-md" />
        </div>
      ))}
    </div>
  );
}
