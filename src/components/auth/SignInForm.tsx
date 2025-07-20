"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/lib/actions/user-actions";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function SignInForm() {
  const [data, action] = useActionState(signInUser, {
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
        <h1 className="text-3xl font-light text-white mb-2.5">Welcome back</h1>
        <p className="text-white/60 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <form className="space-y-4" action={action}>
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

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <Button
          className="w-full py-6"
          variant="secondary"
          type="submit"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

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
