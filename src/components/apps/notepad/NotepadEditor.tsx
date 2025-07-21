"use client";

import { useRef } from "react";
import { Input } from "../../ui/input";

interface NotepadEditorProps {
  title: string;
  content: string;
  fontSize: number;
  fontFamily: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export default function NotepadEditor({
  title,
  content,
  fontSize,
  fontFamily,
  onTitleChange,
  onContentChange,
}: NotepadEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex-1 flex flex-col">
      {/* Title Bar */}
      <div className="p-3 border-b bg-background">
        <Input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-lg font-semibold border-none shadow-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-none"
          placeholder="Note title..."
        />
      </div>

      {/* Text Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Start typing your note..."
          className="w-full h-full p-4 border-none outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            lineHeight: "1.6",
          }}
        />
      </div>
    </div>
  );
}
