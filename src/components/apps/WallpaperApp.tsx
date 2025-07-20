"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Download, Palette, Check } from "lucide-react";
import Image from "next/image";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

interface Wallpaper {
  id: string;
  name: string;
  path: string;
  thumbnail: string;
  category: "nature" | "abstract" | "minimal" | "default";
}

const wallpapers: Wallpaper[] = [
  {
    id: "default",
    name: "Default Background",
    path: "/background_auth.jpg",
    thumbnail: "/background_auth.jpg",
    category: "default",
  },
  {
    id: "bg1",
    name: "Mountain Vista",
    path: "/background1.avif",
    thumbnail: "/background1.avif",
    category: "nature",
  },
  // Add more wallpapers here as needed
];

export default function WallpaperApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>("default");
  const [currentWallpaper, setCurrentWallpaper] = useState<string>("default");
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get current wallpaper from localStorage
    const saved = localStorage.getItem("backgroundImage");
    if (saved) {
      const wallpaper = wallpapers.find((w) => w.path === saved);
      if (wallpaper) {
        setCurrentWallpaper(wallpaper.id);
        setSelectedWallpaper(wallpaper.id);
      }
    }
  }, []);

  const applyWallpaper = () => {
    const wallpaper = wallpapers.find((w) => w.id === selectedWallpaper);
    if (wallpaper && mounted) {
      localStorage.setItem("backgroundImage", wallpaper.path);
      setCurrentWallpaper(selectedWallpaper);

      // Dispatch custom event to update background
      window.dispatchEvent(
        new CustomEvent("wallpaperChange", {
          detail: { path: wallpaper.path },
        })
      );
    }
  };

  const previewWallpaper = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    if (previewMode) {
      const wallpaper = wallpapers.find((w) => w.id === wallpaperId);
      if (wallpaper) {
        window.dispatchEvent(
          new CustomEvent("wallpaperPreview", {
            detail: { path: wallpaper.path },
          })
        );
      }
    }
  };

  const togglePreviewMode = () => {
    const newPreviewMode = !previewMode;
    setPreviewMode(newPreviewMode);

    if (newPreviewMode) {
      // When enabling preview mode, immediately show preview of selected wallpaper
      // if it's different from current wallpaper
      if (selectedWallpaper !== currentWallpaper) {
        const wallpaper = wallpapers.find((w) => w.id === selectedWallpaper);
        if (wallpaper) {
          window.dispatchEvent(
            new CustomEvent("wallpaperPreview", {
              detail: { path: wallpaper.path },
            })
          );
        }
      }
    } else {
      // When disabling preview mode, reset to current wallpaper
      const wallpaper = wallpapers.find((w) => w.id === currentWallpaper);
      if (wallpaper) {
        window.dispatchEvent(
          new CustomEvent("wallpaperPreview", {
            detail: { path: wallpaper.path },
          })
        );
      }
    }
  };

  const filteredWallpapers =
    selectedCategory === "all"
      ? wallpapers
      : wallpapers.filter((w) => w.category === selectedCategory);

  const categories = [
    { id: "all", name: "All", icon: "🌟" },
    { id: "default", name: "Default", icon: "🏠" },
    { id: "nature", name: "Nature", icon: "🌲" },
    { id: "abstract", name: "Abstract", icon: "🎨" },
    { id: "minimal", name: "Minimal", icon: "⚪" },
  ];

  if (!mounted) return null;

  return (
    <WindowContainer
      title="Wallpaper Settings"
      icon={<Palette className="w-4 h-4 text-purple-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={700}
      defaultHeight={600}
      minWidth={600}
      minHeight={500}
    >
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Change Wallpaper
              </h2>
              <p className="text-sm text-gray-600">
                Customize your desktop background
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={togglePreviewMode}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewMode
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {previewMode ? "Exit Preview" : "Preview Mode"}
              </button>
              <button
                onClick={applyWallpaper}
                disabled={selectedWallpaper === currentWallpaper}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedCategory === category.id
                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Wallpaper Grid */}
        <div className="flex-1 p-4 overflow-auto">
          {filteredWallpapers.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWallpapers.map((wallpaper) => (
                <div
                  key={wallpaper.id}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedWallpaper === wallpaper.id
                      ? "ring-3 ring-purple-500 shadow-lg scale-105"
                      : "hover:shadow-md hover:scale-102"
                  }`}
                  onClick={() => previewWallpaper(wallpaper.id)}
                >
                  <div className="aspect-video relative bg-gray-200">
                    <Image
                      src={wallpaper.thumbnail}
                      alt={wallpaper.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Overlay */}
                    {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" /> */}

                    {/* Selected Indicator */}
                    {selectedWallpaper === wallpaper.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Current Wallpaper Badge */}
                    {currentWallpaper === wallpaper.id && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                        Current
                      </div>
                    )}

                    {/* Preview Mode Indicator */}
                    {previewMode &&
                      selectedWallpaper === wallpaper.id &&
                      selectedWallpaper !== currentWallpaper && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium flex items-center gap-1">
                          👁️ Previewing
                        </div>
                      )}
                  </div>

                  {/* Wallpaper Info */}
                  <div className="p-3 bg-white border border-gray-200 border-t-0">
                    <h3 className="font-medium text-gray-800 text-sm truncate">
                      {wallpaper.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {wallpaper.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">No wallpapers found</p>
              <p className="text-sm">Try selecting a different category</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredWallpapers.length} wallpapers available</span>
            {previewMode && selectedWallpaper !== currentWallpaper && (
              <span className="text-blue-600 font-medium">
                👁️ Previewing "
                {wallpapers.find((w) => w.id === selectedWallpaper)?.name}" -
                Click Apply to set permanently
              </span>
            )}
            {previewMode && selectedWallpaper === currentWallpaper && (
              <span className="text-green-600 font-medium">
                ✅ Current wallpaper selected
              </span>
            )}
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
