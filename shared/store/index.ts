import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import jobsReducer from "@/features/jobs/store/jobsSlice";
import stagesReducer from "@/features/jobs/store/stagesSlice";

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();
  if (state.jobs.loaded) {
    localStorage.setItem("job-applications", JSON.stringify(state.jobs.items));
  }
  if (state.stages.loaded) {
    localStorage.setItem("job-stages", JSON.stringify(state.stages.items));
  }
  return result;
};

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    stages: stagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
