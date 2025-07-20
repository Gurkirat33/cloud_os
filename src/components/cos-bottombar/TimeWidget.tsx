"use client";

import { useState, useEffect } from "react";

export default function TimeWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <button
      className="px-3 py-1.5 hover:bg-accent/50 rounded-md transition-colors text-right"
      title={formatFullDate(currentTime)}
    >
      <div className="text-foreground text-sm leading-tight">
        <div className="font-medium">{formatTime(currentTime)}</div>
        <div className="text-xs text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>
    </button>
  );
}
