"use client";

import ErrorCard from "@/shared/components/ErrorCard";

export default function TrackerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorCard
      message={error.message}
      fallbackMessage="An unexpected error occurred while loading the tracker."
      reset={reset}
    />
  );
}
