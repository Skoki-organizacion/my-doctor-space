import { GetDoctorType } from "@/app/data/admin/get-doctor";
import { Book } from "lucide-react";

type DoctorStudies = NonNullable<GetDoctorType>["doctor"][0];

export default function StudiesGrid({ studies }: { studies: DoctorStudies[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {studies.map((study, index) => (
        <div
          key={`${study}${index}`}
          className="relative p-4 lg:p-5 group rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar hover:bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 cursor-pointer"
        >
          <div className="relative flex items-start gap-4">
            <div className="max-[480px]:hidden size-10 shrink-0 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400">
              <Book className="size-6" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
                Study
              </div>
              <div className="text-2xl font-semibold">{study?.study}</div>
              <div className="text-sm text-muted-foreground mb-2 mt-1 tracking-normal">
                {study.department}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
