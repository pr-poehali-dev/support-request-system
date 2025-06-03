import { useState } from "react";
import { User, Ticket } from "@/types";
import Header from "@/components/Header";
import AdminStats from "@/components/admin/AdminStats";
import AdminFilters from "@/components/admin/AdminFilters";
import TicketsList from "@/components/admin/TicketsList";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <AdminFilters
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />

          <AdminStats tickets={tickets} />

          <TicketsList
            tickets={filteredTickets}
            technicians={technicians}
            onAssignTechnician={onAssignTechnician}
            onUpdateStatus={onUpdateStatus}
            onViewTicket={onViewTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
