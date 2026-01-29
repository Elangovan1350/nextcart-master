import "dotenv/config";
import { betterAuth } from "better-auth";
import { admin, oneTap } from "better-auth/plugins";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string, // app password
  },
});
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET as string,
  plugins: [
    admin({
      defaultRole: "user", // Explicitly set the default for new signups
      adminRole: "admin", // Define what the admin role is called
    }),
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER as string,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER as string,
        to: user.email,
        subject: "Your password has been reset",
        text: `Your password has been successfully reset.`,
      });
    },
  },

  emailVerification: {
    sendOnSignIn: true,

    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER as string,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
});
