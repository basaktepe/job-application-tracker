import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobApplication } from "../types";

interface JobsState {
  items: JobApplication[];
  loaded: boolean;
}

const initialState: JobsState = {
  items: [],
  loaded: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    loadJobs(state, action: PayloadAction<JobApplication[]>) {
      state.items = action.payload;
      state.loaded = true;
    },
    addJob(state, action: PayloadAction<JobApplication>) {
      state.items.unshift(action.payload);
    },
    updateJobStatus(
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) {
      const job = state.items.find((j) => j.id === action.payload.id);
      if (job) {
        job.status = action.payload.status;
      }
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.items = state.items.filter((j) => j.id !== action.payload);
    },
  },
});

export const { loadJobs, addJob, updateJobStatus, deleteJob } =
  jobsSlice.actions;
export default jobsSlice.reducer;
