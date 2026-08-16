import "server-only";

import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/roles";
import { notFound } from "next/navigation";
import { cache } from "react";
import { requireDoctor } from "../doctor/require-doctor";

export const getDoctor = cache(async (id: string) => {
  const session = await requireDoctor();

  if (!isAdmin(session.user.role) && id !== session.user.id) {
    notFound();
  }

  const doctor = await prisma.user.findUnique({
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
          createdAt: true,
          items: true,
        },
      },
    },
  });

  if (!doctor) {
    notFound();
  }

  return doctor;
});

export type GetDoctorType = Awaited<ReturnType<typeof getDoctor>>;
