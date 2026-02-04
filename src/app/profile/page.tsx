"use client";

import { useSession, signOut, sendVerificationEmail } from "@/lib/auth-client";
import { LogOut, Mail, User, Shield, Lock, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    router.push("/");
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
        <div className="text-center space-y-4 sm:space-y-6 w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Please Sign In
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            You need to be logged in to view your profile
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Profile Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 sm:mb-4">
            My
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              Profile
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-400">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Main Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 sm:p-6 lg:p-8 hover:border-slate-600 transition">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 shrink-0" />
                <span className="truncate">Account Information</span>
              </h2>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Name Field */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-2 sm:mb-3 text-sm sm:text-base">
                    Full Name
                  </label>
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 rounded-lg border border-slate-600 text-white text-sm sm:text-base wrap-break">
                    {user.name || "Not provided"}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-2 sm:mb-3 text-sm sm:text-base">
                    Email Address
                  </label>
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 rounded-lg border border-slate-600 text-white flex items-center gap-2 text-sm sm:text-base break-all">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                    <span className="min-w-0">
                      {user.email || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* Email Verification Status */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-2 sm:mb-3 text-sm sm:text-base">
                    Email Verification Status
                  </label>
                  <div className=" px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 rounded-lg border border-slate-600 flex  items-center justify-between gap-2 cursor-pointer hover:border-slate-500 transition text-sm sm:text-base">
                    <div className="flex  items-center gap-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span
                        className={
                          user.emailVerified
                            ? "text-green-400"
                            : "text-orange-400"
                        }
                      >
                        {user.emailVerified ? "✓ Verified" : "⊘ Not Verified"}
                      </span>
                    </div>
                    {!user.emailVerified && (
                      <button
                        className="text-orange-400 underline text-sm sm:text-base underline-offset-2"
                        onClick={() => {
                          setEmailSent(true);
                          sendVerificationEmail(
                            {
                              email: user.email,
                              callbackURL: "/profile",
                            },
                            {
                              onSuccess: () => {
                                toast.success("Verification email sent!");
                                setEmailSent(false);
                              },
                              onError: () => {
                                toast.error(
                                  "Failed to send verification email.",
                                );
                                setEmailSent(false);
                              },
                            },
                          );
                        }}
                        disabled={emailSent}
                      >
                        {emailSent
                          ? "Sending..."
                          : "Click to Verify Email Address"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Image */}
                {user.image && (
                  <div>
                    <label className="text-slate-300 font-semibold block mb-2 sm:mb-3 text-sm sm:text-base">
                      Profile Picture
                    </label>
                    <div className="rounded-lg border border-slate-600 overflow-hidden bg-slate-700 p-3 sm:p-4 flex justify-center">
                      <Image
                        src={user.image}
                        alt={user.name || "Profile"}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover"
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-4">
            {/* Admin Dashboard Button */}
            {session.user.role === "admin" && (
              <button
                onClick={() => router.push("/admin")}
                className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 text-sm sm:text-base"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span>Admin Dashboard</span>
              </button>
            )}

            {/* View Orders Button */}
            <button
              onClick={() => router.push("/order")}
              className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 text-sm sm:text-base"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span>View Orders</span>
            </button>

            {/* View Favorites Button */}
            <button
              onClick={() => router.push("/favorates")}
              className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/30 text-sm sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:scale-110 group-hover:fill-white transition-all duration-300" />
              <span>View Favorites</span>
            </button>
              
            {/* Change Password Button */}
            <button
              onClick={() => router.push("/change-password")}
              className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 text-sm sm:text-base"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span>Change Password</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:from-red-800 disabled:to-rose-800 disabled:opacity-70 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/30 disabled:hover:scale-100 disabled:hover:shadow-none text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              <span>{isLoading ? "Signing Out..." : "Sign Out"}</span>
            </button>

            {/* Quick Links */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button
                    onClick={() => router.push("/products")}
                    className="text-blue-400 hover:text-blue-300 transition text-sm w-full text-left"
                  >
                    → Shop Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/contact")}
                    className="text-blue-400 hover:text-blue-300 transition text-sm w-full text-left"
                  >
                    → Contact Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/about")}
                    className="text-blue-400 hover:text-blue-300 transition text-sm w-full text-left"
                  >
                    → About Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
