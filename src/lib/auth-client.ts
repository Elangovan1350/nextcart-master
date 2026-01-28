import "dotenv/config";
import { createAuthClient } from "better-auth/react";
import { adminClient, oneTapClient } from "better-auth/client/plugins";

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
  oneTap,
} = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      autoSelect: false, // optional
      cancelOnTapOutside: true,
      context: "signin",
    }),
  ],
});
