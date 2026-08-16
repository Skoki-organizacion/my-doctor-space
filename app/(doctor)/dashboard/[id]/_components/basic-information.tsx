import StudyBasedInfo from "./study-based-info";
import { dateFormat } from "@/lib/date-format";
import { StudyChart } from "./study-chart";
import { GetStudyType } from "@/app/data/admin/get-study";

export default function BasicInformation({
  studyDetails,
}: {
  studyDetails: GetStudyType | null;
}) {
  const items = studyDetails?.items ?? [];

  return (
    <div className="relative p-4 lg:p-5 group flex flex-col gap-4 h-full">
      <h1 className="text-lg font-semibold">Basic Information</h1>

      <div className="flex flex-col gap-3">
        <StudyBasedInfo title="Clinic" info={studyDetails?.clinic} />
        <StudyBasedInfo title="Department" info={studyDetails?.department} />
        <StudyBasedInfo title="Study" info={studyDetails?.study} />
        <StudyBasedInfo
          title="Created at"
          info={studyDetails ? dateFormat(studyDetails.createdAt) : ""}
        />
      </div>

      <div className="h-full">
        <StudyChart items={items} />
      </div>
    </div>
  );
}
