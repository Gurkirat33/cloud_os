"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { signupUser } from "@/lib/actions/user-actions";

export default function SignUpForm() {
  const [data, action] = useActionState(signupUser, {
    message: "",
    success: false,
  });

  const { pending } = useFormStatus();

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

      <form action={action} className="space-y-4">
        <div className="relative">
          <User className="auth-icon" />
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="auth-input"
          />
        </div>

        <div className="relative">
          <Mail className="auth-icon" />
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="auth-input"
          />
        </div>

        <div className="relative">
          <Lock className="auth-icon" />
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="auth-input"
          />
        </div>

        <Button
          className="w-full py-6"
          variant="secondary"
          type="submit"
          disabled={pending}
        >
          {pending ? "Creating account..." : "Create account"}
        </Button>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

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
      </form>

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
