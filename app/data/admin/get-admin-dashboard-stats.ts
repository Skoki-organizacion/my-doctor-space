"server-only";

import { requireAdmin } from "./require-admin";
import { getAllDoctors } from "./get-doctors";
import { getLatestUser } from "./get-latest-user";
import { getLatestUpdatedStudy } from "./get-latest-updated-study";
import getAllStudies from "./get-studies";

export async function adminGetDashboardStats() {
  await requireAdmin();

  const [totalUsers, totalStudies, latestUser, latestStudy] = await Promise.all(
    [getAllDoctors(), getAllStudies(), getLatestUser(), getLatestUpdatedStudy()]
  );

  return {
    totalUsers,
    totalStudies,
    latestUser,
    latestStudy,
  };
}
