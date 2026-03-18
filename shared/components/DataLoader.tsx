"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchJobs } from "@/features/jobs/store/jobsSlice";
import { fetchStages } from "@/features/jobs/store/stagesSlice";

export default function DataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((state) => state.jobs.loaded);
  const stagesLoaded = useAppSelector((state) => state.stages.loaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchJobs());
    }
    if (!stagesLoaded) {
      dispatch(fetchStages());
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
