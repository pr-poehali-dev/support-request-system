import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminFiltersProps {
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

const AdminFilters = ({ filterStatus, onFilterChange }: AdminFiltersProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-900">
        Панель администратора
      </h2>
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все заявки</SelectItem>
            <SelectItem value="created">Созданные</SelectItem>
            <SelectItem value="assigned">Назначенные</SelectItem>
            <SelectItem value="in_progress">В работе</SelectItem>
            <SelectItem value="resolved">Решенные</SelectItem>
            <SelectItem value="closed">Закрытые</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdminFilters;
