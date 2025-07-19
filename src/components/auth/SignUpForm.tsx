"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pin: "",
    confirmPin: "",
  });

  const handleInputChange = (field: string, value: string) => {
    if ((field === "pin" || field === "confirmPin") && value.length > 6) return;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.pin.length >= 4 &&
      formData.pin === formData.confirmPin
    );
  };

  const handleCreateAccount = () => {
    console.log("Create account:", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="size-20 mx-auto mb-3 bg-white/80  rounded-full flex items-center justify-center shadow-2xl">
          <User className="w-10 h-10 text-black/80" />
        </div>
        <h1 className="text-3xl font-light text-white mb-2.5">
          Create your account
        </h1>
        <p className="text-white/60 text-sm">
          Join CloudOS and access your desktop anywhere
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("firstName", e.target.value)
            }
            placeholder="First name"
            className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("lastName", e.target.value)
            }
            placeholder="Last name"
            className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 z-50
          "
          />
          <Input
            type="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
            placeholder="Email address"
            className="h-12 pl-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
        </div>

        {/* PIN Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 z-50" />
          <Input
            type={showPin ? "text" : "password"}
            value={formData.pin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("pin", e.target.value)
            }
            placeholder="Create PIN (4-6 digits)"
            maxLength={6}
            className="h-12 pl-12 pr-12 text-center font-mono bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
          >
            {showPin ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Confirm PIN Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 z-50" />
          <Input
            type={showConfirmPin ? "text" : "password"}
            value={formData.confirmPin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("confirmPin", e.target.value)
            }
            placeholder="Confirm PIN"
            maxLength={6}
            className="h-12 pl-12 pr-12 text-center font-mono bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 rounded-lg backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
          >
            {showConfirmPin ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* PIN Strength Indicator */}
        {formData.pin && (
          <div className="flex justify-center space-x-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i < formData.pin.length
                    ? formData.pin.length >= 6
                      ? "bg-green-400"
                      : formData.pin.length >= 4
                      ? "bg-yellow-400"
                      : "bg-red-400"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* PIN Mismatch Warning */}
        {formData.confirmPin && formData.pin !== formData.confirmPin && (
          <div className="text-red-400 text-sm text-center">
            PINs do not match
          </div>
        )}

        {/* Create Account Button */}
        <Button
          onClick={handleCreateAccount}
          disabled={!isFormValid()}
          className="w-full h-12 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 mt-6"
        >
          Create account
        </Button>

        {/* Terms and Privacy */}
        <div className="text-xs text-white/60 text-center leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-white hover:text-blue-300 underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-white hover:text-blue-300 underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="text-center mt-8">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-white/60">Already have an account?</span>
          <Link
            href="/sign-in"
            className="text-white hover:text-blue-300 underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
