import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/shared/components/ThemeToggle";
import { LuArrowRight, LuBriefcase, LuSparkles } from "react-icons/lu";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/tracker");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-foreground flex items-center justify-center">
              <LuBriefcase className="text-background" size={16} />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Job Tracker</h1>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-5">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Track Your Job Applications{" "}
              <span className="text-muted-foreground">Effortlessly</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Manage all your applications in one place.
              Analyze your resume with an AI-powered assistant and optimize your career journey.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <LuBriefcase size={14} />
              <span>Application Tracking</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <LuSparkles size={14} />
              <span>AI Assistant</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <Link href="/register">
              <Button size="lg" className="gap-2 px-6 h-11 text-[0.9rem]">
                Get Started <LuArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="h-11 text-[0.9rem]"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-foreground flex items-center justify-center">
              <LuBriefcase className="text-background" size={12} />
            </div>
            <span className="text-sm font-semibold">Job Tracker</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Job Tracker
          </p>
        </div>
      </footer>
    </div>
  );
}
