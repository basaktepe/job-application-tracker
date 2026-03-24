"use client";

import NovelEditor from "@/components/ui/editor";
import type { JSONContent } from "novel";

const demoContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "My Job Search Notes" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Tracking my applications for " },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Frontend Developer",
        },
        { type: "text", text: " roles this month." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Interview Prep" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Review " },
                {
                  type: "text",
                  marks: [{ type: "code" }],
                  text: "React hooks",
                },
                { type: "text", text: " and state management patterns" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Practice system design questions" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Prepare " },
                {
                  type: "text",
                  marks: [{ type: "italic" }],
                  text: "STAR method",
                },
                { type: "text", text: " answers for behavioral rounds" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tip: Always follow up within 48 hours after an interview!",
            },
          ],
        },
      ],
    },
  ],
};

export default function EditorDemo() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <NovelEditor
        initialContent={demoContent}
        className="min-h-[260px] shadow-xl shadow-black/5 bg-card"
      />
    </div>
  );
}
