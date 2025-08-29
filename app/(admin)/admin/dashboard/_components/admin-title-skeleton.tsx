import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTitleSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 mt-4">
      <div className="space-y-1">
        <Skeleton className="h-8 w-[200px] rounded-md" />
        <Skeleton className="h-4 w-[400px] rounded-md" />
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Skeleton className="h-10 w-[120px] rounded-md" />
        <Skeleton className="h-10 w-[120px] rounded-md" />
      </div>
    </div>
  );
}
