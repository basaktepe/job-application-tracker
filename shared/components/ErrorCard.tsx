"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LuTriangleAlert, LuRotateCcw } from "react-icons/lu";

interface ErrorCardProps {
  message?: string;
  fallbackMessage: string;
  reset: () => void;
}

export default function ErrorCard({ message, fallbackMessage, reset }: ErrorCardProps) {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-10 md:py-16">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 px-4">
          <LuTriangleAlert size={40} className="text-destructive mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 text-center max-w-md">
            {message || fallbackMessage}
          </p>
          <Button onClick={reset} size="sm">
            <LuRotateCcw size={14} className="mr-1.5" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
