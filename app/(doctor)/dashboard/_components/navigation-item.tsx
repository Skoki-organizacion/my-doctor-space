"use client";

import { GetStudyType } from "@/app/data/admin/get-study";
import { cn } from "@/lib/utils";
import type { StudyStep } from "@/constants/study-steps";

type NavigationItemProps = {
  step: StudyStep;
  items: GetStudyType["items"];
  onSelect: (step: StudyStep) => void;
};

export function NavigationItem({ step, items, onSelect }: NavigationItemProps) {
  const completed = items.some(
    (item) => item.name === step.field && item.checked
  );

  return (
    <button
      type="button"
      className="w-full cursor-pointer text-left"
      onClick={() => onSelect(step)}
    >
      <div className="relative p-4 lg:p-5 group before:absolute before:inset-x-8 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-input/30 before:via-input before:to-input/30">
        <div className="relative flex items-center gap-4">
          <div
            className={cn(
              "max-[480px]:hidden size-10 shrink-0 rounded-full flex items-center justify-center",
              completed
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-background text-sidebar"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
          <div className="w-full">
            <div className="font-normal text-sm leading-normal tracking-normal before:absolute before:inset-0">
              {step.title}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
