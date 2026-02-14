import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use same-origin /api/auth in production (handled by Next rewrites).
  // This ensures auth cookies are set for the frontend domain.
  basePath: "/api/auth",
});
