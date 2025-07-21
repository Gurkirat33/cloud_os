export interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  animations: boolean;
  transparency: boolean;
}

export interface SystemSettings {
  notifications: boolean;
  sounds: boolean;
  autoSave: boolean;
  startupApps: string[];
  language: string;
  timeFormat: "12h" | "24h";
}

export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  crashReports: boolean;
  locationServices: boolean;
}

export interface Settings {
  appearance: AppearanceSettings;
  system: SystemSettings;
  privacy: PrivacySettings;
}

export type SettingsCategory =
  | "profile"
  | "appearance"
  | "system"
  | "privacy"
  | "about";
