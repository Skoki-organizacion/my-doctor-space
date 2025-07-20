"server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export default async function getAllStudies() {
  await requireAdmin();

  const data = await prisma.doctorInfo.findMany({
    select: {
      id: true,
      clinic: true,
      department: true,
      study: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type GetAllStudiesType = Awaited<ReturnType<typeof getAllStudies>>;
