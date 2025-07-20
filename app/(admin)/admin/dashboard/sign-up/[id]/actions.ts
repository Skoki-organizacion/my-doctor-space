"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { confirmUserSchema, ConfirmUserSchemaType } from "@/lib/zod-schema";

export default async function addDoctorInfo(
  values: ConfirmUserSchemaType
): Promise<ApiResponse> {
  try {
    await requireAdmin();

    const validation = confirmUserSchema.safeParse(values);

    console.log(values, "VALUES");

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.doctorInfo.create({
      data: {
        ...validation.data,
      },
    });

    return {
      status: "success",
      message: "Additional info successfully added",
    };
  } catch (error) {
    console.log(error, "ERROR");
    return {
      status: "error",
      message: "Failed to add additional information",
    };
  }
}
