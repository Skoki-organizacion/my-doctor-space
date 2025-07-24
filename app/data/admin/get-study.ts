"server-only";

import { cache } from "react";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getStudy(id: string) {
  await requireAdmin();

  console.log(id, "ID");

  const data = cache(
    async () =>
      await prisma.doctorInfo.findFirst({
        where: {
          id,
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
        },
      })
  );

  if (!data) {
    return notFound();
  }

  return await data();
}

export type GetStudyType = NonNullable<Awaited<ReturnType<typeof getStudy>>>;
