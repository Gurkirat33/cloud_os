"use client";

import { useState, useEffect, useCallback } from "react";
import { Cloud, RefreshCw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WindowContainer from "../ui/WindowContainer";
import WeatherLocationSearch from "./weather/WeatherLocationSearch";
import WeatherCurrent from "./weather/WeatherCurrent";
import WeatherForecast from "./weather/WeatherForecast";
import WeatherDetails from "./weather/WeatherDetails";
import WeatherLocationList from "./weather/WeatherLocationList";
import {
  AppProps,
  WeatherLocation,
  WeatherCurrent as WeatherCurrentType,
  WeatherForecastData,
  SavedLocation,
} from "../../../types/weatherApp";

export default function WeatherApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [currentWeather, setCurrentWeather] =
    useState<WeatherCurrentType | null>(null);
  const [forecastData, setForecastData] = useState<WeatherForecastData | null>(
    null
  );
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [currentLocationId, setCurrentLocationId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "current" | "forecast" | "details"
  >("current");
  const [showLocationList, setShowLocationList] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved locations from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("weather_app_locations");
    if (saved) {
      try {
        const locations = JSON.parse(saved);
        setSavedLocations(locations);

        // Load default location or first location
        const defaultLocation =
          locations.find((loc: SavedLocation) => loc.isDefault) || locations[0];
        if (defaultLocation) {
          loadWeatherData(defaultLocation);
        }
      } catch (error) {
        console.error("Error loading saved locations:", error);
      }
    } else {
      // Load Calgary as default
      loadWeatherData({
        id: "calgary-default",
        name: "Calgary",
        displayName: "Calgary, AB",
        lat: 51.0447,
        lon: -114.0719,
        isDefault: true,
      });
    }
  }, []);

  // Save locations to localStorage
  useEffect(() => {
    if (mounted && savedLocations.length > 0) {
      localStorage.setItem(
        "weather_app_locations",
        JSON.stringify(savedLocations)
      );
    }
  }, [savedLocations, mounted]);

  const loadWeatherData = useCallback(
    async (location: SavedLocation | WeatherLocation) => {
      setIsLoading(true);
      setError(null);

      try {
        // Load current weather
        const currentResponse = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.lat},${location.lon}&aqi=no`
        );

        if (!currentResponse.ok) {
          throw new Error("Failed to fetch current weather");
        }

        const currentData = await currentResponse.json();
        setCurrentWeather(currentData);

        // Load forecast
        const forecastResponse = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.lat},${location.lon}&days=5&aqi=no`
        );

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast");
        }

        const forecastDataResponse = await forecastResponse.json();
        setForecastData(forecastDataResponse);
        setCurrentLocationId(location.id);
      } catch (err) {
        console.error("Error loading weather data:", err);
        setError("Failed to load weather data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLocationSelect = useCallback(
    (location: WeatherLocation | SavedLocation) => {
      loadWeatherData(location);
      setShowLocationList(false);
    },
    [loadWeatherData]
  );

  const handleLocationAdd = useCallback(
    (location: WeatherLocation) => {
      const newLocation: SavedLocation = {
        id: location.id,
        name: location.name,
        displayName: `${location.name}${
          location.region ? `, ${location.region}` : ""
        }, ${location.country}`,
        lat: location.lat,
        lon: location.lon,
        isDefault: savedLocations.length === 0, // First location is default
      };

      setSavedLocations((prev) => {
        // Check if location already exists
        const exists = prev.find((loc) => loc.id === newLocation.id);
        if (exists) return prev;

        return [...prev, newLocation];
      });
    },
    [savedLocations.length]
  );

  const handleLocationDelete = useCallback(
    (locationId: string) => {
      setSavedLocations((prev) => {
        const filtered = prev.filter((loc) => loc.id !== locationId);

        // If we deleted the current location, switch to first available
        if (currentLocationId === locationId && filtered.length > 0) {
          loadWeatherData(filtered[0]);
        }

        return filtered;
      });
    },
    [currentLocationId, loadWeatherData]
  );

  const handleSetDefault = useCallback((locationId: string) => {
    setSavedLocations((prev) =>
      prev.map((loc) => ({
        ...loc,
        isDefault: loc.id === locationId,
      }))
    );
  }, []);

  const handleRefresh = useCallback(() => {
    const currentLocation = savedLocations.find(
      (loc) => loc.id === currentLocationId
    );
    if (currentLocation) {
      loadWeatherData(currentLocation);
    }
  }, [currentLocationId, savedLocations, loadWeatherData]);

  if (!mounted) return null;

  return (
    <WindowContainer
      title="Weather"
      icon={<Cloud className="w-4 h-4 text-blue-500" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={900}
      defaultHeight={700}
      minWidth={700}
      minHeight={600}
    >
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <Card className="rounded-none border-0 border-b">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  Weather
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Current conditions and forecasts
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationList(!showLocationList)}
                  className="gap-2"
                >
                  <Settings2 className="w-4 h-4" />
                  Locations
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Search Bar */}
        <Card className="rounded-none border-0 border-b">
          <CardContent className="p-4">
            <WeatherLocationSearch
              onLocationSelect={handleLocationSelect}
              onLocationAdd={handleLocationAdd}
            />
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 mx-4 mt-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
            {/* Left Column - Current Weather & Locations */}
            <div className="lg:col-span-2 space-y-4">
              {/* Current Weather */}
              {currentWeather && (
                <WeatherCurrent
                  weatherData={currentWeather}
                  isLoading={isLoading}
                />
              )}

              {/* Navigation Tabs */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setActiveTab("current")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "current"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Current
                </button>
                <button
                  onClick={() => setActiveTab("forecast")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "forecast"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  5-Day Forecast
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "details"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {activeTab === "forecast" && forecastData && (
                  <WeatherForecast
                    forecastData={forecastData.forecast.forecastday}
                    isLoading={isLoading}
                  />
                )}

                {activeTab === "details" && currentWeather && (
                  <WeatherDetails
                    weatherData={currentWeather}
                    isLoading={isLoading}
                  />
                )}

                {activeTab === "current" && (
                  <div className="bg-background rounded-lg border border-border p-6 text-center">
                    <Cloud className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Current Weather
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Current weather information is displayed above. Use the
                      tabs to view forecast and detailed information.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Saved Locations */}
            <div className="space-y-4">
              {showLocationList ? (
                <WeatherLocationList
                  locations={savedLocations}
                  currentLocationId={currentLocationId || undefined}
                  onLocationSelect={handleLocationSelect}
                  onLocationDelete={handleLocationDelete}
                  onSetDefault={handleSetDefault}
                />
              ) : (
                <div className="bg-background rounded-lg border border-border p-6 text-center">
                  <Settings2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Manage Locations
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Click "Locations" to view and manage your saved weather
                    locations.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowLocationList(true)}
                    className="gap-2"
                  >
                    <Settings2 className="w-4 h-4" />
                    View Locations
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WindowContainer>
  );
}
