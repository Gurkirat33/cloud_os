"use client";

import { Type } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface NotepadStatusBarProps {
  stats: {
    lines: number;
    words: number;
    characters: number;
  };
  fontSize: number;
  fontFamily: string;
  isModified: boolean;
  onFontSizeChange: (value: number) => void;
  onFontFamilyChange: (value: string) => void;
}

const FONT_SIZES = [
  { value: 10, label: "10px" },
  { value: 12, label: "12px" },
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
];

const FONT_FAMILIES = [
  { value: "monospace", label: "Monospace" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
];

export default function NotepadStatusBar({
  stats,
  fontSize,
  fontFamily,
  isModified,
  onFontSizeChange,
  onFontFamilyChange,
}: NotepadStatusBarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-t bg-muted/30 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>{stats.lines} lines</span>
        <span>{stats.words} words</span>
        <span>{stats.characters} characters</span>
        {isModified && (
          <span className="text-amber-600 dark:text-amber-400">
            ● Unsaved changes
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Type className="w-3 h-3" />
        <Select
          value={fontSize.toString()}
          onValueChange={(value: string) => onFontSizeChange(Number(value))}
        >
          <SelectTrigger className="w-16 h-6 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZES.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger className="w-24 h-6 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
