import { Skeleton } from "@/components/ui/skeleton";

export default function StudiesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-60 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="bg-sidebar border-b border-border p-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-7 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>
        </div>

        <div className="p-4 space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex gap-4 items-center h-9">
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-8 w-32 rounded-md" />
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-8 w-56 rounded-md" />
              <Skeleton className="h-8 w-32 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-32 rounded-md" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
