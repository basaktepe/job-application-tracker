"use client";

import { JobApplication, getStatusGroup } from "../types";
import { groups, groupLabels, groupBadgeColors } from "../constants";
import { useAppSelector } from "@/shared/store";
import { Card, CardContent } from "@/components/ui/card";
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
import { LuCalendar, LuExternalLink, LuTrash2, LuChevronRight } from "react-icons/lu";
import Link from "next/link";

interface JobCardProps {
  job: JobApplication;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function JobCard({
  job,
  onStatusChange,
  onDelete,
}: JobCardProps) {
  const stages = useAppSelector((state) => state.stages.items);
  const group = getStatusGroup(job.status, stages);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/jobs/${job.id}`} className="min-w-0 group">
            <h3 className="text-sm sm:text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-1">
              {job.company}
              <LuChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {job.position}
            </p>
          </Link>
          <Badge
            variant="outline"
            className={`text-[9px] sm:text-[11px] shrink-0 ${groupBadgeColors[group]}`}
          >
            {job.status}
          </Badge>
        </div>

        <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <LuCalendar size={10} className="sm:w-3 sm:h-3" />
            {new Date(job.dateApplied).toLocaleDateString("en-US")}
          </span>
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline truncate"
            >
              <LuExternalLink size={10} className="sm:w-3 sm:h-3" />
              Link
            </a>
          )}
        </div>

        {job.notes && (
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {job.notes}
          </p>
        )}

        <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
          <Select
            value={job.status}
            onValueChange={(value) => { if (value) onStatusChange(job.id, value); }}
          >
            <SelectTrigger className="w-40 sm:w-48 h-7 sm:h-8 text-[10px] sm:text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groups.map((g) => {
                const groupStages = stages.filter((s) => s.group === g);
                if (groupStages.length === 0) return null;
                return (
                  <SelectGroup key={g}>
                    <SelectLabel className="text-[10px] sm:text-xs">
                      {groupLabels[g]}
                    </SelectLabel>
                    {groupStages.map((s) => (
                      <SelectItem
                        key={s.label}
                        value={s.label}
                        className="text-[11px] sm:text-xs"
                      >
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(job.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3"
          >
            <LuTrash2 size={12} className="mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
