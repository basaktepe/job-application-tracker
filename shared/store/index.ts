import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import jobsReducer from "@/features/jobs/store/jobsSlice";
import stagesReducer from "@/features/jobs/store/stagesSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    stages: stagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
