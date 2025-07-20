"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import SearchModal from "./SearchModal";
import { RootState, restoreApp, toggleMinimizeApp } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { widgets } from "@/data/widgets";

export default function SearchWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const openApps = useSelector((state: RootState) => state.app.openApps);

  // Get widgets for open apps
  const openAppWidgets = openApps
    .map((app) => ({
      ...app,
      widget: widgets.find((widget) => widget.id === app.id),
    }))
    .filter((item) => item.widget); // Only include apps that have corresponding widgets

  const handleAppClick = (appId: string, isMinimized: boolean) => {
    if (isMinimized) {
      // If minimized, restore it
      dispatch(restoreApp(appId));
    } else {
      // If active, minimize it
      dispatch(toggleMinimizeApp(appId));
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-2 items-center">
        <div
          className="flex items-center bg-muted/80 backdrop-blur-sm rounded-md px-3 py-2 min-w-72 cursor-text hover:bg-muted transition-all duration-200 border border-border"
          onClick={() => setIsOpen(true)}
        >
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <span className="text-foreground text-sm select-none">
            Search for apps, settings, and documents
          </span>
        </div>

        {openAppWidgets.map((item) => (
          <div
            key={item.id}
            className={`
              bg-muted/80 backdrop-blur-sm rounded-md px-2 py-1.5 cursor-pointer transition-all duration-200 border flex items-center gap-2 min-w-fit
              ${
                item.isMinimized
                  ? "border-border hover:bg-muted opacity-70"
                  : "border-primary/50 bg-primary/10 hover:bg-primary/20 shadow-sm"
              }
            `}
            onClick={() => handleAppClick(item.id, item.isMinimized)}
            title={`${item.isMinimized ? "Restore" : "Minimize"} ${
              item.widget?.title
            }`}
          >
            <span className="flex-shrink-0 text-sm">{item.widget?.icon}</span>
          </div>
        ))}
      </div>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
