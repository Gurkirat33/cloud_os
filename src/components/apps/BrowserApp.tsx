"use client";

import { Globe, ArrowLeft, ArrowRight, RotateCcw, Lock } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export default function BrowserApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  return (
    <WindowContainer
      title="Browser"
      icon={<Globe className="w-4 h-4 text-blue-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={1000}
      defaultHeight={700}
    >
      <div className="flex flex-col h-full">
        {/* Browser Controls */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/50">
          <button className="p-1 hover:bg-accent rounded transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Address Bar */}
          <div className="flex-1 flex items-center bg-background border border-border rounded px-3 py-1 ml-2">
            <Lock className="w-3 h-3 text-green-500 mr-2" />
            <span className="text-sm text-muted-foreground">
              https://example.com
            </span>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 p-6 bg-white text-black overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">
              Welcome to the Web
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Search Engine</h3>
                <p className="text-gray-600 mb-4">
                  Find anything on the internet
                </p>
                <input
                  type="text"
                  placeholder="Search the web..."
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Bookmarks</h3>
                <div className="space-y-2">
                  <div className="text-blue-600 hover:underline cursor-pointer">
                    News Site
                  </div>
                  <div className="text-blue-600 hover:underline cursor-pointer">
                    Social Media
                  </div>
                  <div className="text-blue-600 hover:underline cursor-pointer">
                    Work Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
