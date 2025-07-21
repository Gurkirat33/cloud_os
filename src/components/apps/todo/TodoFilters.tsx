import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterType,
  PriorityType,
  defaultCategories,
} from "../../../../types/todoApp";

interface TodoFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: FilterType;
  setFilterStatus: (status: FilterType) => void;
  filterPriority: PriorityType;
  setFilterPriority: (priority: PriorityType) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

export default function TodoFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
}: TodoFiltersProps) {
  return (
    <div className="flex gap-3 relative">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        value={filterStatus}
        onValueChange={(value: string) => setFilterStatus(value as FilterType)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="z-[9999]" align="start" sideOffset={4}>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filterPriority}
        onValueChange={(value: string) =>
          setFilterPriority(value as PriorityType)
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Priority" />
        </SelectTrigger>
        <SelectContent className="z-[9999]" align="start" sideOffset={4}>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterCategory} onValueChange={setFilterCategory}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="z-[9999]" align="start" sideOffset={4}>
          <SelectItem value="all">All Categories</SelectItem>
          {defaultCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
