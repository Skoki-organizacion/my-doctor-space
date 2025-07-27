"use server";

import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { studyDetailSchema, StudyDetailSchemaType } from "@/lib/zod-schema";

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

    await prisma.item.create({
      data: {
        ...validation.data,
        name: validation.data.name,
      },
    });

    return {
      status: "success",
      message: "Item is successfully saved",
    };
  } catch (error) {
    console.log(error, "ERROR");
    return {
      status: "error",
      message: "Could not save item to the doctor info",
    };
  }
}
