import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultCategories, Todo } from "../../../../types/todoApp";

interface NewTodo {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: string;
}

interface AddTodoModalProps {
  newTodo?: NewTodo;
  setNewTodo?: (todo: NewTodo) => void;
  editingTodo?: Todo;
  onAdd?: () => void;
  onUpdate?: (id: string, updates: Partial<Todo>) => void;
  onClose: () => void;
  isEditing?: boolean;
}

export default function AddTodoModal({
  newTodo,
  setNewTodo,
  editingTodo,
  onAdd,
  onUpdate,
  onClose,
  isEditing = false,
}: AddTodoModalProps) {
  // For editing mode, use editingTodo values, otherwise use newTodo
  const currentTitle = isEditing
    ? editingTodo?.title || ""
    : newTodo?.title || "";
  const currentDescription = isEditing
    ? editingTodo?.description || ""
    : newTodo?.description || "";
  const currentPriority = isEditing
    ? editingTodo?.priority || "medium"
    : newTodo?.priority || "medium";
  const currentCategory = isEditing
    ? editingTodo?.category || "Personal"
    : newTodo?.category || "Personal";

  const handleTitleChange = (value: string) => {
    if (isEditing && editingTodo && onUpdate) {
      onUpdate(editingTodo.id, { title: value });
    } else if (setNewTodo && newTodo) {
      setNewTodo({ ...newTodo, title: value });
    }
  };

  const handleDescriptionChange = (value: string) => {
    if (isEditing && editingTodo && onUpdate) {
      onUpdate(editingTodo.id, { description: value });
    } else if (setNewTodo && newTodo) {
      setNewTodo({ ...newTodo, description: value });
    }
  };

  const handlePriorityChange = (value: string) => {
    const priority = value as "low" | "medium" | "high";
    if (isEditing && editingTodo && onUpdate) {
      onUpdate(editingTodo.id, { priority });
    } else if (setNewTodo && newTodo) {
      setNewTodo({ ...newTodo, priority });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (isEditing && editingTodo && onUpdate) {
      onUpdate(editingTodo.id, { category: value });
    } else if (setNewTodo && newTodo) {
      setNewTodo({ ...newTodo, category: value });
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      // For editing, just close the modal since updates are applied in real-time
      onClose();
    } else if (onAdd) {
      onAdd();
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isEditing ? "Edit Task" : "Add New Task"}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Task title..."
              value={currentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Description (optional)..."
              value={currentDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={currentPriority}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={currentCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  {defaultCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!currentTitle.trim()}
              className="flex-1"
            >
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
