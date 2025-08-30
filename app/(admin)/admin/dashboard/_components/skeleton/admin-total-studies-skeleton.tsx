import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTotalStudiesSkeleton() {
  return (
    <div className="gap-4 border-none bg-gradient-to-br from-sidebar/60 to-sidebar rounded-xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Skeleton className="h-6 w-[120px] rounded-md" />
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-xs" />
            <Skeleton className="h-4 w-[50px] rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-xs" />
            <Skeleton className="h-4 w-[60px] rounded-md" />
          </div>
        </div>
      </div>
      <Skeleton className="h-60 w-full rounded-md" />
    </div>
  );
}
