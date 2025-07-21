"use client";

import { FileText, Github, Globe, Heart, Star, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import WindowContainer from "../ui/WindowContainer";
import { AppProps } from "../../../types/settingsApp";

export default function ReadmeApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  return (
    <WindowContainer
      title="README.md"
      icon={<FileText className="w-4 h-4 text-gray-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={800}
      defaultHeight={700}
      minWidth={600}
      minHeight={500}
    >
      <div className="h-full bg-background overflow-auto">
        <div className="max-w-4xl mx-auto p-8 prose prose-slate dark:prose-invert">
          {/* Header */}
          <div className="text-center mb-8 not-prose">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Desktop OS
            </h1>
            <p className="text-lg text-muted-foreground">
              A Modern Web-Based Desktop Environment
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Star className="w-3 h-3" />
                Star
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="w-3 h-3" />
                Fork
              </Button>
            </div>
          </div>

          {/* Overview */}
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Overview
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Desktop OS is a sophisticated web-based desktop environment built
            with modern technologies. It provides a familiar desktop experience
            directly in your browser, complete with window management,
            productivity applications, and a beautiful user interface.
          </p>

          {/* Features */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            ✨ Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 not-prose">
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                🪟 Window Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Full window management with minimize, maximize, resize, and
                focus capabilities
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                🌤️ Weather Integration
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time weather data with multiple locations and detailed
                forecasts
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                📝 Productivity Apps
              </h3>
              <p className="text-sm text-muted-foreground">
                Todo list, notepad, calculator, terminal, and more built-in
                applications
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                🎨 Customizable
              </h3>
              <p className="text-sm text-muted-foreground">
                Dark/light themes, accent colors, and personalization options
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                🔐 Authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                Secure user authentication with NextAuth.js integration
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                📱 Responsive
              </h3>
              <p className="text-sm text-muted-foreground">
                Works seamlessly across desktop, tablet, and mobile devices
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            🛠️ Technology Stack
          </h2>

          <div className="not-prose mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">Next.js 14</div>
                <div className="text-xs text-muted-foreground">
                  React Framework
                </div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">TypeScript</div>
                <div className="text-xs text-muted-foreground">Type Safety</div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">Tailwind CSS</div>
                <div className="text-xs text-muted-foreground">Styling</div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">Prisma</div>
                <div className="text-xs text-muted-foreground">
                  Database ORM
                </div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">NextAuth.js</div>
                <div className="text-xs text-muted-foreground">
                  Authentication
                </div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">Redux Toolkit</div>
                <div className="text-xs text-muted-foreground">
                  State Management
                </div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">Lucide React</div>
                <div className="text-xs text-muted-foreground">Icons</div>
              </div>
              <div className="text-center p-3 bg-background border border-border rounded-lg">
                <div className="font-medium text-sm">WeatherAPI</div>
                <div className="text-xs text-muted-foreground">
                  Weather Data
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            🚀 Built-in Applications
          </h2>

          <ul className="space-y-2 mb-6">
            <li>
              📊 <strong>Calculator</strong> - Scientific calculator with
              advanced functions
            </li>
            <li>
              📝 <strong>Notepad</strong> - Rich text editor with file
              management
            </li>
            <li>
              ✅ <strong>Todo List</strong> - Task management with categories
              and priorities
            </li>
            <li>
              🌐 <strong>Browser</strong> - Simple web browsing interface
            </li>
            <li>
              💻 <strong>Terminal</strong> - Command-line interface with file
              system
            </li>
            <li>
              🌤️ <strong>Weather</strong> - Comprehensive weather app with
              forecasts
            </li>
            <li>
              🎮 <strong>Snake Game</strong> - Classic snake game with high
              scores
            </li>
            <li>
              🎨 <strong>Wallpaper</strong> - Background customization tool
            </li>
            <li>
              📧 <strong>Mail</strong> - Email client interface
            </li>
            <li>
              ⚙️ <strong>Settings</strong> - System configuration and
              preferences
            </li>
          </ul>

          {/* Getting Started */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            🚀 Getting Started
          </h2>

          <div className="bg-muted/50 p-4 rounded-lg mb-6 not-prose">
            <pre className="text-sm">
              <code>{`# Clone the repository
git clone https://github.com/gurkiratsingh/desktop-os.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev`}</code>
            </pre>
          </div>

          {/* Author */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            👨‍💻 Author
          </h2>

          <div className="bg-background border border-border p-6 rounded-lg mb-6 not-prose">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                G
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Gurkirat Singh
                </h3>
                <p className="text-muted-foreground">Full Stack Developer</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-3 h-3" />
                    gurkirat.info
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="w-3 h-3" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* License */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            📄 License
          </h2>

          <p className="text-muted-foreground mb-6">
            This project is licensed under the MIT License - see the LICENSE
            file for details.
          </p>

          {/* Footer */}
          <div className="text-center py-8 border-t border-border not-prose">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by Gurkirat Singh</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Desktop OS Project. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
