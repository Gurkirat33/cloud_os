"use client";

import { Search, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface NotepadSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
}

export default function NotepadSearchBar({
  searchTerm,
  onSearchChange,
  onClose,
}: NotepadSearchBarProps) {
  return (
    <div className="p-3 border-b bg-muted/30">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
