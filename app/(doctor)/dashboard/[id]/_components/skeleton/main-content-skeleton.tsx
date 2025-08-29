import { Skeleton } from "@/components/ui/skeleton";

export default function MainContentSkeleton() {
  return (
    <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-6">
      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>

        <div className="p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="p-4 rounded-xl">
              <Skeleton className="h-4 w-32 rounded-md mb-2" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group h-full overflow-hidden">
          <Skeleton className="h-6 w-32 rounded-md mb-4" />
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group flex flex-col gap-4 h-full">
          <Skeleton className="h-6 w-32 rounded-md" />

          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>

          <div className="h-full">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
