import { StatusInfo, StatusGroup } from "./types";

export const defaultStatuses: StatusInfo[] = [
  { label: "Not Applied", group: "todo" },
  { label: "Applied", group: "in-progress" },
  { label: "Interview", group: "in-progress" },
  { label: "Got Offer", group: "complete" },
  { label: "Rejected", group: "complete" },
];

export const suggestedStatuses: StatusInfo[] = [
  { label: "HR Interview", group: "in-progress" },
  { label: "Phone Screen", group: "in-progress" },
  { label: "Technical Interview", group: "in-progress" },
  { label: "Technical Case Study", group: "in-progress" },
  { label: "Test Stage", group: "in-progress" },
  { label: "Manager Interview", group: "in-progress" },
  { label: "Waiting for Offer/Rejection", group: "in-progress" },
  { label: "Reference Check", group: "in-progress" },
  { label: "Background Check", group: "in-progress" },
  { label: "Negotiation", group: "in-progress" },
  { label: "On Hold", group: "todo" },
  { label: "Withdrawn", group: "complete" },
  { label: "No Response", group: "complete" },
];

export const groups: StatusGroup[] = ["todo", "in-progress", "complete"];

export const groupLabels: Record<StatusGroup, string> = {
  todo: "To-do",
  "in-progress": "In Progress",
  complete: "Complete",
};

export const groupColors: Record<StatusGroup, string> = {
  todo: "text-muted-foreground",
  "in-progress": "text-blue-500",
  complete: "text-emerald-500",
};

export const groupBadgeColors: Record<StatusGroup, string> = {
  todo: "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
  "in-progress":
    "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300",
  complete:
    "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300",
};
