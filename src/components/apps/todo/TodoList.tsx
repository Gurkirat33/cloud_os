import { CheckSquare } from "lucide-react";
import TodoItem from "./TodoItem";
import { Todo } from "../../../../types/todoApp";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
