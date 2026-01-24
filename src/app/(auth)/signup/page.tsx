"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20),
  name: z.string().min(2).max(100),
});
type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center px-4 pb-10">
      <div className="w-full max-w-md ">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Create Your
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {" "}
                Account
              </span>
            </h2>
          </div>

          {/* Form Container */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-lg shadow-lg space-y-6">
            <form
              onSubmit={handleSubmit(async (data) => {
                setIsLoading(true);
                if (data.password !== data.confirmPassword) {
                  toast.error("Passwords do not match");
                  setIsLoading(false);
                  return;
                }
                const result = await signUp.email({
                  email: data.email,
                  password: data.password,
                  name: data.name,
                });
                if (result.error) {
                  toast.error(result.error.message);
                } else {
                  toast.success("Account created successfully!");
                  router.push("/");
                }
                setIsLoading(false);
              })}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 font-semibold text-slate-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white p-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition placeholder-slate-400"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 font-semibold text-slate-200">
                  Email
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
              <div>
                <label className="block mb-2 font-semibold text-slate-200">
                  Password
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
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
              <button
                type="button"
                className="w-full border-2 border-slate-600 hover:border-red-400 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);

                  const result = await signIn.social({
                    provider: "github",
                  });
                  if (result.error) {
                    toast.error(result.error.message);
                    setIsLoading(false);
                  }
                }}
              >
                Sign Up with GitHub
              </button>
              <button
                type="button"
                className="w-full border-2 border-slate-600 hover:border-green-400 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  const result = await signIn.social({
                    provider: "google",
                  });
                  if (result.error) {
                    toast.error(result.error.message);
                    setIsLoading(false);
                  }
                }}
              >
                Sign Up with Google
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-slate-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-cyan-400 font-semibold transition"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
