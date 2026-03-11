"use client";

import { JobApplication } from "../types";

interface StatsBarProps {
  jobs: JobApplication[];
}

export default function StatsBar({ jobs }: StatsBarProps) {
  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interview = jobs.filter((j) => j.status === "Interview").length;
  const offer = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  const stats = [
    { label: "Total", value: total, color: "text-gray-900" },
    { label: "Applied", value: applied, color: "text-blue-600" },
    { label: "Interview", value: interview, color: "text-yellow-600" },
    { label: "Offer", value: offer, color: "text-green-600" },
    { label: "Rejected", value: rejected, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm"
        >
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}