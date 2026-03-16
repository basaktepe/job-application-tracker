"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/store";
import { getStatusGroup } from "../types";
import { groups, groupLabels, groupBadgeColors } from "../constants";
import { useJobActions } from "../hooks/useJobActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LuArrowLeft,
  LuCalendar,
  LuExternalLink,
  LuTrash2,
  LuStickyNote,
  LuBuilding2,
  LuBriefcase,
} from "react-icons/lu";
import { notFound } from "next/navigation";

interface JobDetailViewProps {
  id: string;
}

export default function JobDetailView({ id }: JobDetailViewProps) {
  const router = useRouter();
  const { handleUpdateStatus, handleDeleteJob } = useJobActions();
  const jobs = useAppSelector((state) => state.jobs.items);
  const stages = useAppSelector((state) => state.stages.items);

  const maybeJob = jobs.find((j) => j.id === id);

  if (!maybeJob) {
    return notFound();
  }

  const job = maybeJob;
  const group = getStatusGroup(job.status, stages);

  return (
    <div className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/tracker")}
        className="mb-4 text-xs sm:text-sm -ml-2"
      >
        <LuArrowLeft size={14} className="mr-1" />
        Back to Tracker
      </Button>

      <Card>
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg sm:text-xl">{job.company}</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {job.position}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`text-[10px] sm:text-xs shrink-0 ${groupBadgeColors[group]}`}
            >
              {job.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <LuBuilding2 size={14} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Company:</span>
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <LuBriefcase size={14} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Position:</span>
              <span className="font-medium">{job.position}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <LuCalendar size={14} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Applied:</span>
              <span className="font-medium">
                {new Date(job.dateApplied).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {job.url && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <LuExternalLink size={14} className="text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">URL:</span>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline truncate"
                >
                  {job.url}
                </a>
              </div>
            )}
          </div>

          {job.notes && (
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-1.5">
                <LuStickyNote size={14} />
                Notes
              </div>
              <p className="text-xs sm:text-sm bg-muted/50 rounded-md p-3">
                {job.notes}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2 border-t">
            <Select
              value={job.status}
              onValueChange={(value) => {
                if (value) handleUpdateStatus(id, value);
              }}
            >
              <SelectTrigger className="w-48 sm:w-56 h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {groups.map((g) => {
                  const groupStages = stages.filter((s) => s.group === g);
                  if (groupStages.length === 0) return null;
                  return (
                    <SelectGroup key={g}>
                      <SelectLabel className="text-xs">{groupLabels[g]}</SelectLabel>
                      {groupStages.map((s) => (
                        <SelectItem key={s.label} value={s.label} className="text-xs">
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  );
                })}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteJob(id, { redirect: true })}
              className="text-xs sm:text-sm"
            >
              <LuTrash2 size={14} className="mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
