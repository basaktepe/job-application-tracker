"use client";

import {
  EditorRoot,
  EditorContent,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandList,
  EditorCommandItem,
  EditorCommandEmpty,
  type JSONContent,
} from "novel";
import {
  StarterKit,
  Placeholder,
  TiptapUnderline,
  TiptapLink,
  TaskList,
  TaskItem,
  Command,
  renderItems,
  handleCommandNavigation,
  createSuggestionItems,
} from "novel";
import {
  LuBold,
  LuItalic,
  LuStrikethrough,
  LuUnderline,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuList,
  LuListOrdered,
  LuQuote,
  LuText,
  LuSquareCheck,
  LuMinus,
} from "react-icons/lu";

const suggestionItems = createSuggestionItems([
  {
    title: "Text",
    description: "Plain text paragraph",
    searchTerms: ["p", "paragraph"],
    icon: <LuText size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
    },
  },
  {
    title: "Heading 1",
    description: "Large section heading",
    searchTerms: ["title", "big", "large", "h1"],
    icon: <LuHeading1 size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    searchTerms: ["subtitle", "medium", "h2"],
    icon: <LuHeading2 size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    searchTerms: ["small", "h3"],
    icon: <LuHeading3 size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Unordered list",
    searchTerms: ["unordered", "ul"],
    icon: <LuList size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Ordered list",
    searchTerms: ["ordered", "ol"],
    icon: <LuListOrdered size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "To-do List",
    description: "Task list with checkboxes",
    searchTerms: ["todo", "task", "checkbox"],
    icon: <LuSquareCheck size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Quote",
    description: "Block quote",
    searchTerms: ["blockquote", "cite"],
    icon: <LuQuote size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code Block",
    description: "Code snippet",
    searchTerms: ["codeblock", "pre"],
    icon: <LuCode size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Divider",
    description: "Horizontal rule",
    searchTerms: ["hr", "separator"],
    icon: <LuMinus size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
]);

const extensions = [
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: "list-disc ml-4" } },
    orderedList: { HTMLAttributes: { class: "list-decimal ml-4" } },
    heading: { HTMLAttributes: { class: "font-bold" } },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-2 border-border pl-4 italic text-muted-foreground",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-muted rounded-md p-3 font-mono text-sm",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-muted rounded px-1.5 py-0.5 font-mono text-sm",
      },
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: { class: "text-primary underline cursor-pointer" },
    openOnClick: false,
  }),
  TaskList,
  TaskItem.configure({ nested: true }),
  TiptapUnderline,
  Placeholder.configure({
    placeholder: "Press '/' for commands, or start writing...",
  }),
  Command.configure({
    suggestion: {
      items: () => suggestionItems,
      render: renderItems,
    },
  }),
];

interface NovelEditorProps {
  initialContent?: JSONContent | string;
  onChange?: (content: JSONContent) => void;
  onTextChange?: (text: string) => void;
  className?: string;
  editable?: boolean;
}

export default function NovelEditor({
  initialContent,
  onChange,
  onTextChange,
  className = "",
  editable = true,
}: NovelEditorProps) {
  const parsedContent: JSONContent | undefined =
    typeof initialContent === "string" && initialContent
      ? {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: initialContent }],
            },
          ],
        }
      : (initialContent as JSONContent | undefined);

  return (
    <div className={`rounded-lg border border-input bg-background ${className}`}>
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          initialContent={parsedContent}
          editable={editable}
          immediatelyRender={false}
          className="prose prose-sm dark:prose-invert max-w-none"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "px-4 py-3 min-h-[120px] focus:outline-none text-sm [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-2 [&_h1]:mb-1 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-2 [&_h2]:mb-1 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-2 [&_h3]:mb-1 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_pre]:bg-muted [&_pre]:rounded-md [&_pre]:p-3 [&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_p]:my-1 [&_li]:my-0.5",
            },
          }}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            onChange?.(json);
            onTextChange?.(editor.getText());
          }}
        >
          {editable && (
            <>
              {/* Bubble menu - appears on text selection */}
              <EditorBubble
                tippyOptions={{ placement: "top" }}
                className="flex items-center gap-0.5 rounded-lg border border-border bg-background px-2 py-1.5 shadow-md"
              >
                <EditorBubbleItem
                  onSelect={(editor) => editor.chain().focus().toggleBold().run()}
                >
                  <button type="button" className="p-1.5 rounded transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                    <LuBold size={14} />
                  </button>
                </EditorBubbleItem>
                <EditorBubbleItem
                  onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
                >
                  <button type="button" className="p-1.5 rounded transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                    <LuItalic size={14} />
                  </button>
                </EditorBubbleItem>
                <EditorBubbleItem
                  onSelect={(editor) => editor.chain().focus().toggleUnderline().run()}
                >
                  <button type="button" className="p-1.5 rounded transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                    <LuUnderline size={14} />
                  </button>
                </EditorBubbleItem>
                <EditorBubbleItem
                  onSelect={(editor) => editor.chain().focus().toggleStrike().run()}
                >
                  <button type="button" className="p-1.5 rounded transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                    <LuStrikethrough size={14} />
                  </button>
                </EditorBubbleItem>
                <EditorBubbleItem
                  onSelect={(editor) => editor.chain().focus().toggleCode().run()}
                >
                  <button type="button" className="p-1.5 rounded transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                    <LuCode size={14} />
                  </button>
                </EditorBubbleItem>
              </EditorBubble>

              {/* Slash command menu */}
              <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-lg border border-border bg-background px-1 py-2 shadow-md transition-all">
                <EditorCommandEmpty className="px-2 text-muted-foreground text-sm">
                  No results
                </EditorCommandEmpty>
                <EditorCommandList>
                  {suggestionItems.map((item) => (
                    <EditorCommandItem
                      key={item.title}
                      value={item.title}
                      onCommand={(val) => item.command!(val)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent cursor-pointer aria-selected:bg-accent"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </EditorCommandItem>
                  ))}
                </EditorCommandList>
              </EditorCommand>
            </>
          )}
        </EditorContent>
      </EditorRoot>
    </div>
  );
}

export type { JSONContent };
