"use client";

import { Lock, Shield } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPin } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";
import { User } from "next-auth";

export default function CreatePinForm({ user }: { user: User }) {
  console.log("user is", user);
  const router = useRouter();
  const { update } = useSession();
  const [data, action] = useActionState(createPin, {
    message: "",
    success: false,
    errors: undefined,
  });

  useEffect(() => {
    if (data.success && "pin" in data && data.pin) {
      update({ pin: data.pin });
    }

    router.push("/cos");
  }, [data.success]);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="size-20 mx-auto mb-3 bg-white/80  rounded-full flex items-center justify-center shadow-2xl">
          <Shield className="w-10 h-10 text-black/80" />
        </div>
        <h1 className="text-3xl font-light text-white mb-2.5">
          Hello, {user.name}
        </h1>
        <p className="text-white/60 text-sm">
          Create a PIN to secure your account
        </p>
      </div>
      <form className="space-y-4" action={action}>
        <div className="relative">
          <Lock className="auth-icon" />
          <Input
            type="password"
            placeholder="Enter your PIN"
            className="auth-input"
            name="pin"
          />
        </div>
        <div className="relative">
          <Lock className="auth-icon" />
          <Input
            type="password"
            placeholder="Confirm your PIN"
            className="auth-input"
            name="confirmPin"
          />
        </div>
        {data.errors?.pin && (
          <p className="text-red-500 text-sm">{data.errors.pin.join(", ")}</p>
        )}
        <Button className="w-full py-6" variant="secondary" type="submit">
          Create PIN
        </Button>
      </form>
    </div>
  );
}
