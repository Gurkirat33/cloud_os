"use client";

import {
  SunMoon,
  Gamepad2,
  Newspaper,
  Github,
  Globe,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface WeatherProps {
  temperature: number;
  location: string;
  condition: string;
  feelsLike: number;
}

interface OSPanelProps {
  isVisible: boolean;
  weather: WeatherProps;
}

export default function OSPanel({ isVisible, weather }: OSPanelProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const newsItems = [
    {
      title: "AI Revolution in Web Development",
      source: "Tech News",
      time: "5h",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=160&fit=crop",
    },
    {
      title: "Next.js 15 Released with New Features",
      source: "Developer News",
      time: "2h",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=160&fit=crop",
    },
  ];

  const quickGames = [
    { name: "2048", icon: "🎮", description: "Number puzzle game" },
    { name: "Snake", icon: "🐍", description: "Classic arcade game" },
    { name: "Memory", icon: "🧠", description: "Match the cards" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 w-[30vw] h-[calc(100vh-60px)] bg-background/95 backdrop-blur-xl border-r border-border text-foreground overflow-y-auto z-50 transition-transform duration-500 ease-out custom-scrollbar ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <div className="text-xl font-semibold">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                ⚠️ 2 Notifications
              </h3>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                  📰
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Portfolio Update Available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    New projects added to gurkirat.info
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widgets Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Widgets</h3>
            <button className="p-1 hover:bg-accent rounded-md transition-colors">
              <Plus size={16} />
            </button>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-4 text-white mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">{weather.location}</span>
              <button className="text-sm opacity-90 hover:opacity-100">
                ⋯
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-light">
                {Math.round(weather.temperature)}°C
              </div>
              <div className="flex-1">
                <div className="text-sm opacity-90">{weather.condition}</div>
                <div className="text-xs opacity-75">
                  Feels like {Math.round(weather.feelsLike)}°C
                </div>
              </div>
              <SunMoon size={32} className="opacity-90" />
            </div>
            <button className="w-full mt-3 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm transition-colors">
              View full forecast
            </button>
          </div>

          {/* Creator Profile */}
          <CreatorProfile />

          {/* Quick Games */}
          <div className="bg-card rounded-lg border border-border p-4 mb-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Gamepad2 size={16} />
              Quick Games
            </h4>
            <div className="space-y-2">
              {quickGames.map((game, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors text-left"
                >
                  <span className="text-lg">{game.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{game.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {game.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold flex items-center gap-2">
              <Newspaper size={16} />
              Latest News
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 hover:bg-accent p-2 rounded-md transition-colors cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-12 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-primary hover:bg-accent rounded-md transition-colors">
              View more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreatorProfile() {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src="/creator.jpg"
          alt="Gurkirat"
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
        />
        <div>
          <h4 className="font-medium">Gurkirat Singh</h4>
          <p className="text-sm text-muted-foreground">OS Creator</p>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href="https://gurkirat.info"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-2 px-3 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Globe size={14} />
          Portfolio
        </a>
        <button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md py-2 px-3 text-sm transition-colors flex items-center justify-center gap-2">
          <Github size={14} />
          Projects
        </button>
      </div>
    </div>
  );
}
