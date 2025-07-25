"use client";

import { Button } from "@/components/ui/button";
import { Files } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { GetDoctorType } from "@/app/data/admin/get-doctor";

type DoctorStudies = NonNullable<GetDoctorType>["doctor"][0];

export default function DashboardSelectStudy({
  studies,
}: {
  studies: DoctorStudies[];
}) {
  function selectStudy(study: DoctorStudies) {
    console.log(study, "STUDY");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <Files aria-hidden="true" className="size-4 text-primary" />{" "}
              Select study
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom" sideOffset={4}>
            <DropdownMenuLabel className="text-xs">
              Select user
            </DropdownMenuLabel>
            {studies.map((study, index) => (
              <DropdownMenuItem
                key={study.id}
                onClick={() => selectStudy(study)}
                className="gap-2 p-2"
              >
                {study.study}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
