"use server";

import { requireDoctor } from "@/app/data/doctor/require-doctor";
import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/roles";
import { studyDetailSchema, StudyDetailSchemaType } from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";

/**
 * The study id arrives from the client, so it has to be re-checked against the
 * caller on every write. Admins may edit any study.
 */
async function canEditStudy(studyId: string): Promise<boolean> {
  const session = await requireDoctor();

  if (isAdmin(session.user.role)) {
    return true;
  }

  const ownedStudy = await prisma.doctor_info.findFirst({
    where: { id: studyId, userId: session.user.id },
    select: { id: true },
  });

  return ownedStudy !== null;
}

/**
 * A study step exists at most once per study, so saving is an upsert keyed on
 * (doctorInfoId, name) rather than separate create and update paths.
 */
export async function saveStudyStep(
  values: StudyDetailSchemaType,
): Promise<ApiResponse> {
  try {
    const validation = studyDetailSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const { doctorInfoId, name, date, description, checked } = validation.data;

    if (!(await canEditStudy(doctorInfoId))) {
      return {
        status: "error",
        message: "You are not allowed to edit this study",
      };
    }

    await prisma.item.upsert({
      where: { doctorInfoId_name: { doctorInfoId, name } },
      create: { doctorInfoId, name, date, description, checked },
      update: { date, description, checked },
    });

    revalidatePath(`/dashboard/${doctorInfoId}`);

    return {
      status: "success",
      message: "Study step saved",
    };
  } catch {
    return {
      status: "error",
      message: "Could not save the study step",
    };
  }
}
