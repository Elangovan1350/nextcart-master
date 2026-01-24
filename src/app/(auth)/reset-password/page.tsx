"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight, Loader } from "lucide-react";
import { resetPassword } from "@/lib/auth-client";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <Loader className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      }
    >
      <ResetPasswordComponent />
    </Suspense>
  );
}

const ResetPasswordComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    setIsLoading(true);
    try {
      // Add your reset password logic here
      const result = await resetPassword(
        { token, newPassword: data.password },
        {
          onSuccess: () => {
            toast.success("Password reset successfully!");
            setTimeout(() => {
              router.push("/login");
            }, 4000);
          },
        },
      );
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        <section className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center min-h-screen py-12 px-4">
            <div className="w-full max-w-md">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-lg shadow-lg text-center space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Invalid Reset Link
                </h3>
                <p className="text-slate-300">
                  The password reset link is invalid or expired.
                </p>
                <Link
                  href="/forgot-password"
                  className="inline-block bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Request New Link
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen py-12 px-4">
          <div className="w-full max-w-md">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Create a New
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                    {" "}
                    Password
                  </span>
                </h2>
                <p className="text-slate-300 text-lg">
                  Enter a new password for your account
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-lg shadow-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block mb-2 font-semibold text-slate-200">
                        New Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Min 8 characters"
                        disabled={isLoading}
                      />
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold text-slate-200">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Re-enter your password"
                        disabled={isLoading}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                      {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Password Reset!
                    </h3>
                    <p className="text-slate-300">
                      Your password has been successfully reset. Redirecting to
                      login...
                    </p>
                  </div>
                )}

                {/* Footer Links */}
                <div className="mt-6 pt-6 border-t border-slate-600 text-center space-y-3">
                  <p>
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition"
                    >
                      Back to Login
                    </Link>
                  </p>
                  <p className="text-slate-300">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
