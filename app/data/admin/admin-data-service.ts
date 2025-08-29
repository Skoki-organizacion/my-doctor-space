"server-only";

import { prisma } from "@/lib/db";
import { cache } from "react";

// ✅ Single function to get all admin data in one transaction
export const getAdminData = cache(async () => {
  const [doctors, studies, latestUser, latestStudy] = await prisma.$transaction([
    // Get all doctors with their data
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
    
    // Get all studies
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
    
    // Get latest user
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
    
    // Get latest study
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
            doctorId: true,
            date: true,
            description: true,
            checked: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    }),
  ]);

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
