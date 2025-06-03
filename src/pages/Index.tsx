import { useState } from "react";
import { User, Ticket, AppState } from "@/types";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    tickets: [],
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
      tickets: appState.tickets, // Сохраняем заявки
      isAuthenticated: false,
      currentView: "login",
    });
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

  if (appState.currentUser?.role === "user") {
    return (
      <UserDashboard
        user={appState.currentUser}
        tickets={appState.tickets}
        onCreateTicket={handleCreateTicket}
        onViewTicket={handleViewTicket}
        onLogout={handleLogout}
      />
    );
  }

  // Placeholder for other roles
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Панель {appState.currentUser?.role}
        </h1>
        <p className="text-gray-600 mb-4">В разработке...</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Index;
