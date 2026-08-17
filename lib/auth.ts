import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";
import { prisma } from "./db";
import { ADMIN_ROLE, DEFAULT_ROLE } from "./roles";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 15 * 60, max: 5 },
      "/sign-up/email": { window: 15 * 60, max: 5 },
    },
  },
  plugins: [admin({ defaultRole: DEFAULT_ROLE, adminRoles: [ADMIN_ROLE] })],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
