import { Skeleton } from "@/components/ui/skeleton";

export default function BasicInformationSkeleton() {
  return (
    <div className="relative p-4 lg:p-5 group flex flex-col gap-4 h-full">
      <Skeleton className="h-6 w-[140px] rounded-md" />

      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[80px] rounded-md" />
            <Skeleton className="h-4 w-[120px] rounded-md" />
          </div>
        ))}
      </div>

      <div className="h-full">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
    </div>
  );
}
