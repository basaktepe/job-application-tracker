import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusInfo, StatusGroup } from "../types";
import { defaultStatuses } from "../constants";

interface StagesState {
  items: StatusInfo[];
  loaded: boolean;
}

const initialState: StagesState = {
  items: defaultStatuses,
  loaded: false,
};

const stagesSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    loadStages(state, action: PayloadAction<StatusInfo[] | null>) {
      state.items = action.payload ?? defaultStatuses;
      state.loaded = true;
    },
    addStage(
      state,
      action: PayloadAction<{ label: string; group: StatusGroup }>
    ) {
      const exists = state.items.some(
        (s) => s.label.toLowerCase() === action.payload.label.toLowerCase()
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeStage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((s) => s.label !== action.payload);
    },
    resetStages(state) {
      state.items = defaultStatuses;
    },
  },
});

export const { loadStages, addStage, removeStage, resetStages } =
  stagesSlice.actions;
export default stagesSlice.reducer;
