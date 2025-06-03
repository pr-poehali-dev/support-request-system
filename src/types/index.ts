export interface User {
  id: string;
  username: string;
  role: "user" | "admin" | "technician";
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "created" | "in_progress" | "completed";
  userId: string;
  userName: string;
  technicianId?: string;
  technicianName?: string;
  createdAt: Date;
  completionReport?: string;
}

export interface AppState {
  currentUser: User | null;
  tickets: Ticket[];
  isAuthenticated: boolean;
  currentView: "login" | "register" | "dashboard" | "ticket-details";
  selectedTicketId?: string;
}
