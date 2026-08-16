import "server-only";

import { prisma } from "@/lib/db";
import { cache } from "react";
import { requireAdmin } from "./require-admin";

export const getAdminData = cache(async () => {
  await requireAdmin();

  const [doctors, studies, latestUser, latestStudy] = await prisma.$transaction(
    [
      prisma.user.findMany({
        where: { role: "user" },
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
              createdAt: true,
              updatedAt: true,
              items: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  date: true,
                  checked: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.doctorInfo.findMany({
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
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.findFirst({
        where: { role: "user" },
        orderBy: { createdAt: "desc" },
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
      }),

      prisma.doctorInfo.findFirst({
        orderBy: { createdAt: "desc" },
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
              doctorInfoId: true,
              date: true,
              description: true,
              checked: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }),
    ],
  );

  return {
    doctors,
    studies,
    latestUser,
    latestStudy,
    stats: {
      totalUsers: doctors.length,
      totalStudies: studies.length,
    },
  };
});

export type AdminDataType = Awaited<ReturnType<typeof getAdminData>>;
export type AdminDoctorType = AdminDataType["doctors"][number];
export type AdminStudyType = AdminDataType["studies"][number];
