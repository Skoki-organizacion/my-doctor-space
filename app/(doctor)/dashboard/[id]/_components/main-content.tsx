"use client";

import { stats } from "@/constants/stats";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GetStudyType } from "@/app/data/admin/get-study";
import CalendarItem from "../../_components/calendar";
import { NavigationItem } from "../../_components/navigation-item";

type iAppProps = {
  id: number;
  checked: boolean;
  title: string;
  field: string;
};

export default function DoctorDashboardMainContent({
  studyDetails,
}: {
  studyDetails: GetStudyType | null;
}) {
  const items = studyDetails?.items ?? [];
  const [current, setCurrent] = useState<iAppProps>(stats[0]);

  function getSelectedElement(item: iAppProps) {
    setCurrent(item);
  }

  const selectedElement =
    items.length > 0
      ? items.find((el) => el.name === current.field)
      : undefined;

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
          {stats.map((stat, index) => (
            <div
              key={stat.id + index}
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
                items={items}
              />
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group">
          <h1 className="text-lg font-semibold mb-4 lg:mb-5">
            {current?.title}
          </h1>

          <CalendarItem
            key={current.field}
            currentItem={current}
            item={selectedElement}
          />
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        {JSON.stringify(studyDetails)}
      </div>
    </div>
  );
}
