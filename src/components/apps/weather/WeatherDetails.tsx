"use client";

import {
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  CloudRain,
  Sun,
  Navigation,
} from "lucide-react";
import { WeatherCurrent } from "../../../../types/weatherApp";

interface WeatherDetailsProps {
  weatherData: WeatherCurrent;
  isLoading?: boolean;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

const DetailItem = ({
  icon,
  label,
  value,
  unit,
  description,
}: DetailItemProps) => (
  <div className="bg-background/50 rounded-lg p-4 border border-border/50">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
    <div className="flex items-end gap-1">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      {unit && (
        <span className="text-sm text-muted-foreground mb-1">{unit}</span>
      )}
    </div>
    {description && (
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
    )}
  </div>
);

const getUVDescription = (uv: number) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

const getVisibilityDescription = (visibility: number) => {
  if (visibility >= 10) return "Excellent";
  if (visibility >= 5) return "Good";
  if (visibility >= 2) return "Moderate";
  return "Poor";
};

const getWindDirection = (degree: number) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};

export default function WeatherDetails({
  weatherData,
  isLoading,
}: WeatherDetailsProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Weather Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-background/50 rounded-lg p-4 border border-border/50 animate-pulse"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-12 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { current } = weatherData;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Weather Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <DetailItem
          icon={<Wind className="w-4 h-4 text-blue-500" />}
          label="Wind"
          value={current.wind_kph.toString()}
          unit="km/h"
          description={`${getWindDirection(current.wind_degree)} (${
            current.wind_degree
          }°)`}
        />

        <DetailItem
          icon={<Droplets className="w-4 h-4 text-blue-400" />}
          label="Humidity"
          value={current.humidity.toString()}
          unit="%"
          description={
            current.humidity > 60
              ? "High"
              : current.humidity > 30
              ? "Moderate"
              : "Low"
          }
        />

        <DetailItem
          icon={<Gauge className="w-4 h-4 text-purple-500" />}
          label="Pressure"
          value={current.pressure_mb.toString()}
          unit="mb"
          description={current.pressure_mb > 1013 ? "High" : "Low"}
        />

        <DetailItem
          icon={<Eye className="w-4 h-4 text-green-500" />}
          label="Visibility"
          value={current.vis_km.toString()}
          unit="km"
          description={getVisibilityDescription(current.vis_km)}
        />

        <DetailItem
          icon={<Sun className="w-4 h-4 text-orange-500" />}
          label="UV Index"
          value={current.uv.toString()}
          description={getUVDescription(current.uv)}
        />

        <DetailItem
          icon={<Thermometer className="w-4 h-4 text-red-500" />}
          label="Feels Like"
          value={Math.round(current.feelslike_c).toString()}
          unit="°C"
          description={
            Math.abs(current.temp_c - current.feelslike_c) > 3
              ? "Significant difference"
              : "Similar to actual"
          }
        />

        <DetailItem
          icon={<CloudRain className="w-4 h-4 text-blue-600" />}
          label="Precipitation"
          value={current.precip_mm.toString()}
          unit="mm"
          description={current.precip_mm > 0 ? "Active" : "None"}
        />

        <DetailItem
          icon={<Navigation className="w-4 h-4 text-gray-500" />}
          label="Cloud Cover"
          value={current.cloud.toString()}
          unit="%"
          description={
            current.cloud > 75
              ? "Overcast"
              : current.cloud > 25
              ? "Partly cloudy"
              : "Clear"
          }
        />

        <DetailItem
          icon={<Wind className="w-4 h-4 text-cyan-500" />}
          label="Wind Gust"
          value={current.gust_kph.toString()}
          unit="km/h"
          description={
            current.gust_kph > current.wind_kph * 1.5 ? "Gusty" : "Steady"
          }
        />
      </div>
    </div>
  );
}
