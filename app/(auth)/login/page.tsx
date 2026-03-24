"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { LuBriefcase } from "react-icons/lu";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const handleSignIn = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/tracker" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-2">
            <LuBriefcase size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSignIn("google")}
            className="w-full inline-flex items-center justify-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent cursor-pointer"
          >
            <FaGoogle size={18} />
            Sign in with Google
          </button>

          <button
            onClick={() => handleSignIn("github")}
            className="w-full inline-flex items-center justify-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent cursor-pointer"
          >
            <FaGithub size={18} />
            Sign in with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
