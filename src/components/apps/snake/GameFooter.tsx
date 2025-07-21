"use client";

const CONTROL_INFO = [
  { icon: "🎮", label: "Controls", value: "Arrow Keys or WASD" },
  { icon: "⏸️", label: "Pause", value: "Space Bar" },
];

export default function GameFooter() {
  return (
    <div className="p-4 bg-card border-t border-border">
      <div className="text-center text-sm text-muted-foreground">
        <div className="grid grid-cols-2 gap-4 mb-2">
          {CONTROL_INFO.map((control, index) => (
            <div key={index}>
              {control.icon} <strong>{control.label}:</strong> {control.value}
            </div>
          ))}
        </div>
        <div className="text-xs">
          Eat red food to grow and increase your score. Avoid hitting walls and
          yourself!
        </div>
      </div>
    </div>
  );
}
