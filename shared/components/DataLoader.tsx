"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchJobs } from "@/features/jobs/store/jobsSlice";
import { fetchStages } from "@/features/jobs/store/stagesSlice";
import ErrorCard from "./ErrorCard";

export default function DataLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((state) => state.jobs.loaded);
  const stagesLoaded = useAppSelector((state) => state.stages.loaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchJobs()).catch((err) => {
        console.error("Failed to fetch jobs:", err);
      });
    }
    if (!stagesLoaded) {
      dispatch(fetchStages()).catch((err) => {
        console.error("Failed to fetch stages:", err);
      });
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
