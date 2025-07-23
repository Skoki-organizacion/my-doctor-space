import { getDoctor } from "@/app/data/admin/get-doctor";
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { User2 } from "lucide-react";
import { format } from "date-fns";

type Params = Promise<{ ["id"]: string }>;

export default async function DoctorDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const data = await getDoctor(id);

  const date = new Date(data?.createdAt as unknown as string);
  const formattedDate = format(date, "dd MMMM yyyy");
  const parts = formattedDate.split(" ");
  const finalDate = `${parts[0]} ${
    parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
  } ${parts[2]}`;

  return (
    <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <DashboardHeader />

        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-4 lg:p-5 group rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
            <div className="relative flex items-start gap-4">
              <div className="max-[480px]:hidden size-10 shrink-0 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400">
                <User2 className="size-6" />
              </div>
              <div className="flex flex-col">
                <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
                  Doctor
                </div>
                <div className="text-2xl font-semibold">{data?.name}</div>
                <div className="text-sm text-muted-foreground/80 mb-2">
                  Created at:{" "}
                  <span className="text-muted-foreground/90">{finalDate}</span>
                </div>

                <div className="text-base text-muted-foreground">
                  Email: {data?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
