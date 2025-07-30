"server-only";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireDoctor } from "../doctor/require-doctor";

export const getRecentlyUpdated = cache(async () => {
  await requireDoctor();

  const data = await prisma.doctorInfo.findFirst({
    orderBy: {
      updatedAt: "desc",
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
  });

  if (!data) {
    return notFound();
  }

  return data;
});

export type GetStudyType = NonNullable<
  Awaited<ReturnType<typeof getRecentlyUpdated>>
>;
