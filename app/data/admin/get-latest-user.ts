"server-only";

import { cache } from "react";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getLatestUser() {
  await requireAdmin();

  const data = cache(
    async () =>
      await prisma.user.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          doctor: {
            select: {
              clinic: true,
              department: true,
              study: true,
            },
          },
        },
      })
  );

  if (!data) {
    return notFound();
  }

  return await data();
}

export type LatestUserType = NonNullable<
  Awaited<ReturnType<typeof getLatestUser>>
>;
