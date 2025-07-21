import { Card, CardContent } from "@/components/ui/card";
import { Todo } from "../../../../types/todoApp";

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === "high" && !t.completed).length,
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.completed}
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.high}</div>
          <div className="text-xs text-muted-foreground">High Priority</div>
        </CardContent>
      </Card>
    </div>
  );
}
