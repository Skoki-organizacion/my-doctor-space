"server-only";

import { getAdminData } from "./admin-data-service";

export async function adminGetDashboardStats() {
  // ✅ Authentication handled at layout level - no need for requireAdmin here
  // ✅ Use centralized data service instead of multiple separate calls

  const adminData = await getAdminData();

  return {
    totalUsers: adminData.doctors,
    totalStudies: adminData.studies,
    latestUser: adminData.latestUser,
    latestStudy: adminData.latestStudy,
  };
}
