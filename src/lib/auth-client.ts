import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { oneTapClient } from "better-auth/client/plugins";
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

  plugins: [adminClient(),
  oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      // Optional client configuration:
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        // Any extra options for the Google initialize method
      },
      // Configure prompt behavior and exponential backoff:
      promptOptions: {
        baseDelay: 1000,   // Base delay in ms (default: 1000)
        maxAttempts: 5     // Maximum number of attempts before triggering onPromptNotification (default: 5)
      }
    })
],
});
