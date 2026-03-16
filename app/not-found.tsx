import Link from "next/link";
import { LuHouse, LuSearch } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <LuSearch size={48} className="text-muted-foreground mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/tracker"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <LuHouse size={14} />
          Back to Tracker
        </Link>
      </div>
    </div>
  );
}