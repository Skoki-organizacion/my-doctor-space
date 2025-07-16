import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Auth Navigatino</h1>
      {children}
    </div>
  );
}
