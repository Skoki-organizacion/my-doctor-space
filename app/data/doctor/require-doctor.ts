"server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const requireDoctor = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  if (session.user.role !== "admin" && session.user.role !== "user") {
    return redirect("/not-admin");
  }

  return session;
};
