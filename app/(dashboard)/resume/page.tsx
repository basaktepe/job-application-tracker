import type { Metadata } from "next";
import ResumePlaceholder from "@/features/resume/components/ResumePlaceholder";

export const metadata: Metadata = {
  title: "Resume Analyzer | Job Tracker",
  description: "Upload your resume and get AI-powered insights",
};

export default function ResumePage() {
  return <ResumePlaceholder />;
}
