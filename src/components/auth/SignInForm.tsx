"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInForm() {
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [username] = useState("Mauro H.");

  const handlePinChange = (value: string) => {
    if (value.length <= 6) {
      setPin(value);
    }
  };

  const handleSignIn = () => {
    console.log("Sign in with PIN:", pin);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* User Profile Section */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
          <User className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl font-light text-white mb-2">{username}</h1>
      </div>

      {/* PIN Input Section */}
      <div className="space-y-6">
        {/* PIN Input Field */}
        <div className="relative">
          <Input
            type={showPin ? "text" : "password"}
            value={pin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlePinChange(e.target.value)
            }
            placeholder="PIN"
            maxLength={6}
            className="w-full h-14 text-center text-2xl font-mono bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
          >
            {showPin ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* PIN Dots Indicator */}
        <div className="flex justify-center space-x-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                i < pin.length ? "bg-white scale-110" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Sign In Button */}
        <Button
          onClick={handleSignIn}
          disabled={pin.length < 4}
          className="w-full h-12 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
        >
          Sign in
        </Button>

        {/* Forgot PIN Link */}
        <div className="text-center">
          <button className="text-white/80 hover:text-white text-sm underline transition-colors">
            I forgot my PIN
          </button>
        </div>

        {/* Sign-in Options */}
        <Button
          variant="outline"
          className="w-full h-12 bg-transparent border-white/30 text-white hover:bg-white/10 rounded-lg"
        >
          Sign-in options
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="text-center mt-8">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-white/60">New to CloudOS?</span>
          <Link
            href="/sign-up"
            className="text-white hover:text-blue-300 underline transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
