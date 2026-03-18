"use client";

import { useState } from "react";
import { JobApplication, StatusGroup } from "../types";
import { groupLabels } from "../constants";
import { useJobActions } from "../hooks/useJobActions";
import { useJobFilters } from "../hooks/useJobFilters";
import JobForm from "./JobForm";
import JobCard from "./JobCard";
import StatsBar from "./StatsBar";
import StageManager from "./StageManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuPlus, LuX, LuSettings, LuFilter } from "react-icons/lu";

export default function TrackerView() {
  const { handleAddJob, handleUpdateStatus, handleDeleteJob } = useJobActions();
  const { jobs, stages, filter, setFilter, search, setSearch, filtered } =
    useJobFilters();
  const [showForm, setShowForm] = useState(false);
  const [showStageManager, setShowStageManager] = useState(false);

  function onAddJob(job: Omit<JobApplication, "id">) {
    handleAddJob(job, () => setShowForm(false));
  }

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Job Tracker
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Track, manage and organize all your job applications in one place.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowStageManager(!showStageManager)}
          className="text-xs h-8 px-2 shrink-0"
        >
          <LuSettings size={14} />
        </Button>
      </div>

      {showStageManager && (
        <div className="mb-4 md:mb-6">
          <StageManager />
        </div>
      )}

      <div className="mb-4 md:mb-6">
        <StatsBar jobs={jobs} />
      </div>

      {showForm && (
        <div className="mb-4 md:mb-6">
          <JobForm
            onAdd={onAddJob}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="flex gap-2 mb-3 md:mb-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 h-8 md:h-9 text-xs md:text-sm"
        />
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "secondary" : "default"}
          className="h-8 md:h-9 px-2.5 md:px-3 text-xs md:text-sm shrink-0"
        >
          {showForm ? (
            <>
              <LuX size={14} className="mr-1" />
              <span className="hidden sm:inline">Close</span>
            </>
          ) : (
            <>
              <LuPlus size={14} className="mr-1" />
              <span className="hidden sm:inline">Add</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-3 px-3 md:mx-0 md:px-0 flex-1">
          <Button
            variant={filter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("All")}
            className="h-7 md:h-8 px-2.5 md:px-3 text-[11px] md:text-xs shrink-0"
          >
            All
          </Button>
          {(["in-progress", "complete"] as StatusGroup[]).map((g) => (
            <Button
              key={g}
              variant={filter === g ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(g)}
              className="h-7 md:h-8 px-2.5 md:px-3 text-[11px] md:text-xs shrink-0"
            >
              {groupLabels[g]}
            </Button>
          ))}
        </div>
        <Select
          value={
            filter !== "All" &&
            filter !== "todo" &&
            filter !== "in-progress" &&
            filter !== "complete"
              ? filter
              : ""
          }
          onValueChange={(value) => {
            if (value) setFilter(value);
          }}
        >
          <SelectTrigger className="w-40 sm:w-48 h-7 md:h-8 text-[10px] md:text-xs shrink-0">
            <LuFilter size={12} className="mr-1 shrink-0" />
            <SelectValue placeholder="Filter by stage..." />
          </SelectTrigger>
          <SelectContent>
            {(["todo", "in-progress", "complete"] as StatusGroup[]).map(
              (g) => {
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
              }
            )}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10 md:py-16">
          <p className="text-muted-foreground text-base md:text-lg">
            No applications found
          </p>
          {jobs.length === 0 && (
            <p className="text-muted-foreground text-xs md:text-sm mt-2">
              Tap &quot;+&quot; to get started
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {filtered.map((job: JobApplication) => (
            <JobCard
              key={job.id}
              job={job}
              onStatusChange={handleUpdateStatus}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}
    </div>
  );
}
