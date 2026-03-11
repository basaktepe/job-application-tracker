"use client";

import { JobApplication, Status } from "../types";

const statusColors: Record<Status, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

interface JobCardProps {
  job: JobApplication;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const statuses: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobCard({ job, onStatusChange, onDelete }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.company}</h3>
          <p className="text-sm text-gray-600 truncate">{job.position}</p>
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[job.status]}`}
        >
          {job.status}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        <span>{new Date(job.dateApplied).toLocaleDateString("tr-TR")}</span>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            Job Link
          </a>
        )}
      </div>

      {job.notes && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{job.notes}</p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as Status)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => onDelete(job.id)}
          className="text-xs text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}