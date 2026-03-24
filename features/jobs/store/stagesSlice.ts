import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchStages = createAsyncThunk("stages/fetch", async () => {
  const res = await fetch("/api/stages");
  if (!res.ok) throw new Error("Failed to fetch stages");
  return res.json() as Promise<StatusInfo[]>;
});

export const addStageAsync = createAsyncThunk(
  "stages/add",
  async (stage: { label: string; group: StatusGroup }) => {
    const res = await fetch("/api/stages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stage),
    });
    if (!res.ok) throw new Error("Failed to add stage");
    return res.json() as Promise<StatusInfo>;
  }
);

export const removeStageAsync = createAsyncThunk(
  "stages/remove",
  async (label: string) => {
    const res = await fetch("/api/stages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    if (!res.ok) throw new Error("Failed to remove stage");
    return label;
  }
);

export const resetStagesAsync = createAsyncThunk(
  "stages/reset",
  async () => {
    const res = await fetch("/api/stages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stages: defaultStatuses }),
    });
    if (!res.ok) throw new Error("Failed to reset stages");
    return defaultStatuses;
  }
);

const stagesSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchStages.rejected, (state) => {
        state.loaded = true;
      })
      .addCase(addStageAsync.fulfilled, (state, action) => {
        const exists = state.items.some(
          (s) => s.label.toLowerCase() === action.payload.label.toLowerCase()
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeStageAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.label !== action.payload);
      })
      .addCase(resetStagesAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default stagesSlice.reducer;
