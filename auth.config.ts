import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [Google, GitHub],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthConfig;
