"use client";

import { useState } from "react";
import { JobApplication, Status } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import StatsBar from "./components/StatsBar";

const statuses: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Home() {
  const [jobs, setJobs, loaded] = useLocalStorage<JobApplication[]>(
    "job-applications",
    []
  );
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");

  function addJob(job: JobApplication) {
    setJobs([job, ...jobs]);
    setShowForm(false);
  }

  function updateStatus(id: string, status: Status) {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  function deleteJob(id: string) {
    setJobs(jobs.filter((j) => j.id !== id));
  }

  const filtered = jobs.filter((job) => {
    const matchesStatus =
      filterStatus === "All" || job.status === filterStatus;
    const matchesSearch =
      !search ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Job Application Tracker
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage your job applications
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {showForm ? "Close" : "+ Add Application"}
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsBar jobs={jobs} />
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-6">
            <JobForm onAdd={addJob} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or position..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("All")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filterStatus === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  filterStatus === s
                    ? "bg-gray-900 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No applications found</p>
            {jobs.length === 0 && (
              <p className="text-gray-400 text-sm mt-2">
                Click &quot;+ Add Application&quot; to get started
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onStatusChange={updateStatus}
                onDelete={deleteJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}