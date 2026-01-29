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
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [
    adminClient(),
    oneTapClient({
      // FIX 2: Ensure this variable is actually in your .env.local file
      clientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string) || "",
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        // Any extra options for the Google initialize method
      },
      promptOptions: {
        baseDelay: 1000, // Base delay in ms (default: 1000)
        maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
      },
    }),
  ],
});
