import { useState } from "react";
import { User, Ticket } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "./Header";

interface UserDashboardProps {
  user: User;
  tickets: Ticket[];
  onCreateTicket: (
    title: string,
    description: string,
    type: "ПО" | "Оборудование" | "Сеть",
  ) => void;
  onViewTicket: (ticketId: string) => void;
  onLogout: () => void;
}

const UserDashboard = ({
  user,
  tickets,
  onCreateTicket,
  onViewTicket,
  onLogout,
}: UserDashboardProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"ПО" | "Оборудование" | "Сеть">("ПО");

  const userTickets = tickets.filter((ticket) => ticket.userId === user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && type) {
      onCreateTicket(title, description, type);
      setTitle("");
      setDescription("");
      setType("ПО");
      setIsCreating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "created":
        return <Badge variant="secondary">Создана</Badge>;
      case "in_progress":
        return <Badge variant="default">В обработке</Badge>;
      case "completed":
        return <Badge variant="outline">Выполнена</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Мои заявки</h2>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Создать заявку
            </Button>
          </div>

          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>Новая заявка</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Заголовок заявки"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Select
                    value={type}
                    onValueChange={(value: "ПО" | "Оборудование" | "Сеть") =>
                      setType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип заявки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ПО">ПО</SelectItem>
                      <SelectItem value="Оборудование">Оборудование</SelectItem>
                      <SelectItem value="Сеть">Сеть</SelectItem>
                    </SelectContent>
                  </Select>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                    placeholder="Описание проблемы"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Создать
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsCreating(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {userTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {ticket.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{ticket.createdAt.toLocaleDateString()}</span>
                        {getStatusBadge(ticket.status)}
                        {ticket.technicianName && (
                          <span>Исполнитель: {ticket.technicianName}</span>
                        )}
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

            {userTickets.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  У вас пока нет заявок
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
