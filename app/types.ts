export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: Status;
  dateApplied: string;
  url: string;
  notes: string;
}