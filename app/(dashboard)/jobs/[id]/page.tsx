"use client";

import { use } from "react";
import JobDetailView from "@/features/jobs/components/JobDetailView";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <JobDetailView id={id} />;
}
