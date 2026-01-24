"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { requestPasswordReset } from "@/lib/auth-client";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      // Add your forgot password logic here
      const result = await requestPasswordReset(
        { email: data.email, redirectTo: "/reset-password" },
        {
          onSuccess: () => {
            toast.success("Password reset link sent to your email!");
          },
          onError: (ctx) => {
            // Handle the error
            toast.error(ctx.error.message);
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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen py-12 px-4">
          <div className="w-full max-w-md">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Reset Your
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                    {" "}
                    Password
                  </span>
                </h2>
                <p className="text-slate-300 text-lg">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-lg shadow-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block mb-2 font-semibold text-slate-200">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
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
                      Email Sent!
                    </h3>
                    <p className="text-slate-300">
                      Check your email for a link to reset your password. The
                      link will expire in 1 hour.
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

export default ForgotPasswordPage;
