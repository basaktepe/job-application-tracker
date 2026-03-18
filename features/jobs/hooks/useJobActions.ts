"use client";

import { useAppDispatch, useAppSelector } from "@/shared/store";
import { createJob, updateJobStatusAsync, deleteJobAsync } from "../store/jobsSlice";
import { JobApplication } from "../types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useJobActions() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.items);
  const router = useRouter();

  async function handleAddJob(
    job: Omit<JobApplication, "id">,
    onSuccess?: () => void
  ) {
    await dispatch(createJob(job)).unwrap();
    toast.success(`${job.company} - ${job.position} added!`);
    onSuccess?.();
  }

  async function handleUpdateStatus(id: string, status: string) {
    await dispatch(updateJobStatusAsync({ id, status })).unwrap();
    toast.info(`Status updated to ${status}`);
  }

  async function handleDeleteJob(id: string, opts?: { redirect?: boolean }) {
    const job = jobs.find((j) => j.id === id);
    await dispatch(deleteJobAsync(id)).unwrap();
    toast.error(`${job?.company} removed`);
    if (opts?.redirect) router.push("/tracker");
  }

  return { handleAddJob, handleUpdateStatus, handleDeleteJob };
}
