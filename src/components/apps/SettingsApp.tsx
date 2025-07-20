"use client";

import { Settings } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export default function SettingsApp({
  onClose,
  onMinimize,
  isMinimized = false,
}: AppProps) {
  return (
    <WindowContainer
      title="Settings"
      icon={<Settings className="w-4 h-4 text-blue-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      isMinimized={isMinimized}
      defaultWidth={700}
      defaultHeight={500}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold mb-2">System</h3>
            <p className="text-muted-foreground">Configure system settings</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold mb-2">Display</h3>
            <p className="text-muted-foreground">Adjust display preferences</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold mb-2">Privacy</h3>
            <p className="text-muted-foreground">Manage privacy settings</p>
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
