import { Skeleton } from "@/components/ui/skeleton";

type iAppProps = {
  user: {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  } | null;
} | null;

export default function DoctorDashboardTitle(data: iAppProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold flex gap-2">
          Oilà,{" "}
          {data?.user ? (
            `${data.user.name}!`
          ) : (
            <Skeleton className="h-8 w-37.5 rounded-full" />
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&rsquo;s an overview of your clinical insights. Track your
          progress and add new data with ease!
        </p>
      </div>
    </div>
  );
}
