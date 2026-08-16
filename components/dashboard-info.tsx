import { GetDoctorType } from "@/app/data/admin/get-doctor";
import { dateFormat } from "@/lib/date-format";

export default function DashboardDoctorInfo({ data }: { data: GetDoctorType }) {
  const formattedDate = dateFormat(data.createdAt);

  return (
    <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative group">
        <div className="relative flex items-start gap-4">
          <div className="flex flex-col">
            <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
              Doctor
            </div>
            <div className="text-2xl font-semibold">{data.name}</div>
            <div className="text-xs text-muted-foreground/80 mb-2 mt-1">
              Created at: {formattedDate}
            </div>

            <div className="text-base text-muted-foreground">
              Email: {data.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
