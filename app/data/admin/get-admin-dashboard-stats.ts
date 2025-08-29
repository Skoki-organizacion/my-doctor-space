"server-only";

import { getAdminData } from "./admin-data-service";

export async function adminGetDashboardStats() {
  const adminData = await getAdminData();

  return {
    totalUsers: adminData.doctors,
    totalStudies: adminData.studies,
    latestUser: adminData.latestUser,
    latestStudy: adminData.latestStudy,
  };
}
