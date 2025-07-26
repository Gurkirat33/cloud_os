"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Minus, Square, Maximize } from "lucide-react";

interface WindowContainerProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
  isMinimized?: boolean;
  zIndex?: number;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

export default function WindowContainer({
  title,
  icon,
  onClose,
  onMinimize,
  onFocus,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  defaultX = 100,
  defaultY = 100,
  minWidth = 400,
  minHeight = 300,
  isMinimized = false,
  zIndex = 50,
}: WindowContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: defaultWidth,
    height: defaultHeight,
    left: defaultX,
    top: defaultY,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Handle window click to focus
  const handleWindowClick = useCallback(
    (e: React.MouseEvent) => {
      if (onFocus && !isMinimized) {
        onFocus();
      }
    },
    [onFocus, isMinimized]
  );

  // Optimized mouse move handler for dragging
  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || isFullscreen || isResizing) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height - 50;

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      });
    },
    [isDragging, isFullscreen, isResizing, dragStart, size]
  );

  // Optimized mouse move handler for resizing
  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection || isFullscreen) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.left;
        let newY = resizeStart.top;

        // Handle different resize directions
        if (resizeDirection.includes("e")) {
          newWidth = Math.max(minWidth, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          const widthChange = Math.min(deltaX, resizeStart.width - minWidth);
          newWidth = resizeStart.width - widthChange;
          newX = resizeStart.left + widthChange;
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(minHeight, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes("n")) {
          const heightChange = Math.min(deltaY, resizeStart.height - minHeight);
          newHeight = resizeStart.height - heightChange;
          newY = resizeStart.top + heightChange;
        }

        // Boundary constraints
        const maxWidth = window.innerWidth - newX;
        const maxHeight = window.innerHeight - newY - 50;

        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      });
    },
    [
      isResizing,
      resizeDirection,
      isFullscreen,
      resizeStart,
      minWidth,
      minHeight,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Handle dragging start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isFullscreen || isMinimized) return;

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });

      if (onFocus) {
        onFocus();
      }
    },
    [isFullscreen, isMinimized, position, onFocus]
  );

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      if (isFullscreen || isMinimized) return;

      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeDirection(direction);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
      });

      if (onFocus) {
        onFocus();
      }
    },
    [isFullscreen, isMinimized, size, position, onFocus]
  );

  // Event listeners for dragging and resizing
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDragMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "move";
    } else if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      // Set appropriate cursor based on resize direction
      const cursorMap = {
        n: "n-resize",
        s: "s-resize",
        e: "e-resize",
        w: "w-resize",
        ne: "ne-resize",
        nw: "nw-resize",
        se: "se-resize",
        sw: "sw-resize",
      };
      document.body.style.cursor = cursorMap[resizeDirection!] || "default";
    } else {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isDragging,
    isResizing,
    handleDragMove,
    handleResizeMove,
    handleMouseUp,
    resizeDirection,
  ]);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle minimize - just call the minimize function directly
  const handleMinimizeClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onMinimize) {
        onMinimize();
      }
    },
    [onMinimize]
  );

  // Don't render if minimized
  if (isMinimized) {
    return null;
  }

  // Window styles
  const getWindowStyles = () => {
    if (isFullscreen) {
      return {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 50px)",
        transform: "none",
        transition: "all 0.2s ease-out",
        zIndex: zIndex,
      };
    }

    return {
      position: "fixed" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
      maxHeight: "calc(100vh - 70px)",
      transform: "none",
      transition: isDragging || isResizing ? "none" : "all 0.1s ease-out",
      zIndex: zIndex,
    };
  };

  return (
    <div
      ref={windowRef}
      style={getWindowStyles()}
      className={`bg-background border border-border rounded-lg shadow-2xl overflow-x-hidden overflow-y-scroll relative ${
        isDragging || isResizing ? "shadow-3xl" : ""
      }`}
      onClick={handleWindowClick}
    >
      {/* Resize handles - only show when not fullscreen */}
      {!isFullscreen && (
        <>
          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />

          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
        </>
      )}

      {/* Window Header */}
      <div
        ref={headerRef}
        className={`flex items-center justify-between px-4 py-2 bg-muted border-b border-border select-none relative z-10 ${
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
            className="p-1.5 hover:bg-accent rounded transition-colors relative z-20"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-accent rounded transition-colors relative z-20"
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
            className="p-1.5 hover:bg-red-500 hover:text-white rounded transition-colors relative z-20"
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
