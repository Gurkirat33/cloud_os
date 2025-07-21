export interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
  dueDate?: Date;
}

export const defaultCategories = [
  "Personal",
  "Work",
  "Shopping",
  "Health",
  "Other",
];

export type FilterType = "all" | "completed" | "pending";
export type PriorityType = "all" | "low" | "medium" | "high";
