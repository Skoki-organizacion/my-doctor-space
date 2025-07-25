import { GetDoctorType } from "@/app/data/admin/get-doctor";
import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";
import Link from "next/link";

type DoctorStudies = NonNullable<GetDoctorType>["doctor"][0];

export default function StudiesGrid({ studies }: { studies: DoctorStudies[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {studies.map((study, index) => (
        <Link
          href={`/dashboard/${study.id}`}
          key={`${study}${index}`}
          className="relative p-4 lg:p-5 group rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar hover:bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 cursor-pointer"
        >
          <div className="relative flex items-start gap-4">
            <div className="flex flex-col w-full">
              <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
                Study
              </div>
              <div className="text-2xl font-semibold">{study?.study}</div>
              <div className="text-sm text-muted-foreground mb-2 mt-1 tracking-normal">
                {study.department}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-2">
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                  <p className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
                    Progress
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-xs bg-chart-4"
                      ></div>
                      <div className="text-[13px]/3 text-muted-foreground/50">
                        Individual
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-xs bg-chart-1"
                      ></div>
                      <div className="text-[13px]/3 text-muted-foreground/50">
                        Team
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-xs bg-chart-5"
                      ></div>
                      <div className="text-[13px]/3 text-muted-foreground/50">
                        Enterprise
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 h-5">
                <div
                  className="bg-chart-1 h-full"
                  style={{ width: "22%" }}
                ></div>
                <div
                  className="bg-linear-to-r from-chart-1 to-chart-2 h-full"
                  style={{ width: "24%" }}
                ></div>
                <div
                  className="bg-chart-5 h-full"
                  style={{ width: "16%" }}
                ></div>
                <div
                  className="bg-chart-3 h-full"
                  style={{ width: "38%" }}
                ></div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
