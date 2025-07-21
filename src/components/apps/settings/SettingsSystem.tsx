"use client";

import { useState, useEffect } from "react";
import { Bell, Volume2, Save, Clock, Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsSystem() {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage
    const savedNotifications =
      localStorage.getItem("system_notifications") !== "false";
    const savedSounds = localStorage.getItem("system_sounds") !== "false";
    const savedAutoSave = localStorage.getItem("system_autosave") !== "false";
    const savedTimeFormat =
      (localStorage.getItem("system_time_format") as "12h" | "24h") || "12h";
    const savedLanguage = localStorage.getItem("system_language") || "en";

    setNotifications(savedNotifications);
    setSounds(savedSounds);
    setAutoSave(savedAutoSave);
    setTimeFormat(savedTimeFormat);
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("system_notifications", notifications.toString());
      localStorage.setItem("system_sounds", sounds.toString());
      localStorage.setItem("system_autosave", autoSave.toString());
      localStorage.setItem("system_time_format", timeFormat);
      localStorage.setItem("system_language", language);
    }
  }, [notifications, sounds, autoSave, timeFormat, language, mounted]);

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">System</h2>
        <p className="text-muted-foreground text-sm">
          Configure system behavior and preferences
        </p>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Notifications & Alerts</Label>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Enable Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Show system and app notifications
                </div>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">System Sounds</div>
                <div className="text-xs text-muted-foreground">
                  Play sounds for notifications and alerts
                </div>
              </div>
            </div>
            <button
              onClick={() => setSounds(!sounds)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                sounds ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  sounds ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Save className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Auto-save</div>
                <div className="text-xs text-muted-foreground">
                  Automatically save app data and settings
                </div>
              </div>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoSave ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoSave ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Time & Date */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Time Format
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTimeFormat("12h")}
            className={`p-3 rounded-lg border-2 transition-all ${
              timeFormat === "12h"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            }`}
          >
            <div className="text-sm font-medium">12-hour</div>
            <div className="text-xs text-muted-foreground">2:30 PM</div>
          </button>
          <button
            onClick={() => setTimeFormat("24h")}
            className={`p-3 rounded-lg border-2 transition-all ${
              timeFormat === "24h"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            }`}
          >
            <div className="text-sm font-medium">24-hour</div>
            <div className="text-xs text-muted-foreground">14:30</div>
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Language & Region
        </Label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 bg-background border border-border rounded-lg text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Current Settings Summary */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="text-sm font-medium mb-2">Current Settings</div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Notifications: {notifications ? "Enabled" : "Disabled"}</div>
          <div>Sounds: {sounds ? "Enabled" : "Disabled"}</div>
          <div>Auto-save: {autoSave ? "Enabled" : "Disabled"}</div>
          <div>Time Format: {timeFormat === "12h" ? "12-hour" : "24-hour"}</div>
          <div>
            Language: {languages.find((l) => l.code === language)?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
