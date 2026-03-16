"use client";

import { useAppDispatch, useAppSelector } from "@/shared/store";
import { addJob, updateJobStatus, deleteJob } from "../store/jobsSlice";
import { JobApplication } from "../types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useJobActions() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.items);
  const router = useRouter();

  function handleAddJob(job: JobApplication, onSuccess?: () => void) {
    dispatch(addJob(job));
    toast.success(`${job.company} - ${job.position} added!`);
    onSuccess?.();
  }

  function handleUpdateStatus(id: string, status: string) {
    dispatch(updateJobStatus({ id, status }));
    toast.info(`Status updated to ${status}`);
  }

  function handleDeleteJob(id: string, opts?: { redirect?: boolean }) {
    const job = jobs.find((j) => j.id === id);
    dispatch(deleteJob(id));
    toast.error(`${job?.company} removed`);
    if (opts?.redirect) router.push("/tracker");
  }

  return { handleAddJob, handleUpdateStatus, handleDeleteJob };
}
