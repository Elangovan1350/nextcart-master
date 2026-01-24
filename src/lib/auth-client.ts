import "dotenv/config";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  getSession,
  sendVerificationEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  admin,
} = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient()],
});
