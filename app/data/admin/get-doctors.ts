"server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export async function getAllDoctors() {
  // ✅ Authentication handled at layout level - no need for requireAdmin here

  const data = cache(
    async () =>
      await prisma.user.findMany({
        where: {
          role: "user",
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
              createdAt: true,
              updatedAt: true,
              items: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  date: true,
                },
              },
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

export type GetAllDoctorsType = Awaited<ReturnType<typeof getAllDoctors>>[0];
