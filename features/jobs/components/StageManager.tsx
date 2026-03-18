"use client";

import { useState } from "react";
import { StatusGroup, StatusInfo } from "../types";
import { groups, groupLabels, groupBadgeColors, suggestedStatuses } from "../constants";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { addStageAsync, removeStageAsync, resetStagesAsync } from "../store/stagesSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuPlus, LuTrash2, LuRotateCcw } from "react-icons/lu";
import { toast } from "react-toastify";

export default function StageManager() {
  const dispatch = useAppDispatch();
  const stages = useAppSelector((state) => state.stages.items);
  const jobs = useAppSelector((state) => state.jobs.items);
  const [newLabel, setNewLabel] = useState("");
  const [newGroup, setNewGroup] = useState<StatusGroup>("in-progress");

  const alreadyAdded = new Set(stages.map((s) => s.label.toLowerCase()));
  const available = suggestedStatuses.filter(
    (s) => !alreadyAdded.has(s.label.toLowerCase())
  );

  function handleAddStage(stage: StatusInfo) {
    dispatch(addStageAsync(stage));
    toast.success(`"${stage.label}" added`);
  }

  function handleAddCustom() {
    const trimmed = newLabel.trim();
    if (!trimmed) return;

    if (alreadyAdded.has(trimmed.toLowerCase())) {
      toast.warning("This stage already exists");
      return;
    }

    dispatch(addStageAsync({ label: trimmed, group: newGroup }));
    setNewLabel("");
    toast.success(`"${trimmed}" added`);
  }

  function handleRemove(label: string) {
    const inUse = jobs.some((j) => j.status === label);
    if (inUse) {
      toast.warning(`Cannot delete "${label}" — it's in use`);
      return;
    }
    dispatch(removeStageAsync(label));
    toast.info(`"${label}" removed`);
  }

  function handleReset() {
    dispatch(resetStagesAsync());
    toast.info("Stages reset to defaults");
  }

  return (
    <Card>
      <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Manage Stages</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3"
          >
            <LuRotateCcw size={12} className="mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6 space-y-4">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-2">
            Active Stages
          </p>
          <div className="space-y-2">
            {groups.map((g) => {
              const groupStages = stages.filter((s) => s.group === g);
              if (groupStages.length === 0) return null;
              return (
                <div key={g}>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground mb-1">
                    {groupLabels[g]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {groupStages.map((s) => (
                      <Badge
                        key={s.label}
                        variant="outline"
                        className={`text-[10px] sm:text-xs pl-2 pr-1 py-0.5 gap-1 ${groupBadgeColors[g]}`}
                      >
                        {s.label}
                        <button
                          onClick={() => handleRemove(s.label)}
                          className="ml-0.5 hover:text-destructive transition-colors cursor-pointer"
                        >
                          <LuTrash2 size={10} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {available.length > 0 && (
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-2">
              Add Stage
            </p>
            <div className="flex flex-wrap gap-1.5">
              {available.map((s) => (
                <Badge
                  key={s.label}
                  variant="outline"
                  className="text-[10px] sm:text-xs pl-2 pr-1 py-0.5 gap-1 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleAddStage(s)}
                >
                  <LuPlus size={10} className="mr-0.5" />
                  {s.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-2">
            Custom Stage
          </p>
          <div className="flex gap-2">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Stage name..."
              className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
            />
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value as StatusGroup)}
              className="h-8 sm:h-9 rounded-md border border-input bg-transparent px-2 text-xs sm:text-sm"
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {groupLabels[g]}
                </option>
              ))}
            </select>
            <Button
              size="sm"
              onClick={handleAddCustom}
              className="h-8 sm:h-9 px-2.5 text-xs sm:text-sm shrink-0"
            >
              <LuPlus size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
