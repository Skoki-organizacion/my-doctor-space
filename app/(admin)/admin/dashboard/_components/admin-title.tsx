import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminDashboardTitle() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold flex gap-2">
          Oilà,{" "}
          {session?.user ? (
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

      <Link href={"/admin/dashboard/sign-up"}>
        <Button className="px-3">Add Contact</Button>
      </Link>
    </div>
  );
}
