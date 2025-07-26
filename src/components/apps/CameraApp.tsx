"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WindowContainer from "../ui/WindowContainer";
import CameraView from "./camera/CameraView";
import CameraSidebar from "./camera/CameraSidebar";

interface AppProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export default function CameraApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Request camera permission and start stream
  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      // @ts-ignore @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);

      if (err.name === "NotAllowedError") {
        setError(
          "Camera permission denied. Please allow camera access and try again."
        );
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else if (err.name === "NotReadableError") {
        setError("Camera is already in use by another application.");
      } else {
        setError("Failed to access camera. Please check your camera settings.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageDataUrl);
      }
    }
  };

  // Download captured image
  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement("a");
      link.href = capturedImage;
      link.download = `camera-capture-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Auto-start camera on mount
  useEffect(() => {
    if (hasPermission === null) {
      startCamera();
    }
  }, []);

  return (
    <WindowContainer
      title="Camera"
      icon={<Camera className="w-4 h-4 text-green-500" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={800}
      defaultHeight={700}
      minWidth={600}
      minHeight={500}
    >
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <Card className="rounded-none border-0 border-b">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Camera className="w-5 h-5 text-green-500" />
                  Camera
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Capture photos with your camera
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 m-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Camera Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-full">
            {/* Camera View */}
            <div className="lg:col-span-2">
              <CameraView
                videoRef={videoRef}
                stream={stream}
                hasPermission={hasPermission}
                isLoading={isLoading}
                onCapturePhoto={capturePhoto}
                onStartCamera={startCamera}
              />
            </div>

            {/* Sidebar */}
            <CameraSidebar
              capturedImage={capturedImage}
              stream={stream}
              onDownloadImage={downloadImage}
              onClearImage={() => setCapturedImage(null)}
            />
          </div>
        </div>

        {/* Hidden canvas for capturing images */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </WindowContainer>
  );
}
