import { Shield } from "lucide-react";
import { User } from "next-auth";
import React from "react";

export default function EnterPinForm({ user }: { user: User }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="size-20 mx-auto mb-3 bg-white/80  rounded-full flex items-center justify-center shadow-2xl">
          <Shield className="w-10 h-10 text-black/80" />
        </div>
        <h1 className="text-3xl font-light text-white mb-2.5">
          Enter your PIN
        </h1>
        <p className="text-white/60 text-sm">
          Enter your PIN to secure your account
        </p>
      </div>
    </div>
  );
}
