"server-only";

import { cache } from "react";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getLatestUpdatedStudy() {
  await requireAdmin();

  const data = cache(
    async () =>
      await prisma.doctorInfo.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          clinic: true,
          department: true,
          study: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            select: {
              id: true,
              name: true,
              doctorId: true,
              date: true,
              description: true,
              checked: true,
              createdAt: true,
              updatedAt: true,
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

export type LatestUpdatedStudyType = NonNullable<
  Awaited<ReturnType<typeof getLatestUpdatedStudy>>
>;
