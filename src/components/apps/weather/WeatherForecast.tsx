"use client";

import { Cloud, CloudRain, Sun, CloudSnow, Calendar } from "lucide-react";
import { WeatherForecastDay } from "../../../../types/weatherApp";

interface WeatherForecastProps {
  forecastData: WeatherForecastDay[];
  isLoading?: boolean;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  const size = "w-8 h-8";

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
    return <Sun className={`${size} text-yellow-500`} />;
  }

  return <Sun className={`${size} text-yellow-500`} />;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export default function WeatherForecast({
  forecastData,
  isLoading,
}: WeatherForecastProps) {
  if (isLoading) {
    return (
      <div className="bg-background rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            5-Day Forecast
          </h3>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          5-Day Forecast
        </h3>
      </div>

      <div className="space-y-2">
        {forecastData.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              {getWeatherIcon(day.day.condition.text)}
              <div>
                <div className="font-medium text-foreground">
                  {formatDate(day.date)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {day.day.condition.text}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-foreground">
                {Math.round(day.day.maxtemp_c)}° /{" "}
                {Math.round(day.day.mintemp_c)}°
              </div>
              <div className="text-sm text-muted-foreground">
                {day.day.daily_chance_of_rain > 0 && (
                  <span>{day.day.daily_chance_of_rain}% rain</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
