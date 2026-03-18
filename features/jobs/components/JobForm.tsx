"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { JobApplication } from "../types";
import { groups, groupLabels } from "../constants";
import { useAppSelector } from "@/shared/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JobFormProps {
  onAdd: (job: Omit<JobApplication, "id">) => void;
  onCancel: () => void;
}

export default function JobForm({ onAdd, onCancel }: JobFormProps) {
  const stages = useAppSelector((state) => state.stages.items);
  const statusLabels = stages.map((s) => s.label);

  const validationSchema = Yup.object({
    company: Yup.string().trim().required("Company name is required"),
    position: Yup.string().trim().required("Position is required"),
    status: Yup.string().oneOf(statusLabels).required("Status is required"),
    dateApplied: Yup.date().required("Date is required"),
    url: Yup.string().url("Please enter a valid URL").optional(),
    notes: Yup.string().optional(),
  });

  const defaultStatus =
    stages.find((s) => s.label === "Applied")?.label ?? stages[0]?.label ?? "";

  return (
    <Formik
      initialValues={{
        company: "",
        position: "",
        status: defaultStatus,
        dateApplied: new Date().toISOString().split("T")[0],
        url: "",
        notes: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onAdd({
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
        <Card>
          <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-base sm:text-lg">New Application</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs sm:text-sm">
                  Company *
                </Label>
                <Field
                  as={Input}
                  id="company"
                  name="company"
                  placeholder="Google, Apple..."
                  className={`h-8 sm:h-9 text-xs sm:text-sm ${
                    errors.company && touched.company ? "border-destructive" : ""
                  }`}
                />
                <ErrorMessage
                  name="company"
                  component="p"
                  className="text-destructive text-[10px] sm:text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="position" className="text-xs sm:text-sm">
                  Position *
                </Label>
                <Field
                  as={Input}
                  id="position"
                  name="position"
                  placeholder="Frontend Developer..."
                  className={`h-8 sm:h-9 text-xs sm:text-sm ${
                    errors.position && touched.position
                      ? "border-destructive"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="position"
                  component="p"
                  className="text-destructive text-[10px] sm:text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs sm:text-sm">
                  Status
                </Label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="flex h-8 sm:h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs sm:text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {groups.map((g) => {
                    const groupStages = stages.filter((s) => s.group === g);
                    if (groupStages.length === 0) return null;
                    return (
                      <optgroup key={g} label={groupLabels[g]}>
                        {groupStages.map((s) => (
                          <option key={s.label} value={s.label}>
                            {s.label}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </Field>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dateApplied" className="text-xs sm:text-sm">
                  Date Applied
                </Label>
                <Field
                  as={Input}
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  className={`h-8 sm:h-9 text-xs sm:text-sm ${
                    errors.dateApplied && touched.dateApplied
                      ? "border-destructive"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="dateApplied"
                  component="p"
                  className="text-destructive text-[10px] sm:text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="url" className="text-xs sm:text-sm">
                  Job URL
                </Label>
                <Field
                  as={Input}
                  id="url"
                  name="url"
                  placeholder="https://..."
                  className={`h-8 sm:h-9 text-xs sm:text-sm ${
                    errors.url && touched.url ? "border-destructive" : ""
                  }`}
                />
                <ErrorMessage
                  name="url"
                  component="p"
                  className="text-destructive text-[10px] sm:text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes" className="text-xs sm:text-sm">
                  Notes
                </Label>
                <Field
                  as={Textarea}
                  id="notes"
                  name="notes"
                  rows={2}
                  placeholder="Referral from..."
                  className="resize-none text-xs sm:text-sm"
                />
              </div>

              <div className="flex gap-2 sm:gap-3 sm:col-span-2">
                <Button type="submit" className="text-xs sm:text-sm h-8 sm:h-9">
                  Add Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
