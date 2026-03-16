export type StatusGroup = "todo" | "in-progress" | "complete";

export interface StatusInfo {
  label: string;
  group: StatusGroup;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  url: string;
  notes: string;
}

export function getStatusGroup(
  status: string,
  statuses: StatusInfo[]
): StatusGroup {
  return statuses.find((s) => s.label === status)?.group ?? "todo";
}
