"use client";

import { useEffect } from "react";
import { JobApplication } from "@/features/jobs/types";
import { useAppDispatch, useAppSelector } from "../store";
import { loadJobs } from "@/features/jobs/store/jobsSlice";
import { loadStages } from "@/features/jobs/store/stagesSlice";

export default function DataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((state) => state.jobs.loaded);
  const stagesLoaded = useAppSelector((state) => state.stages.loaded);

  useEffect(() => {
    if (!loaded) {
      const storedJobs = localStorage.getItem("job-applications");
      const parsedJobs: JobApplication[] = storedJobs ? JSON.parse(storedJobs) : [];
      dispatch(loadJobs(parsedJobs));
    }
    if (!stagesLoaded) {
      const storedStages = localStorage.getItem("job-stages");
      dispatch(loadStages(storedStages ? JSON.parse(storedStages) : null));
    }
  }, [dispatch, loaded, stagesLoaded]);

  if (!loaded || !stagesLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
