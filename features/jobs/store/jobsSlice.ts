import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobApplication } from "../types";

interface JobsState {
  items: JobApplication[];
  loaded: boolean;
}

const initialState: JobsState = {
  items: [],
  loaded: false,
};

export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  const res = await fetch("/api/jobs");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json() as Promise<JobApplication[]>;
});

export const createJob = createAsyncThunk(
  "jobs/create",
  async (job: Omit<JobApplication, "id">) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error("Failed to create job");
    return res.json() as Promise<JobApplication>;
  }
);

export const updateJobStatusAsync = createAsyncThunk(
  "jobs/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update job");
    return { id, status };
  }
);

export const deleteJobAsync = createAsyncThunk(
  "jobs/delete",
  async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete job");
    return id;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateJobStatusAsync.fulfilled, (state, action) => {
        const job = state.items.find((j) => j.id === action.payload.id);
        if (job) job.status = action.payload.status;
      })
      .addCase(deleteJobAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((j) => j.id !== action.payload);
      });
  },
});

export default jobsSlice.reducer;
