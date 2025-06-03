import { Ticket, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketCardProps {
  ticket: Ticket;
  technicians: User[];
  onAssignTechnician: (ticketId: string, technicianId: string) => void;
  onUpdateStatus: (ticketId: string, status: Ticket["status"]) => void;
  onViewTicket: (ticketId: string) => void;
}

const TicketCard = ({
  ticket,
  technicians,
  onAssignTechnician,
  onUpdateStatus,
  onViewTicket,
}: TicketCardProps) => {
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">{ticket.title}</h3>
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
                onValueChange={(value) => onAssignTechnician(ticket.id, value)}
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
                  <SelectItem value="in_progress">В работе</SelectItem>
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
  );
};

export default TicketCard;
