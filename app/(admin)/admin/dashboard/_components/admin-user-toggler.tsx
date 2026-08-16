"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { AdminDoctorType } from "@/app/data/admin/admin-data-service";
import { useRouter } from "next/navigation";

type iAppProps = {
  doctors: AdminDoctorType[];
};

export function UserSwitcher({ doctors }: iAppProps) {
  const router = useRouter();

  if (!doctors.length) return null;

  function selectUser(doctor: AdminDoctorType) {
    router.push(`/admin/dashboard/sign-up/${doctor.id}`);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <BookPlus aria-hidden="true" className="text-primary size-4" />{" "}
              New study
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom" sideOffset={4}>
            <DropdownMenuLabel className="text-xs">
              Select user
            </DropdownMenuLabel>
            {doctors.map((doctor, index) => (
              <DropdownMenuItem
                key={doctor.name}
                onClick={() => selectUser(doctor)}
                className="gap-2 p-2"
              >
                {doctor.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
