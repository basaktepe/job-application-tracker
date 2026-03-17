"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { LuBriefcase } from "react-icons/lu";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-2">
            <LuBriefcase size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Start tracking your job applications
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/tracker" })}
            className="w-full inline-flex items-center justify-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent"
          >
            <FaGoogle size={18} />
            Sign up with Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/tracker" })}
            className="w-full inline-flex items-center justify-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent"
          >
            <FaGithub size={18} />
            Sign up with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
