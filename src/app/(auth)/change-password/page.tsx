"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { changePassword } from "@/lib/auth-client";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    setIsLoading(true);
    try {
      // Add your change password logic here
      const result = await changePassword(
        {
          newPassword: data.newPassword,
          currentPassword: data.currentPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: () => {
            toast.success("Password changed successfully!");
            // router.push("/profile");
            setIsSubmitted(true);
            setTimeout(() => {
              router.push("/profile");
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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen py-6 sm:py-12 px-4">
          <div className="w-full max-w-md">
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="text-center space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Change Your
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                    {" "}
                    Password
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-300">
                  Update your account password for better security
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
                {!isSubmitted ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label className="block mb-2 font-semibold text-xs sm:text-sm text-slate-200">
                        Current Password
                      </label>
                      <input
                        type="password"
                        {...register("currentPassword")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Enter your current password"
                        disabled={isLoading}
                      />
                      {errors.currentPassword && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold text-xs sm:text-sm text-slate-200">
                        New Password
                      </label>
                      <input
                        type="password"
                        {...register("newPassword")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Min 8 characters"
                        disabled={isLoading}
                      />
                      {errors.newPassword && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold text-xs sm:text-sm text-slate-200">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                        placeholder="Re-enter your new password"
                        disabled={isLoading}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2.5 sm:p-3 rounded-lg font-semibold text-sm sm:text-base transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Change Password"}
                      {!isLoading && (
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
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
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                      Password Updated!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Your password has been successfully changed. Redirecting
                      to your profile...
                    </p>
                  </div>
                )}

                {/* Footer Links */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-600 text-center space-y-2 sm:space-y-3">
                  <p>
                    <Link
                      href="/profile"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-xs sm:text-sm transition"
                    >
                      Back to Profile
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

export default ChangePasswordPage;
