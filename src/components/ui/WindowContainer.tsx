"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Minus, Square, Maximize } from "lucide-react";

interface WindowContainerProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
  isMinimized?: boolean;
}

export default function WindowContainer({
  title,
  icon,
  onClose,
  onMinimize,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  defaultX = 100,
  defaultY = 100,
  minWidth = 400,
  minHeight = 300,
  isMinimized = false,
}: WindowContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Optimized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || isFullscreen) return;

      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Boundary constraints
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height - 50; // Account for bottom bar

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      });
    },
    [isDragging, isFullscreen, dragStart, size]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Handle dragging start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isFullscreen || isMinimized) return;

      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [isFullscreen, isMinimized, position]
  );

  // Event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "move";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle minimize
  const handleMinimizeClick = useCallback(() => {
    if (onMinimize) {
      onMinimize();
    }
  }, [onMinimize]);

  // Don't render if minimized (will be shown in taskbar)
  if (isMinimized) {
    return null;
  }

  // Window styles based on state
  const getWindowStyles = () => {
    if (isFullscreen) {
      return {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 50px)", // Account for bottom bar
        transform: "none",
        transition: "all 0.2s ease-out",
      };
    }

    return {
      position: "fixed" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
      maxHeight: "calc(100vh - 70px)", // Account for bottom bar + some padding
      transform: "none",
      transition: isDragging ? "none" : "all 0.1s ease-out",
    };
  };

  return (
    <div
      ref={windowRef}
      style={getWindowStyles()}
      className={`bg-background border border-border rounded-lg shadow-2xl z-50 overflow-hidden ${
        isDragging ? "shadow-3xl scale-[1.02]" : ""
      }`}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className={`flex items-center justify-between px-4 py-2 bg-muted border-b border-border select-none ${
          !isFullscreen ? "cursor-move" : ""
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleFullscreen}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="text-sm font-medium truncate">{title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleMinimizeClick}
            className="p-1.5 hover:bg-accent rounded transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-accent rounded transition-colors"
            title={isFullscreen ? "Restore" : "Maximize"}
          >
            {isFullscreen ? (
              <Square className="w-3 h-3" />
            ) : (
              <Maximize className="w-3 h-3" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-red-500 hover:text-white rounded transition-colors"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
