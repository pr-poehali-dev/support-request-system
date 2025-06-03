import { useState } from "react";
import { User, Ticket, AppState } from "@/types";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import TechnicianDashboard from "@/components/TechnicianDashboard";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    tickets: [],
    selectedTicketId: undefined,
    technicians: [
      { id: "tech1", username: "Техник Иван", role: "technician" },
      { id: "tech2", username: "Техник Мария", role: "technician" },
    ],
    isAuthenticated: false,
    currentView: "login",
  });

  // Mock users data
  const mockUsers: User[] = [
    { id: "1", username: "user1", role: "user" },
    { id: "2", username: "admin", role: "admin" },
    { id: "3", username: "tech1", role: "technician" },
  ];

  const handleLogin = (username: string, password: string) => {
    const user = mockUsers.find((u) => u.username === username);
    if (user) {
      setAppState((prev) => ({
        ...prev,
        currentUser: user,
        isAuthenticated: true,
        currentView: "dashboard",
      }));
    }
  };

  const handleRegister = (username: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      role: "user",
    };

    setAppState((prev) => ({
      ...prev,
      currentUser: newUser,
      isAuthenticated: true,
      currentView: "dashboard",
    }));
  };

  const handleCreateTicket = (title: string, description: string) => {
    if (!appState.currentUser) return;

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title,
      description,
      status: "created",
      userId: appState.currentUser.id,
      userName: appState.currentUser.username,
      createdAt: new Date(),
    };

    setAppState((prev) => ({
      ...prev,
      tickets: [...prev.tickets, newTicket],
    }));
  };

  const handleViewTicket = (ticketId: string) => {
    setAppState((prev) => ({
      ...prev,
      selectedTicketId: ticketId,
      currentView: "ticket-details",
    }));
  };

  const handleLogout = () => {
    setAppState({
      currentUser: null,
      tickets: appState.tickets,
      technicians: appState.technicians,
      isAuthenticated: false,
      currentView: "login",
    });
  };

  const handleAssignTechnician = (ticketId: string, technicianId: string) => {
    const technician = appState.technicians.find((t) => t.id === technicianId);
    setAppState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              technicianId,
              technicianName: technician?.username,
              status: "assigned" as const,
            }
          : ticket,
      ),
    }));
  };

  const handleUpdateStatus = (ticketId: string, status: Ticket["status"]) => {
    setAppState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket,
      ),
    }));
  };

  const switchToRegister = () => {
    setAppState((prev) => ({ ...prev, currentView: "register" }));
  };

  const switchToLogin = () => {
    setAppState((prev) => ({ ...prev, currentView: "login" }));
  };

  // Render current view
  if (!appState.isAuthenticated) {
    if (appState.currentView === "register") {
      return (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={switchToLogin}
        />
      );
    }

    return (
      <LoginForm onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
    );
  }

  if (appState.currentUser?.role === "admin") {
    return (
      <AdminDashboard
        user={appState.currentUser}
        tickets={appState.tickets}
        technicians={appState.technicians}
        onAssignTechnician={handleAssignTechnician}
        onUpdateStatus={handleUpdateStatus}
        onViewTicket={handleViewTicket}
        onLogout={handleLogout}
      />
    );
  }

  if (appState.currentUser?.role === "technician") {
    return (
      <TechnicianDashboard
        user={appState.currentUser}
        tickets={appState.tickets}
        onUpdateStatus={handleUpdateStatus}
        onViewTicket={handleViewTicket}
        onLogout={handleLogout}
      />
    );
  }

  // User role
  return (
    <UserDashboard
      user={appState.currentUser!}
      tickets={appState.tickets}
      onCreateTicket={handleCreateTicket}
      onViewTicket={handleViewTicket}
      onLogout={handleLogout}
    />
  );
};

export default Index;
