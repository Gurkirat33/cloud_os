"use client";

import { Mail, Send, Inbox } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export default function MailApp({
  onClose,
  onMinimize,
  isMinimized = false,
}: AppProps) {
  return (
    <WindowContainer
      title="Mail"
      icon={<Mail className="w-4 h-4 text-blue-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      isMinimized={isMinimized}
      defaultWidth={900}
      defaultHeight={600}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
              <Inbox className="w-4 h-4" />
              <span>Inbox (3)</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
              <Send className="w-4 h-4" />
              <span>Sent</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Inbox</h1>
          <div className="space-y-2">
            <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
              <div className="font-semibold">Welcome Email</div>
              <div className="text-sm text-muted-foreground">
                Welcome to your new system!
              </div>
            </div>
            <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
              <div className="font-semibold">System Update</div>
              <div className="text-sm text-muted-foreground">
                New features available
              </div>
            </div>
            <div className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
              <div className="font-semibold">Newsletter</div>
              <div className="text-sm text-muted-foreground">
                Weekly tech updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
