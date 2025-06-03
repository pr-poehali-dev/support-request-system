import { Ticket, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import TicketCard from "./TicketCard";

interface TicketsListProps {
  tickets: Ticket[];
  technicians: User[];
  onAssignTechnician: (ticketId: string, technicianId: string) => void;
  onUpdateStatus: (ticketId: string, status: Ticket["status"]) => void;
  onViewTicket: (ticketId: string) => void;
}

const TicketsList = ({
  tickets,
  technicians,
  onAssignTechnician,
  onUpdateStatus,
  onViewTicket,
}: TicketsListProps) => {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          Заявки не найдены
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          technicians={technicians}
          onAssignTechnician={onAssignTechnician}
          onUpdateStatus={onUpdateStatus}
          onViewTicket={onViewTicket}
        />
      ))}
    </div>
  );
};

export default TicketsList;
