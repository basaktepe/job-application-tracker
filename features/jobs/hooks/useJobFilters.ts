"use client";

import { useState, useMemo } from "react";
import { JobApplication, StatusGroup, getStatusGroup } from "../types";
import { useAppSelector } from "@/shared/store";

export type Filter = "All" | StatusGroup | string;

export function useJobFilters() {
  const jobs = useAppSelector((state) => state.jobs.items);
  const stages = useAppSelector((state) => state.stages.items);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((job: JobApplication) => {
      let matchesFilter = true;
      if (filter !== "All") {
        if (
          filter === "todo" ||
          filter === "in-progress" ||
          filter === "complete"
        ) {
          matchesFilter = getStatusGroup(job.status, stages) === filter;
        } else {
          matchesFilter = job.status === filter;
        }
      }

      const matchesSearch =
        !search ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [jobs, stages, filter, search]);

  return { jobs, stages, filter, setFilter, search, setSearch, filtered };
}
