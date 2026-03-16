"use client";

import { JobApplication, getStatusGroup } from "../types";
import { useAppSelector } from "@/shared/store";
import { Card, CardContent } from "@/components/ui/card";

interface StatsBarProps {
  jobs: JobApplication[];
}

export default function StatsBar({ jobs }: StatsBarProps) {
  const stages = useAppSelector((state) => state.stages.items);
  const total = jobs.length;
  const todo = jobs.filter((j) => getStatusGroup(j.status, stages) === "todo").length;
  const inProgress = jobs.filter((j) => getStatusGroup(j.status, stages) === "in-progress").length;
  const complete = jobs.filter((j) => getStatusGroup(j.status, stages) === "complete").length;

  const stats = [
    { label: "Total", value: total, color: "text-foreground" },
    { label: "To-do", value: todo, color: "text-muted-foreground" },
    { label: "In Progress", value: inProgress, color: "text-blue-500" },
    { label: "Complete", value: complete, color: "text-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-2 sm:p-3 text-center">
            <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
