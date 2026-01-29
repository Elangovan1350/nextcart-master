"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20),
});
type LoginData = z.infer<typeof loginSchema>;
const login = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (session.data?.user) {
      router.push("/");
    }
  }, [session.data, router]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen py-6 sm:py-12 ">
          <div className="w-full max-w-md">
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="text-center space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Welcome Back to
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                    {" "}
                    NextCart
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-300">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <form
                  onSubmit={handleSubmit(async (data) => {
                    setIsLoading(true);
                    const result = await signIn.email({
                      email: data.email,
                      password: data.password,
                    });
                    if (result.error) {
                      toast.error(result.error.message);
                    } else {
                      toast.success("Logged in successfully!");
                      router.push("/");
                    }
                    setIsLoading(false);
                  })}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <label className="block mb-2 font-semibold text-xs sm:text-sm text-slate-200">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-xs sm:text-sm text-slate-200">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2.5 sm:p-3 rounded-lg font-semibold text-sm sm:text-base transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging In..." : "Login"}
                    {!isLoading && (
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full border-2 border-slate-600 hover:border-blue-400 text-white p-2.5 sm:p-3 rounded-lg font-semibold text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Login with GitHub
                  </button>
                  <button
                    type="button"
                    className="w-full border-2 border-slate-600 hover:border-green-400 text-white p-2.5 sm:p-3 rounded-lg font-semibold text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Login with Google
                  </button>
                </form>

                {/* Footer Links */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-600 text-center space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm text-slate-300">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition"
                    >
                      Sign Up
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/forgot-password"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-xs sm:text-sm transition"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-xs sm:text-sm transition"
                    >
                      Back to Home
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

export default login;
