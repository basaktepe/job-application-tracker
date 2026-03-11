"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { JobApplication, Status } from "../types";

interface JobFormProps {
  onAdd: (job: JobApplication) => void;
  onCancel: () => void;
}

const statuses: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

const validationSchema = Yup.object({
  company: Yup.string()
    .trim()
    .required("Company name is required"),
  position: Yup.string()
    .trim()
    .required("Position is required"),
  status: Yup.string()
    .oneOf(statuses)
    .required("Status is required"),
  dateApplied: Yup.date()
    .required("Date is required"),
  url: Yup.string()
    .url("Please enter a valid URL")
    .optional(),
  notes: Yup.string()
    .optional(),
});

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const errorInputClass =
  "w-full border border-red-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500";

export default function JobForm({ onAdd, onCancel }: JobFormProps) {
  return (
    <Formik
      initialValues={{
        company: "",
        position: "",
        status: "Applied" as Status,
        dateApplied: new Date().toISOString().split("T")[0],
        url: "",
        notes: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onAdd({
          id: crypto.randomUUID(),
          company: values.company.trim(),
          position: values.position.trim(),
          status: values.status,
          dateApplied: values.dateApplied,
          url: values.url?.trim() || "",
          notes: values.notes?.trim() || "",
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">New Application</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <Field
                name="company"
                type="text"
                placeholder="Google, Apple..."
                className={
                  errors.company && touched.company ? errorInputClass : inputClass
                }
              />
              <ErrorMessage
                name="company"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <Field
                name="position"
                type="text"
                placeholder="Frontend Developer..."
                className={
                  errors.position && touched.position
                    ? errorInputClass
                    : inputClass
                }
              />
              <ErrorMessage
                name="position"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className={inputClass}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Applied
              </label>
              <Field
                name="dateApplied"
                type="date"
                className={
                  errors.dateApplied && touched.dateApplied
                    ? errorInputClass
                    : inputClass
                }
              />
              <ErrorMessage
                name="dateApplied"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job URL
              </label>
              <Field
                name="url"
                type="text"
                placeholder="https://..."
                className={
                  errors.url && touched.url ? errorInputClass : inputClass
                }
              />
              <ErrorMessage
                name="url"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <Field
                as="textarea"
                name="notes"
                rows={2}
                placeholder="Referral from..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Add Application
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}