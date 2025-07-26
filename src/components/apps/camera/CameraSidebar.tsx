"use client";

import { Camera, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CameraSidebarProps {
  capturedImage: string | null;
  stream: MediaStream | null;
  onDownloadImage: () => void;
  onClearImage: () => void;
}

export default function CameraSidebar({
  capturedImage,
  stream,
  onDownloadImage,
  onClearImage,
}: CameraSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Last Capture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Last Capture</CardTitle>
        </CardHeader>
        <CardContent>
          {capturedImage ? (
            <div className="space-y-3">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-lg border shadow-sm"
              />
              <Button
                onClick={onDownloadImage}
                size="sm"
                className="w-full gap-2"
              >
                <Download className="w-4 h-4" />
                Download Image
              </Button>
              <Button
                onClick={onClearImage}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Clear
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No photos captured yet</p>
              <p className="text-xs mt-1">
                Click the camera button to take a photo
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Camera Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Camera Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span
              className={`font-medium flex items-center gap-1 ${
                stream ? "text-green-600" : "text-red-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  stream ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
              {stream ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Resolution:</span>
            <span className="font-medium">1280x720</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quality:</span>
            <span className="font-medium">HD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Format:</span>
            <span className="font-medium">PNG</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
