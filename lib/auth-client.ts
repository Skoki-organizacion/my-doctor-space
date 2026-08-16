import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

// No baseURL: the client resolves against the current origin, so the same build
// works in development, preview, and production.
export const authClient = createAuthClient({
  plugins: [adminClient()],
  cache: {
    enabled: true,
    maxAge: 5 * 60 * 1000,
  },
});
