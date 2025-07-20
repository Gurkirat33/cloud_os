"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, closeApp, toggleMinimizeApp } from "@/lib/store";
import { widgets } from "@/data/widgets";

// Import app components
import SettingsApp from "./apps/SettingsApp";
import MailApp from "./apps/MailApp";
import BrowserApp from "./apps/BrowserApp";

// Component mapping based on widget ID
const getAppComponent = (widgetId: string) => {
  const widget = widgets.find((w) => w.id === widgetId);

  if (!widget) return null;

  // Map widget titles to their corresponding app components
  switch (widget.title) {
    case "Settings.exe":
      return SettingsApp;
    case "Mail.exe":
      return MailApp;
    case "Browser.exe":
      return BrowserApp;
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
              className="fixed inset-4 bg-background border border-border rounded-lg shadow-2xl z-50 p-6"
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
                This app doesn't have a component implemented yet.
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
            isMinimized={app.isMinimized}
          />
        );
      })}
    </>
  );
}
