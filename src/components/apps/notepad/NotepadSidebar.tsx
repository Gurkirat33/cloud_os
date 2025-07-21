"use client";

import { FileText, X } from "lucide-react";
import { Note } from "../../../../types/notepad";
import { Button } from "../../ui/button";

interface NotepadSidebarProps {
  notes: Note[];
  currentNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export default function NotepadSidebar({
  notes,
  currentNote,
  onSelectNote,
  onDeleteNote,
}: NotepadSidebarProps) {
  return (
    <div className="w-72 border-r bg-muted/30">
      <div className="p-3 border-b bg-background">
        <h3 className="font-semibold text-foreground">
          Notes ({notes.length})
        </h3>
      </div>
      <div className="overflow-auto h-full">
        {notes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notes found</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note)}
              className={`p-3 border-b cursor-pointer transition-colors hover:bg-accent ${
                currentNote?.id === note.id
                  ? "bg-accent border-border"
                  : "border-border/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm truncate text-foreground">
                  {note.title}
                </h4>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {note.content.substring(0, 60)}...
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {note.lastModified.toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
