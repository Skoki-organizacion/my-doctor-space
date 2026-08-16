export const ROLES = ["admin", "user"] as const;

export type Role = (typeof ROLES)[number];

export const DEFAULT_ROLE: Role = "user";
export const ADMIN_ROLE: Role = "admin";

/**
 * better-auth stores `role` as a nullable string column, so every read has to
 * be narrowed before it can be trusted.
 */
export function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.includes(value as Role);
}

export function isAdmin(role: unknown): boolean {
  return role === ADMIN_ROLE;
}

export function dashboardPathForRole(role: unknown): string {
  return isAdmin(role) ? "/admin/dashboard" : "/dashboard";
}
