"use client";

import { Plus, Save, Upload, Download, Search, FolderOpen } from "lucide-react";
import { Button } from "../../ui/button";

interface NotepadToolbarProps {
  onNewNote: () => void;
  onSave: () => void;
  onImport: () => void;
  onExport: () => void;
  onToggleSearch: () => void;
  onToggleSidebar: () => void;
  isModified: boolean;
  canExport: boolean;
  showSearch: boolean;
  showSidebar: boolean;
}

export default function NotepadToolbar({
  onNewNote,
  onSave,
  onImport,
  onExport,
  onToggleSearch,
  onToggleSidebar,
  isModified,
  canExport,
  showSearch,
  showSidebar,
}: NotepadToolbarProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-background">
      <div className="flex items-center gap-2">
        <Button onClick={onNewNote} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          New
        </Button>
        <Button
          onClick={onSave}
          disabled={!isModified}
          variant="secondary"
          size="sm"
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button
          onClick={onImport}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Upload className="w-4 h-4" />
          Import
        </Button>
        <Button
          onClick={onExport}
          disabled={!canExport}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onToggleSearch}
          variant={showSearch ? "secondary" : "ghost"}
          size="sm"
          className="gap-2"
        >
          <Search className="w-4 h-4" />
        </Button>
        <Button
          onClick={onToggleSidebar}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <FolderOpen className="w-4 h-4" />
          {showSidebar ? "Hide" : "Show"} Notes
        </Button>
      </div>
    </div>
  );
}
