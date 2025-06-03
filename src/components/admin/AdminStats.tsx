import { Ticket } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface AdminStatsProps {
  tickets: Ticket[];
}

const AdminStats = ({ tickets }: AdminStatsProps) => {
  const inProgressCount = tickets.filter(
    (t) => t.status === "in_progress",
  ).length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {tickets.length}
          </div>
          <div className="text-sm text-gray-600">Всего заявок</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {inProgressCount}
          </div>
          <div className="text-sm text-gray-600">В работе</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {resolvedCount}
          </div>
          <div className="text-sm text-gray-600">Решено</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
