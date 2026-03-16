import { Card, CardContent } from "@/components/ui/card";
import { LuFileText } from "react-icons/lu";

export default function ResumePlaceholder() {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
          <LuFileText size={40} className="sm:w-12 sm:h-12 text-muted-foreground mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Resume Analyzer
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">Coming Soon</p>
          <p className="text-muted-foreground text-xs sm:text-sm mt-2 max-w-md text-center">
            Upload your resume and get AI-powered insights to improve your job
            applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
