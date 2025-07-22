"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, MapPin, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WeatherLocation } from "../../../../types/weatherApp";

interface WeatherLocationSearchProps {
  onLocationSelect: (location: WeatherLocation) => void;
  onLocationAdd: (location: WeatherLocation) => void;
}

export default function WeatherLocationSearch({
  onLocationSelect,
  onLocationAdd,
}: WeatherLocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${
          process.env.NEXT_PUBLIC_WEATHER_API_KEY
        }&q=${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const data = await response.json();
        const locations: WeatherLocation[] = data.map(
          (item: WeatherLocation) => ({
            id: `${item.lat}-${item.lon}`,
            name: item.name,
            region: item.region,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
          })
        );
        setSearchResults(locations);
        setShowResults(locations.length > 0);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        searchLocations(value);
      }, 300);
    },
    [searchLocations]
  );

  const handleLocationClick = useCallback(
    (location: WeatherLocation) => {
      onLocationSelect(location);
      setSearchTerm("");
      setShowResults(false);
    },
    [onLocationSelect]
  );

  const handleAddLocation = useCallback(
    (location: WeatherLocation, e: React.MouseEvent) => {
      e.stopPropagation();
      onLocationAdd(location);
    },
    [onLocationAdd]
  );

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={resultsRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowResults(true);
            }
          }}
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 animate-spin" />
        )}
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {searchResults.map((location) => (
            <div
              key={location.id}
              className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
              onClick={() => handleLocationClick(location)}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {location.region && `${location.region}, `}
                    {location.country}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => handleAddLocation(location, e)}
                title="Add to saved locations"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
