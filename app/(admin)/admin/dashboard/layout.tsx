import { ReactNode } from "react";

export default function DoctorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
