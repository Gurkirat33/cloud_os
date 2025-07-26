"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, closeApp, toggleMinimizeApp, focusApp } from "@/lib/store";
import { widgets } from "@/data/widgets";

// Import app components
import SettingsApp from "./apps/SettingsApp";
import MailApp from "./apps/MailApp";
import BrowserApp from "./apps/BrowserApp";
import CalculatorApp from "./apps/CalculatorApp";
import WallpaperApp from "./apps/WallpaperApp";
import TodoApp from "./apps/TodoApp";
import NotepadApp from "./apps/NotepadApp";
import TerminalApp from "./apps/TerminalApp";
import SnakeGameApp from "./apps/SnakeGameApp";
import WeatherApp from "./apps/WeatherApp";
import ReadmeApp from "./apps/ReadmeApp";
import CameraApp from "./apps/CameraApp";

const getAppComponent = (widgetId: string) => {
  const widget = widgets.find((w) => w.id === widgetId);

  if (!widget) return null;

  switch (widget.title) {
    case "Settings.exe":
      return SettingsApp;
    case "Mail.exe":
      return MailApp;
    case "Browser.exe":
      return BrowserApp;
    case "Calculator.exe":
      return CalculatorApp;
    case "Wallpaper.exe":
      return WallpaperApp;
    case "TodoList.exe":
      return TodoApp;
    case "Notepad.exe":
      return NotepadApp;
    case "Terminal.exe":
      return TerminalApp;
    case "Snake.exe":
      return SnakeGameApp;
    case "Weather.exe":
      return WeatherApp;
    case "Camera.exe":
      return CameraApp;
    case "readme.md":
      return ReadmeApp;
    // Add more cases as you create more app components
    default:
      return null;
  }
};

export default function AppRenderer() {
  const dispatch = useDispatch();
  const openApps = useSelector((state: RootState) => state.app.openApps);

  const handleCloseApp = (appId: string) => {
    dispatch(closeApp(appId));
  };

  const handleMinimizeApp = (appId: string) => {
    dispatch(toggleMinimizeApp(appId));
  };

  const handleFocusApp = (appId: string) => {
    dispatch(focusApp(appId));
  };

  return (
    <>
      {openApps.map((app) => {
        const AppComponent = getAppComponent(app.id);

        if (!AppComponent) {
          // If no component is mapped, show a default placeholder
          const widget = widgets.find((w) => w.id === app.id);
          return (
            <div
              key={app.id}
              className="fixed inset-4 bg-background border border-border rounded-lg shadow-2xl p-6"
              style={{ zIndex: app.zIndex }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {widget?.title || "Unknown App"}
                </h2>
                <button
                  onClick={() => handleCloseApp(app.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <p className="text-muted-foreground">
                This app doesn&apos;t have a component implemented yet.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                App ID: {app.id} | Type: {widget?.type}
              </p>
            </div>
          );
        }

        return (
          <AppComponent
            key={app.id}
            onClose={() => handleCloseApp(app.id)}
            onMinimize={() => handleMinimizeApp(app.id)}
            onFocus={() => handleFocusApp(app.id)}
            isMinimized={app.isMinimized}
            zIndex={app.zIndex}
          />
        );
      })}
    </>
  );
}
