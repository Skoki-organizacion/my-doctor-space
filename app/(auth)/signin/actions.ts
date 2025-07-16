"use server";

import { ApiResponse } from "@/lib/api-response";
import { SignInSchemaType } from "@/lib/zod-schema";

export default async function signInAction(
  values: SignInSchemaType
): Promise<ApiResponse> {
  console.log(values, "VALues");

  try {
    return {
      status: "success",
      message:
        "Unable to log you in at this moment. Please refresh the page and try again.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Unable to log you in at this moment. Please refresh the page and try again.",
    };
  }
}
