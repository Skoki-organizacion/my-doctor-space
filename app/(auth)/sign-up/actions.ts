"use server";

import { ApiResponse } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ADMIN_ROLE } from "@/lib/roles";
import { adminSignUpSchema, AdminSignUpSchemaType } from "@/lib/zod-schema";
import { APIError } from "better-auth/api";

export async function signUpAdmin(
  values: AdminSignUpSchemaType,
): Promise<ApiResponse> {
  const validation = adminSignUpSchema.safeParse(values);

  if (!validation.success) {
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  const { name, email, password } = validation.data;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    await prisma.user.update({
      where: { id: result.user.id },
      data: { role: ADMIN_ROLE },
    });

    return {
      status: "success",
      message: "Admin account created",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "Failed to create admin account",
    };
  }
}
