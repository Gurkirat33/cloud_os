"use client";

import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  hasPermission: boolean | null;
  isLoading: boolean;
  onCapturePhoto: () => void;
  onStartCamera: () => void;
}

export default function CameraView({
  videoRef,
  stream,
  hasPermission,
  isLoading,
  onCapturePhoto,
  onStartCamera,
}: CameraViewProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full">
        <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
          {stream ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Camera controls overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={onCapturePhoto}
                  className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Camera className="w-6 h-6" />
                </Button>
              </div>
            </>
          ) : hasPermission === false ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <CameraOff className="w-16 h-16 text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Camera Access Required
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                This app needs access to your camera to capture photos. Please
                grant camera permission and try again.
              </p>
              <Button onClick={onStartCamera} disabled={isLoading}>
                <Camera className="w-4 h-4 mr-2" />
                {isLoading ? "Requesting..." : "Grant Camera Access"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Starting camera...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
