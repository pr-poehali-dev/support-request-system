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

interface TechnicianDashboardProps {
  user: User;
  tickets: Ticket[];
  onUpdateStatus: (ticketId: string, status: Ticket["status"]) => void;
  onViewTicket: (ticketId: string) => void;
  onLogout: () => void;
}

const TechnicianDashboard = ({
  user,
  tickets,
  onUpdateStatus,
  onViewTicket,
  onLogout,
}: TechnicianDashboardProps) => {
  const [filterStatus, setFilterStatus] = useState<string>("assigned");

  const myTickets = tickets.filter((ticket) => ticket.technicianId === user.id);
  const filteredTickets = myTickets.filter(
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

  const canUpdateStatus = (currentStatus: Ticket["status"]) => {
    if (currentStatus === "assigned") return ["in_progress"];
    if (currentStatus === "in_progress") return ["resolved"];
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Мои назначенные заявки
            </h2>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все мои заявки</SelectItem>
                <SelectItem value="assigned">Назначенные</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="resolved">Решенные</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {myTickets.filter((t) => t.status === "assigned").length}
                </div>
                <div className="text-sm text-gray-600">Новые</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {myTickets.filter((t) => t.status === "in_progress").length}
                </div>
                <div className="text-sm text-gray-600">В работе</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {myTickets.filter((t) => t.status === "resolved").length}
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
                      </div>

                      {canUpdateStatus(ticket.status).length > 0 && (
                        <div className="flex items-center gap-2">
                          {canUpdateStatus(ticket.status).map((status) => (
                            <Button
                              key={status}
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateStatus(ticket.id, status)}
                              className="text-xs"
                            >
                              {status === "in_progress"
                                ? "Взять в работу"
                                : "Пометить решенной"}
                            </Button>
                          ))}
                        </div>
                      )}
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
                  {filterStatus === "assigned"
                    ? "У вас нет новых назначенных заявок"
                    : "Заявки не найдены"}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
