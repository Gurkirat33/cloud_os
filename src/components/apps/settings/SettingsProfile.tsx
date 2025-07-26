"use client";

import { User, Mail, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

export default function SettingsProfile() {
  const { data: session } = useSession();

  const formatJoinDate = () => {
    // Mock join date - in real app this would come from user data
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Profile</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-background rounded-lg p-6 border border-border">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Display Name
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {session?.user?.name || "User"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
              {session?.user?.email || "No email provided"}
            </div>
          </div>

          {/* Join Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Member Since
            </Label>
            <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
              {formatJoinDate()}
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">
              Account Active
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Your account is in good standing with all features enabled
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-background border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">5</div>
          <div className="text-xs text-muted-foreground">Apps Used</div>
        </div>
        <div className="text-center p-4 bg-background border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">2</div>
          <div className="text-xs text-muted-foreground">Saved Locations</div>
        </div>
        <div className="text-center p-4 bg-background border border-border rounded-lg">
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-xs text-muted-foreground">Days Active</div>
        </div>
      </div>
    </div>
  );
}
