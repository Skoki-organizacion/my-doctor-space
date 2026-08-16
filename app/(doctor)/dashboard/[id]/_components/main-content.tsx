"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GetStudyType } from "@/app/data/admin/get-study";
import CalendarItem from "../../_components/calendar";
import { NavigationItem } from "../../_components/navigation-item";
import { Badge } from "@/components/ui/badge";
import BasicInformation from "./basic-information";
import {
  studySteps,
  TOTAL_STUDY_STEPS,
  type StudyStep,
} from "@/constants/study-steps";

export default function DoctorDashboardMainContent({
  studyDetails,
}: {
  studyDetails: GetStudyType | null;
}) {
  const items = studyDetails?.items ?? [];
  const [currentStep, setCurrentStep] = useState<StudyStep>(studySteps[0]);

  const selectedItem = items.find((item) => item.name === currentStep.field);

  return (
    <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-6">
      <div className="flex flex-col rounded-xl bg-linear-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group flex items-center justify-between">
          <h1 className="text-lg font-semibold">Navigation</h1>
          <Badge variant={"outline"} className="py-1 px-2">
            Completed:{" "}
            <span className="font-bold tracking-wide">
              <span className="text-primary">{items.length}</span> /{" "}
              <span className="text-destructive">{TOTAL_STUDY_STEPS}</span>
            </span>
          </Badge>
        </div>

        <ScrollArea
          className="w-full rounded-md"
          style={{ height: "calc(100vh - 300px)" }}
        >
          {studySteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                currentStep.id === step.id &&
                  "bg-gradient-to-r bg-transparent from-sidebar-accent to-sidebar-accent/40",
                "bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 rounded-xl",
              )}
            >
              <NavigationItem
                step={step}
                items={items}
                onSelect={setCurrentStep}
              />
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group h-full overflow-hidden">
          <h1 className="text-lg font-semibold mb-4 lg:mb-5 truncate">
            {currentStep.title}
          </h1>

          {studyDetails && (
            <CalendarItem
              key={currentStep.field}
              studyId={studyDetails.id}
              step={currentStep}
              item={selectedItem}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <BasicInformation studyDetails={studyDetails} />
      </div>
    </div>
  );
}
