"use client";

import { stats } from "@/constants/stats";
import { NavigationItem } from "./navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";

type iAppProps =
  | {
      id: number;
      checked: boolean;
      title: string;
      field: string;
    }
  | undefined;

export default function DoctorDashboardMainContent() {
  const [current, setCurrent] = useState<iAppProps>(stats[0]);

  function getSelectedElement(item: iAppProps) {
    console.log(item, "ITEM");
    setCurrent(item);
  }

  return (
    <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-6">
      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group">
          <h1 className="text-lg font-semibold">Navigation</h1>
        </div>

        <ScrollArea
          className="w-full rounded-md"
          style={{ height: "calc(100vh - 400px)" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={cn(
                current?.id === stat.id &&
                  "bg-gradient-to-r bg-transparent from-sidebar-accent to-sidebar-accent/40",
                "bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 rounded-xl"
              )}
            >
              <NavigationItem
                key={stat.id}
                current={current}
                {...stat}
                selectedItem={getSelectedElement}
              />
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group">
          <h1 className="text-lg font-semibold">{current?.title}</h1>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <h1>qwbeqweb</h1>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar p-4 lg:p-5">
        <h1>Samo stats</h1>
      </div>
    </div>
  );
}
