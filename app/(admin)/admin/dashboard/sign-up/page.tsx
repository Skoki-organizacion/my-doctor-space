import { Suspense } from "react";
import SignUpFormSkeleton from "./_components/sign-up-form-skeleton";
import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Suspense fallback={<SignUpFormSkeleton />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
