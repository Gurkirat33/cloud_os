"use client";

import { SunMoon } from "lucide-react";
import { useState } from "react";
import OSPanel from "./OSPanel";
import { WeatherData } from "../../../types/bottomBar";

export default function WeatherWidget({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const [showPanel, setShowPanel] = useState(false);
  const { location, current } = weatherData;

  const weatherProps = {
    temperature: current.temp_c,
    location: location.name,
    condition: current.condition.text,
    feelsLike: current.feelslike_c,
  };

  return (
    <div className="relative">
      <div
        className="hover:bg-accent/50 flex gap-2 items-center transition-all duration-200 rounded-lg px-3 py-1.5 cursor-pointer"
        onMouseEnter={() => setShowPanel(true)}
        onMouseLeave={() => setShowPanel(false)}
      >
        <SunMoon size={28} color="white" />
        <div className="flex flex-col">
          <span className="font-medium text-primary text-[13px]">
            {Math.round(current.temp_c)}°C
          </span>
          <span className="text-muted-foreground text-xs">
            {location.name}. {current.condition.text}
          </span>
        </div>
      </div>

      <div
        onMouseEnter={() => setShowPanel(true)}
        onMouseLeave={() => setShowPanel(false)}
      >
        <OSPanel isVisible={showPanel} weather={weatherProps} />
      </div>
    </div>
  );
}
