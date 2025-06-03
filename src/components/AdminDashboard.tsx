import { useState } from "react";
import { User, Ticket } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";

interface AdminDashboardProps {
  user: User;
  tickets: Ticket[];
  technicians: User[];
  onAssignTechnician: (ticketId: string, technicianId: string) => void;
  onUpdateStatus: (ticketId: string, status: Ticket["status"]) => void;
  onViewTicket: (ticketId: string) => void;
  onLogout: () => void;
}

const AdminDashboard = ({
  user,
  tickets,
  technicians,
  onAssignTechnician,
  onUpdateStatus,
  onViewTicket,
  onLogout,
}: AdminDashboardProps) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTickets = tickets.filter(
    (ticket) => filterStatus === "all" || ticket.status === filterStatus,
  );

  const getStatusBadge = (status: Ticket["status"]) => {
    const styles = {
      created: "bg-blue-100 text-blue-800",
      assigned: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-orange-100 text-orange-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    };

    const labels = {
      created: "Создана",
      assigned: "Назначена",
      in_progress: "В работе",
      resolved: "Решена",
      closed: "Закрыта",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Панель администратора
            </h2>
            <div className="flex items-center gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
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
                  {tickets.filter((t) => t.status === "in_progress").length}
                </div>
                <div className="text-sm text-gray-600">В работе</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {tickets.filter((t) => t.status === "resolved").length}
                </div>
                <div className="text-sm text-gray-600">Решено</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {ticket.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Автор: {ticket.userName}</span>
                        <span>{ticket.createdAt.toLocaleDateString()}</span>
                        {getStatusBadge(ticket.status)}
                        {ticket.technicianName && (
                          <span className="text-blue-600">
                            Исполнитель: {ticket.technicianName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={ticket.technicianId || ""}
                          onValueChange={(value) =>
                            onAssignTechnician(ticket.id, value)
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Назначить техника" />
                          </SelectTrigger>
                          <SelectContent>
                            {technicians.map((tech) => (
                              <SelectItem key={tech.id} value={tech.id}>
                                {tech.username}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={ticket.status}
                          onValueChange={(value: Ticket["status"]) =>
                            onUpdateStatus(ticket.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="created">Создана</SelectItem>
                            <SelectItem value="assigned">Назначена</SelectItem>
                            <SelectItem value="in_progress">
                              В работе
                            </SelectItem>
                            <SelectItem value="resolved">Решена</SelectItem>
                            <SelectItem value="closed">Закрыта</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewTicket(ticket.id)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTickets.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Заявки не найдены
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
