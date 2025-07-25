"server only";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireDoctor } from "../doctor/require-doctor";

export async function getDoctor(id: string) {
  await requireDoctor();

  const data = cache(
    async () =>
      await prisma.user.findFirst({
        where: {
          id,
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
              id: true,
              clinic: true,
              department: true,
              study: true,
              userId: true,
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

export type GetDoctorType = Awaited<ReturnType<typeof getDoctor>>;
