"use client";

import { useState, useCallback } from "react";
import { CheckSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WindowContainer from "../ui/WindowContainer";
import TodoStats from "./todo/TodoStats";
import TodoFilters from "./todo/TodoFilters";
import TodoList from "./todo/TodoList";
import AddTodoModal from "./todo/AddTodoModal";
import { useTodos, useFilters } from "./todo/useTodos";
import { AppProps, Todo } from "../../../types/todoApp";

export default function TodoApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, mounted } =
    useTodos();
  const {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    filteredTodos,
  } = useFilters(todos);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    category: "Personal",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = useCallback(() => {
    if (!newTodo.title.trim()) return;

    addTodo({
      title: newTodo.title,
      description: newTodo.description,
      priority: newTodo.priority,
      category: newTodo.category,
    });

    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      category: "Personal",
    });
    setShowAddForm(false);
  }, [newTodo, addTodo]);

  const handleEditTodo = useCallback(
    (id: string) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        setEditingTodo(todoToEdit);
      }
    },
    [todos]
  );

  const handleUpdateTodo = useCallback(
    (id: string, updates: Partial<Todo>) => {
      updateTodo(id, updates);
      // Update the editingTodo state with the new values
      setEditingTodo((prev) => (prev ? { ...prev, ...updates } : null));
    },
    [updateTodo]
  );

  const handleCloseEditModal = useCallback(() => {
    setEditingTodo(null);
  }, []);

  if (!mounted) return null;

  return (
    <WindowContainer
      title="Todo List"
      icon={<CheckSquare className="w-4 h-4 text-green-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={800}
      defaultHeight={600}
      minWidth={600}
      minHeight={500}
    >
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <Card className="rounded-none border-0 border-b">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-xl">My Tasks</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Stay organized and productive
                </p>
              </div>
              <Button onClick={() => setShowAddForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>
            <TodoStats todos={todos} />
          </CardHeader>
        </Card>

        {/* Filters */}
        <Card className="rounded-none border-0 border-b">
          <CardContent className="p-4">
            <TodoFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="flex-1 overflow-auto p-4">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={handleEditTodo}
          />
        </div>

        {/* Add Todo Modal */}
        {showAddForm && (
          <AddTodoModal
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            onAdd={handleAddTodo}
            onClose={() => setShowAddForm(false)}
            isEditing={false}
          />
        )}

        {/* Edit Todo Modal */}
        {editingTodo && (
          <AddTodoModal
            editingTodo={editingTodo}
            onUpdate={handleUpdateTodo}
            onClose={handleCloseEditModal}
            isEditing={true}
          />
        )}
      </div>
    </WindowContainer>
  );
}
