"use server";

import { ApiResponse } from "@/lib/api-response";

export default async function signInAction(): Promise<ApiResponse> {
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
