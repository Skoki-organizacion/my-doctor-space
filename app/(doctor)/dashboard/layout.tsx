import { ReactNode } from "react";

export default function DoctorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <h1>Dashboard navigation</h1>
      <div>{children}</div>
    </>
  );
}
