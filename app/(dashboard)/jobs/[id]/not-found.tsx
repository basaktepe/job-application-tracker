import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LuSearch, LuArrowLeft } from "react-icons/lu";

export default function JobNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-3 md:px-4 py-10 md:py-16">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 px-4">
          <LuSearch size={40} className="text-muted-foreground mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Job Not Found
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 text-center">
            This application may have been deleted or doesn&apos;t exist.
          </p>
          <Link
            href="/tracker"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <LuArrowLeft size={14} />
            Back to Tracker
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
