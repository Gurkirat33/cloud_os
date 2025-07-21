"use client";

import { useState } from "react";
import { MapPin, Star, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedLocation } from "../../../../types/weatherApp";

interface WeatherLocationListProps {
  locations: SavedLocation[];
  currentLocationId?: string;
  onLocationSelect: (location: SavedLocation) => void;
  onLocationDelete: (locationId: string) => void;
  onSetDefault: (locationId: string) => void;
}

export default function WeatherLocationList({
  locations,
  currentLocationId,
  onLocationSelect,
  onLocationDelete,
  onSetDefault,
}: WeatherLocationListProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (locationId: string) => {
    setExpandedMenu(expandedMenu === locationId ? null : locationId);
  };

  if (locations.length === 0) {
    return (
      <div className="bg-background rounded-lg border border-border p-6 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          No Saved Locations
        </h3>
        <p className="text-muted-foreground text-sm">
          Search for cities and add them to your favorites
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          Saved Locations
        </h3>
      </div>

      <div className="space-y-2">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`relative flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              currentLocationId === location.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:bg-accent/50 cursor-pointer"
            }`}
            onClick={() => onLocationSelect(location)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {location.isDefault && (
                  <Star className="w-3 h-3 text-yellow-500 fill-current absolute -top-1 -right-1" />
                )}
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">
                  {location.displayName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {location.name}
                </div>
              </div>
            </div>

            <div className="relative">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(location.id);
                }}
              >
                <MoreVertical className="w-3 h-3" />
              </Button>

              {expandedMenu === location.id && (
                <>
                  {/* Overlay to close menu when clicking outside */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setExpandedMenu(null)}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg z-20 min-w-32">
                    {!location.isDefault && (
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-t-md flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSetDefault(location.id);
                          setExpandedMenu(null);
                        }}
                      >
                        <Star className="w-3 h-3 text-yellow-500" />
                        Set as Default
                      </button>
                    )}
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent text-red-600 flex items-center gap-2 rounded-b-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLocationDelete(location.id);
                        setExpandedMenu(null);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
