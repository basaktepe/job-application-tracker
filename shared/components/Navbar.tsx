"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LuBriefcase, LuFileText, LuMenu, LuX, LuLogOut } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/tracker", label: "Job Tracker", icon: LuBriefcase },
  { href: "/resume", label: "Resume Analyzer", icon: LuFileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-3 md:px-4 h-12 md:h-14 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center text-sm px-3 py-1.5 rounded-md transition-colors hover:bg-accent ${
                  isActive ? "font-semibold" : "text-muted-foreground"
                }`}
              >
                <link.icon size={16} className="mr-1.5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <LuX size={18} /> : <LuMenu size={18} />}
        </button>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              )}
              <span className="hidden md:inline text-sm text-muted-foreground">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors text-muted-foreground"
                title="Sign out"
              >
                <LuLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="text-sm px-3 py-1.5 rounded-md transition-colors text-muted-foreground hover:bg-accent"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign up
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-3 py-2 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center text-sm px-3 py-2.5 rounded-md transition-colors hover:bg-accent ${
                    isActive ? "font-semibold bg-accent/50" : "text-muted-foreground"
                  }`}
                >
                  <link.icon size={16} className="mr-2" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
