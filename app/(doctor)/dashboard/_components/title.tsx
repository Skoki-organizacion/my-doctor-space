"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function DoctorDashboardTitle() {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold flex gap-2">
            Oilà,{" "}
            {session ? (
              `${session.user.name}!`
            ) : (
              <Skeleton className="h-8 w-[150px] rounded-full" />
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&rsquo;s an overview of your clinical insights. Track your
            progress and add new data with ease!
          </p>
        </div>
      </div>
    </div>
  );
}
