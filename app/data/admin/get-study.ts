import "server-only";

import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/roles";
import { notFound } from "next/navigation";
import { cache } from "react";
import { requireDoctor } from "../doctor/require-doctor";

export const getStudy = cache(async (id: string) => {
  const session = await requireDoctor();

  const study = await prisma.doctorInfo.findFirst({
    where: isAdmin(session.user.role)
      ? { id }
      : { id, userId: session.user.id },
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

  if (!study) {
    notFound();
  }

  return study;
});

export type GetStudyType = Awaited<ReturnType<typeof getStudy>>;
