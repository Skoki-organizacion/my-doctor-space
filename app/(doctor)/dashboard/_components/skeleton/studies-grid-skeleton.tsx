import { Skeleton } from "@/components/ui/skeleton";

export default function StudiesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative p-4 lg:p-5 group rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar"
        >
          <div className="relative flex items-start gap-4">
            <div className="flex flex-col w-full">
              <Skeleton className="h-3 w-16 rounded-md mb-2" />
              <Skeleton className="h-8 w-32 rounded-md mb-2" />
              <Skeleton className="h-4 w-24 rounded-md mb-2" />

              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-2">
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                  <Skeleton className="h-3 w-20 rounded-md" />

                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-6 w-32 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 h-5">
                <Skeleton className="h-5 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
