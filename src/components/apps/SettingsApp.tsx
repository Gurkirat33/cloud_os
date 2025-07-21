"use client";

import { useState } from "react";
import { Settings, User, Palette, Monitor, Info } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";
import SettingsProfile from "./settings/SettingsProfile";
import SettingsAppearance from "./settings/SettingsAppearance";
import SettingsSystem from "./settings/SettingsSystem";
import SettingsAbout from "./settings/SettingsAbout";
import { AppProps, SettingsCategory } from "../../../types/settingsApp";

export default function SettingsApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [activeCategory, setActiveCategory] =
    useState<SettingsCategory>("profile");

  const categories = [
    {
      id: "profile" as SettingsCategory,
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      component: <SettingsProfile />,
    },
    {
      id: "appearance" as SettingsCategory,
      label: "Appearance",
      icon: <Palette className="w-4 h-4" />,
      component: <SettingsAppearance />,
    },
    {
      id: "system" as SettingsCategory,
      label: "System",
      icon: <Monitor className="w-4 h-4" />,
      component: <SettingsSystem />,
    },
    {
      id: "about" as SettingsCategory,
      label: "About",
      icon: <Info className="w-4 h-4" />,
      component: <SettingsAbout />,
    },
  ];

  const activeComponent = categories.find(
    (cat) => cat.id === activeCategory
  )?.component;

  return (
    <WindowContainer
      title="Settings"
      icon={<Settings className="w-4 h-4 text-blue-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={900}
      defaultHeight={700}
      minWidth={800}
      minHeight={600}
    >
      <div className="h-full flex bg-background">
        {/* Sidebar */}
        <div className="w-64 bg-muted/30 border-r border-border p-4">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="mt-8 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              <div>Settings v1.0.0</div>
              <div>Desktop OS</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-4xl">{activeComponent}</div>
        </div>
      </div>
    </WindowContainer>
  );
}
