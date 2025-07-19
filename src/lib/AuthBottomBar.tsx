"use client";

export default function AuthBottomBar() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="absolute z-50 left-6 bottom-6">
        <div className="text-white/80 text-sm">
          Built with <span className="text-white font-medium">CloudOS</span>
        </div>
      </div>

      <div className="absolute z-50 right-6 bottom-6">
        <div className="text-white/80 text-sm text-right">
          <div className="font-medium">{currentTime}</div>
          <div className="text-xs text-white/60 mt-1">CloudOS v2.0</div>
        </div>
      </div>

      <div className="absolute z-50 bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-white/60 text-xs">
          <button className="hover:text-white/80 transition-colors">
            Privacy & cookies
          </button>
          <span>•</span>
          <button className="hover:text-white/80 transition-colors">
            Terms of use
          </button>
        </div>
      </div>
    </>
  );
}
