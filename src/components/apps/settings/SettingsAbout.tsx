"use client";

import {
  Monitor,
  Code,
  Globe,
  Heart,
  Github,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsAbout() {
  const systemInfo = {
    version: "1.0.0",
    buildDate: new Date().toLocaleDateString(),
    platform: "Web",
    framework: "Next.js 14",
    database: "Prisma + PostgreSQL",
    authentication: "NextAuth.js",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">About</h2>
        <p className="text-muted-foreground text-sm">
          Information about your desktop environment and system
        </p>
      </div>

      {/* Project Info */}
      <div className="bg-background rounded-lg p-6 border border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Monitor className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Desktop OS
            </h3>
            <p className="text-sm text-muted-foreground">
              Modern Web Desktop Environment
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">{systemInfo.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Build Date</span>
            <span className="font-medium">{systemInfo.buildDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">{systemInfo.platform}</span>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Code className="w-5 h-5" />
          Technical Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-background border border-border rounded-lg">
            <div className="text-sm font-medium">Frontend</div>
            <div className="text-xs text-muted-foreground">
              {systemInfo.framework}
            </div>
          </div>
          <div className="p-3 bg-background border border-border rounded-lg">
            <div className="text-sm font-medium">Database</div>
            <div className="text-xs text-muted-foreground">
              {systemInfo.database}
            </div>
          </div>
          <div className="p-3 bg-background border border-border rounded-lg">
            <div className="text-sm font-medium">Authentication</div>
            <div className="text-xs text-muted-foreground">
              {systemInfo.authentication}
            </div>
          </div>
          <div className="p-3 bg-background border border-border rounded-lg">
            <div className="text-sm font-medium">Styling</div>
            <div className="text-xs text-muted-foreground">Tailwind CSS</div>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-background rounded-lg p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            G
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Gurkirat Singh
            </h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.open("https://gurkirat.info", "_blank")}
          >
            <Globe className="w-3 h-3" />
            Website
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              window.open("https://github.com/gurkiratsingh", "_blank")
            }
          >
            <Github className="w-3 h-3" />
            GitHub
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Features</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Window Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Weather Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Productivity Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Dark/Light Theme</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Authentication</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Responsive Design</span>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>by Gurkirat Singh</span>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2024 Desktop OS Project. All rights reserved.
        </div>
      </div>
    </div>
  );
}
