import "server-only";

import {auth} from "@/lib/auth";
import {isRole} from "@/lib/roles";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {cache} from "react";

export const requireDoctor = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (!isRole(session.user.role)) {
    redirect("/not-admin");
  }

  return session;
});
