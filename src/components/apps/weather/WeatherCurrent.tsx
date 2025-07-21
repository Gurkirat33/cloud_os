"use client";

import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Eye,
  Droplets,
  Thermometer,
} from "lucide-react";
import { WeatherCurrent as WeatherCurrentType } from "../../../../types/weatherApp";

interface WeatherCurrentProps {
  weatherData: WeatherCurrentType;
  isLoading?: boolean;
}

const getWeatherIcon = (condition: string, isDay: number) => {
  const conditionLower = condition.toLowerCase();
  const size = "w-16 h-16";

  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return <CloudRain className={`${size} text-blue-500`} />;
  }
  if (conditionLower.includes("snow")) {
    return <CloudSnow className={`${size} text-blue-200`} />;
  }
  if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
    return <Cloud className={`${size} text-gray-500`} />;
  }
  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return (
      <Sun
        className={`${size} ${isDay ? "text-yellow-500" : "text-yellow-300"}`}
      />
    );
  }

  // Default based on day/night
  return isDay ? (
    <Sun className={`${size} text-yellow-500`} />
  ) : (
    <Cloud className={`${size} text-gray-400`} />
  );
};

const formatTime = (localtime: string) => {
  return new Date(localtime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function WeatherCurrent({
  weatherData,
  isLoading,
}: WeatherCurrentProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  const { location, current } = weatherData;

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {location.name}
          </h2>
          <p className="text-muted-foreground">
            {location.region && `${location.region}, `}
            {location.country}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {formatTime(location.localtime)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-foreground mb-1">
            {Math.round(current.temp_c)}°C
          </div>
          <div className="text-sm text-muted-foreground">
            Feels like {Math.round(current.feelslike_c)}°C
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getWeatherIcon(current.condition.text, current.is_day)}
          <div>
            <div className="text-lg font-medium text-foreground">
              {current.condition.text}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                {current.wind_kph} km/h
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                {current.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {current.vis_km} km
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional quick stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-red-500" />
          <div>
            <div className="text-xs text-muted-foreground">UV Index</div>
            <div className="font-medium">{current.uv}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-xs text-muted-foreground">Cloud Cover</div>
            <div className="font-medium">{current.cloud}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
