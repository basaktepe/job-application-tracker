import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker | Track Your Applications",
  description: "Track, manage and organize all your job applications in one place",
};

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}