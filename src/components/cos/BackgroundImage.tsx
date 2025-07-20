"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundImage() {
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState("/background_auth.jpg");

  useEffect(() => {
    setMounted(true);

    // Get initial wallpaper from localStorage
    const savedWallpaper = localStorage.getItem("backgroundImage");
    if (savedWallpaper) {
      setCurrentImage(savedWallpaper);
    }

    // Listen for wallpaper changes
    const handleWallpaperChange = (event: CustomEvent) => {
      setCurrentImage(event.detail.path);
    };

    const handleWallpaperPreview = (event: CustomEvent) => {
      setCurrentImage(event.detail.path);
    };

    window.addEventListener(
      "wallpaperChange",
      handleWallpaperChange as EventListener
    );
    window.addEventListener(
      "wallpaperPreview",
      handleWallpaperPreview as EventListener
    );

    return () => {
      window.removeEventListener(
        "wallpaperChange",
        handleWallpaperChange as EventListener
      );
      window.removeEventListener(
        "wallpaperPreview",
        handleWallpaperPreview as EventListener
      );
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="select-none pointer-events-none absolute w-full h-screen">
      <Image
        src={currentImage}
        alt="background"
        width={1900}
        height={1080}
        priority
        className="object-cover w-full h-screen transition-opacity duration-500"
        key={currentImage} // Force re-render when image changes
      />
    </div>
  );
}
