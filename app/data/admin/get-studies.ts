"server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";
import { cache } from "react";

export default async function getAllStudies() {
  await requireAdmin();

  const data = cache(
    async () =>
      await prisma.doctorInfo.findMany({
        select: {
          id: true,
          clinic: true,
          department: true,
          study: true,
          user: {
            select: {
              id: true,
              name: true,
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

export type GetAllStudiesType = Awaited<ReturnType<typeof getAllStudies>>[0];
