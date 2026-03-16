import { RootState } from "@/shared/store";

export const selectJobs = (state: RootState) => state.jobs.items;
export const selectJobsLoaded = (state: RootState) => state.jobs.loaded;
export const selectStages = (state: RootState) => state.stages.items;
export const selectJobById = (id: string) => (state: RootState) =>
  state.jobs.items.find((j) => j.id === id);
