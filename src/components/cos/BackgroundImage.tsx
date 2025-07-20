"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundImage() {
  const [mounted, setMounted] = useState(false);

  // const currentImage =
  // localStorage.getItem("backgroundImage") || "/background_auth.jpg";
  const currentImage = "/background_auth.jpg";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="select-none pointer-events-none absolute w-full h-screen">
      <Image
        src={currentImage}
        alt="background"
        width={1900}
        height={1080}
        priority
        className="object-cover w-full h-screen"
      />
    </div>
  );
}
