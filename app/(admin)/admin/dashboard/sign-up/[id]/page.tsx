import { Suspense } from "react";
import InfoFormSkeleton from "./_components/info-form-skeleton";
import AdditionalInfoForm from "./_components/info-form";

type Params = Promise<{ ["id"]: string }>;

export default async function NewlyCreatedUserAdditionalInfo({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Suspense fallback={<InfoFormSkeleton />}>
        <AdditionalInfoForm id={id} />
      </Suspense>
    </div>
  );
}
