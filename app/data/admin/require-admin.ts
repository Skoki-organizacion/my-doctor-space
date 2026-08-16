import "server-only";

import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/roles";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (!isAdmin(session.user.role)) {
    redirect("/not-admin");
  }

  return session;
});
