import Skeleton from "@/shared/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumeLoading() {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-3 sm:mb-4" />
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardContent>
      </Card>
    </div>
  );
}
