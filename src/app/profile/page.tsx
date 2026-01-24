"use client";

import { useSession, signOut, sendVerificationEmail } from "@/lib/auth-client";
import { LogOut, Mail, User, Shield, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    router.push("/");
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">Please Sign In</h1>
          <p className="text-xl text-slate-400">
            You need to be logged in to view your profile
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition transform hover:scale-105"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Profile Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            My
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              Profile
            </span>
          </h1>
          <p className="text-xl text-slate-400">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-2 sm:p-8 hover:border-slate-600 transition">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-400" />
                Account Information
              </h2>

              <div className="space-y-8">
                {/* Name Field */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-3">
                    Full Name
                  </label>
                  <div className="px-2 sm:p-4 py-3 bg-slate-700 rounded-lg border border-slate-600 text-white">
                    {user.name || "Not provided"}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-3">
                    Email Address
                  </label>
                  <div className="px-2 sm:p-4 py-3 bg-slate-700 rounded-lg border border-slate-600 text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    {user.email || "Not provided"}
                  </div>
                </div>

                {/* Email Verification Status */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-3">
                    Email Verification Status
                  </label>
                  <div
                    className="px-2 sm:p-4 py-3 bg-slate-700 rounded-lg border border-slate-600 flex items-center gap-2"
                    onClick={() =>
                      sendVerificationEmail(
                        {
                          email: user.email,
                          callbackURL: "/profile",
                        },
                        {
                          onSuccess: () => {
                            toast.success("Verification email sent!");
                          },
                          onError: () => {
                            toast.error("Failed to send verification email.");
                          },
                        },
                      )
                    }
                  >
                    <Shield className="w-5 h-5" />
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
                </div>

                {/* Profile Image */}
                {user.image && (
                  <div>
                    <label className="text-slate-300 font-semibold block mb-3">
                      Profile Picture
                    </label>
                    <div className="rounded-lg border border-slate-600 overflow-hidden bg-slate-700 p-4 flex justify-center">
                      <img
                        src={user.image}
                        alt={user.name || "Profile"}
                        className="w-40 h-40 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Change Password Button */}
            <button
              onClick={() => router.push("/change-password")}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <Lock className="w-5 h-5" />
              Change Password
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              {isLoading ? "Signing Out..." : "Sign Out"}
            </button>

            {/* Quick Links */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
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
