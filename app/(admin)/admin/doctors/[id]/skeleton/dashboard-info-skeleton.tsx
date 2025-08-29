import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardInfoSkeleton() {
  return (
    <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      <div className="relative group">
        <div className="relative flex items-start gap-4">
          <div className="flex flex-col">
            <Skeleton className="h-3 w-16 rounded-md mb-2" />
            <Skeleton className="h-8 w-32 rounded-md mb-2" />
            <Skeleton className="h-3 w-24 rounded-md mb-2" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
