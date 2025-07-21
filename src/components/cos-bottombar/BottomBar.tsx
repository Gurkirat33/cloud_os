import { Suspense } from "react";
import BottomBarWeather from "./BottomBarWeather";
import SearchWidget from "./SearchWidget";
import TimeWidget from "./TimeWidget";

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-3 py-1.5 w-full flex items-center justify-between bg-background border-t border-border z-40">
      {/* Left: Weather Widget */}
      <div className="flex items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <BottomBarWeather city="calgary" />
        </Suspense>
      </div>

      {/* Center: Search Widget */}
      <div className="flex items-center">
        <SearchWidget />
      </div>

      {/* Right: Time Widget */}
      <div className="flex items-center">
        <TimeWidget />
      </div>
    </div>
  );
}
