import Skeleton from "@/shared/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackerLoading() {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 mb-4 md:mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2 sm:p-3 text-center">
              <Skeleton className="h-7 w-10 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Skeleton className="h-8 md:h-9 w-full mb-3 md:mb-4" />

      <div className="flex gap-2 mb-4 md:mb-6">
        <Skeleton className="h-7 w-12" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-1.5" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
