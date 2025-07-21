"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteDoctors(ids: string[]): Promise<ApiResponse> {
  try {
    await requireAdmin();

    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath("/admin/doctors");

    return {
      status: "success",
      message: "Selected doctors are removed successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete selected doctors",
    };
  }
}
