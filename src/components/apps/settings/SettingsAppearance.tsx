"use client";

import { useState, useEffect } from "react";
import { Palette, Monitor, Sun, Moon, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SettingsAppearance() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [animations, setAnimations] = useState(true);
  const [transparency, setTransparency] = useState(true);
  const [accentColor, setAccentColor] = useState("#3b82f6");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage
    const savedTheme = localStorage.getItem("app_theme") as
      | "light"
      | "dark"
      | "system";
    const savedAnimations = localStorage.getItem("app_animations") === "true";
    const savedTransparency =
      localStorage.getItem("app_transparency") !== "false";
    const savedAccent = localStorage.getItem("app_accent_color") || "#3b82f6";

    if (savedTheme) setTheme(savedTheme);
    setAnimations(savedAnimations);
    setTransparency(savedTransparency);
    setAccentColor(savedAccent);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("app_theme", theme);
      localStorage.setItem("app_animations", animations.toString());
      localStorage.setItem("app_transparency", transparency.toString());
      localStorage.setItem("app_accent_color", accentColor);

      // Apply theme to document
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, animations, transparency, accentColor, mounted]);

  const accentColors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Red", value: "#ef4444" },
    { name: "Pink", value: "#ec4899" },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Appearance
        </h2>
        <p className="text-muted-foreground text-sm">
          Customize the look and feel of your desktop environment
        </p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "light"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            }`}
          >
            <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-sm font-medium">Light</div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "dark"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            }`}
          >
            <Moon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <div className="text-sm font-medium">Dark</div>
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === "system"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            }`}
          >
            <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-500" />
            <div className="text-sm font-medium">System</div>
          </button>
        </div>
      </div>

      {/* Accent Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Accent Color
        </Label>
        <div className="grid grid-cols-6 gap-3">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setAccentColor(color.value)}
              className={`w-12 h-12 rounded-lg border-2 transition-all ${
                accentColor === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Visual Effects */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Visual Effects</Label>

        <div className="space-y-3">
          {/* Animations */}
          <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-sm font-medium">Animations</div>
                <div className="text-xs text-muted-foreground">
                  Enable smooth transitions and animations
                </div>
              </div>
            </div>
            <button
              onClick={() => setAnimations(!animations)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                animations ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  animations ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Transparency */}
          <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Transparency Effects</div>
                <div className="text-xs text-muted-foreground">
                  Enable blur and transparency effects
                </div>
              </div>
            </div>
            <button
              onClick={() => setTransparency(!transparency)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                transparency ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  transparency ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/80 rounded-lg border border-border">
        <div className="text-sm font-medium mb-2">Preview</div>
        <div className="space-y-2">
          <div
            className="w-full h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <div className="text-xs text-muted-foreground">
            Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)} •
            Animations: {animations ? "On" : "Off"} • Transparency:{" "}
            {transparency ? "On" : "Off"}
          </div>
        </div>
      </div>
    </div>
  );
}
