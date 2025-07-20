"use client";

import { Search, Power, User, Folder } from "lucide-react";
import { useState, useRef } from "react";
import { Widget, widgets } from "@/data/widgets";
import { useSession } from "next-auth/react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredWidgets = widgets.filter((widget) =>
    widget.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayWidgets = searchTerm ? filteredWidgets : widgets;

  const getFileIcon = (widget: Widget) => {
    if (widget.type === "folder") {
      return (
        <div className="relative">
          <Folder className="w-8 h-8 text-yellow-400" fill="currentColor" />
          <div className="absolute inset-0 w-8 h-8 opacity-20">
            <Folder className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      );
    }

    return (
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-sm border border-gray-300 shadow-sm">
        {widget.icon}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[600px] bg-background/95 backdrop-blur-xl rounded-lg border border-border shadow-2xl z-50 overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center bg-muted/50 rounded-md px-3 py-2 border border-border">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder-muted-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground text-sm font-medium">
              {searchTerm ? `Results (${filteredWidgets.length})` : "Widgets"}
            </h3>
            {!searchTerm && (
              <button className="text-primary hover:text-primary/80 text-sm transition-colors">
                All
              </button>
            )}
          </div>

          {/* Apps Grid */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {displayWidgets.length > 0 ? (
              <div className="grid grid-cols-6 gap-3">
                {displayWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex flex-col items-center p-3 hover:bg-accent rounded-lg cursor-pointer transition-all duration-200 group"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      {getFileIcon(widget)}
                    </div>
                    <span className="text-foreground text-xs text-center truncate w-full leading-tight">
                      {widget.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="mb-1">No results found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-foreground text-sm">
              {session?.user?.name}
            </span>
          </div>

          {/* Power Button */}
          <button
            className="p-1.5 hover:bg-accent rounded-md transition-colors group"
            title="Power options"
          >
            <Power className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
}
