import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GitPullRequestCreateArrow } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger className="-ms-4" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="flex gap-3 ml-auto">
        <div className="rounded-md bg-linear-to-r bg-transparent from-primary/40 to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto px-4 py-2">
          <div className="group-data-[active=true]/menu-button:text-primary flex items-center justify-center gap-2">
            <GitPullRequestCreateArrow className="size-4" />{" "}
            <span className="text-sm">Version: 1.0 Beta</span>
          </div>
        </div>
      </div>
    </header>
  );
}
