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

  const ownedStudy = await prisma.doctorInfo.findFirst({
    where: { id: studyId, userId: session.user.id },
    select: { id: true },
  });

  return ownedStudy !== null;
}

export async function saveDoctorInfo(
  values: StudyDetailSchemaType
): Promise<ApiResponse> {
  try {
    const validation = studyDetailSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    if (!(await canEditStudy(validation.data.doctorId))) {
      return {
        status: "error",
        message: "You are not allowed to edit this study",
      };
    }

    await prisma.item.create({
      data: {
        ...validation.data,
      },
    });

    revalidatePath(`/dashboard/${validation.data.doctorId}`);

    return {
      status: "success",
      message: "Item is successfully saved",
    };
  } catch {
    return {
      status: "error",
      message: "Could not save item to the doctor info",
    };
  }
}

export async function updateDoctorInfo(
  id: string,
  values: StudyDetailSchemaType
): Promise<ApiResponse> {
  try {
    const validation = studyDetailSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    if (!(await canEditStudy(validation.data.doctorId))) {
      return {
        status: "error",
        message: "You are not allowed to edit this study",
      };
    }

    // updateMany lets the item id be constrained by its owning study, so an id
    // belonging to someone else's study matches nothing.
    const { count } = await prisma.item.updateMany({
      where: { id, doctorId: validation.data.doctorId },
      data: {
        ...validation.data,
      },
    });

    if (count === 0) {
      return {
        status: "error",
        message: "Item not found",
      };
    }

    revalidatePath(`/dashboard/${validation.data.doctorId}`);

    return {
      status: "success",
      message: "Item is successfully updated",
    };
  } catch {
    return {
      status: "error",
      message: "Could not update item",
    };
  }
}
