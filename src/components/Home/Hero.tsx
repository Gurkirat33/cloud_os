"use client";

import { Button } from "@/components/ui/button";
import GradientText from "@/lib/gradient-text";
import { Monitor, Play, Power, User, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = time.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="text-2xl font-light">{currentTime}</div>
      <div className="text-sm opacity-80">{currentDate}</div>
    </>
  );
}

export default function Hero() {
  const { data: session } = useSession();
  console.log("in hero section", session);
  const statusItems = [
    "Ready to use",
    "No downloads required",
    "Access from anywhere",
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        width={1920}
        height={1080}
        priority={true}
        src="/background_auth.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
          <Monitor className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 text-right text-white">
        <TimeDisplay />
      </div>

      {/* Center welcome content */}
      <div className="relative z-10 flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl px-6">
          {/* Main welcome message */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white/90 mb-6 leading-tight">
              Welcome to
              <br />
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="font-medium"
              >
                CloudOS
              </GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              Your complete operating system in the cloud
            </p>
          </div>

          {/* User actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" asChild>
              <Link href="/cos">
                <Play className="size-4" />
                Start Desktop
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="backdrop-blur-3xl"
            >
              <Link href="/sign-in">
                <LogIn className="size-4" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-white/80 text-sm">
            {statusItems.map((item, index) => (
              <>
                <span key={item}>{item}</span>
                {index < statusItems.length - 1 && (
                  <span key={`separator-${index}`}>•</span>
                )}
              </>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 p-2"
              asChild
            >
              <Link href="/sign-up">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 p-2"
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
