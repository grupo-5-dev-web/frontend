"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddUserModal } from "@/components/custom/AddUserModal";
import { AddResourceModal } from "@/components/custom/AddResourceModal";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
}

interface Booking {
  id: string;
  userName: string;
  time: string;
  resourceName: string;
}

export default function Dashboard() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      password: "senha123",
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      password: "senha123",
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      password: "senha123",
    },
  ]);

  const [resources, setResources] = useState<Resource[]>([
    { id: "1", name: "Sala de Reunião A", type: "sala", quantity: 1 },
    { id: "2", name: "Projetor Multimídia", type: "equipamento", quantity: 3 },
    { id: "3", name: "Notebook Dell XPS", type: "equipamento", quantity: 5 },
  ]);

  const bookings: Booking[] = [
    {
      id: "1",
      userName: "Maria Silva",
      time: "08:00 - 09:00",
      resourceName: "Sala de Reunião A",
    },
    {
      id: "2",
      userName: "João Santos",
      time: "09:00 - 10:30",
      resourceName: "Projetor Multimídia",
    },
    {
      id: "3",
      userName: "Ana Costa",
      time: "10:00 - 12:00",
      resourceName: "Sala de Conferência",
    },
    {
      id: "4",
      userName: "Pedro Oliveira",
      time: "11:00 - 12:00",
      resourceName: "Notebook Dell XPS",
    },
  ];

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleAddUser = (newUser: {
    name: string;
    email: string;
    password: string;
  }) => {
    setUsers([...users, { id: crypto.randomUUID(), ...newUser }]);
    setIsUserModalOpen(false);
  };

  const handleAddResource = (newResource: {
    name: string;
    type: string;
    quantity: number;
  }) => {
    setResources([...resources, { id: crypto.randomUUID(), ...newResource }]);
    setIsResourceModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Visão geral do sistema de gerenciamento de recursos
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsUserModalOpen(true)}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Adicionar Usuário
            </Button>
            <Button
              onClick={() => setIsResourceModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Adicionar Recurso
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm text-gray-600">
                Total de Recursos Disponíveis
              </h3>
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="text-3xl mb-1">24</div>
              <p className="text-xs text-gray-500">
                Recursos cadastrados no sistema
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm text-gray-600">
                Total de Agendamentos Hoje
              </h3>
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="text-3xl mb-1">12</div>
              <p className="text-xs text-gray-500">Agendamentos para hoje</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm text-gray-600">
                Recursos Disponíveis Agora
              </h3>
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="text-3xl mb-1">18</div>
              <p className="text-xs text-gray-500">
                Recursos livres no momento
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3>Agendamentos de Hoje</h3>
            <p className="text-sm text-gray-500">
              Selecione uma data para visualizar agendamentos
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex justify-center lg:justify-start">
                <div className="rounded-md border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      onClick={previousMonth}
                      className="h-9 w-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </span>
                    <Button
                      onClick={nextMonth}
                      className="h-9 w-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs text-gray-500 w-9"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <Button
                        key={index}
                        onClick={() => day && setSelectedDate(day)}
                        disabled={!day}
                        className={`h-9 w-9 rounded-md text-sm transition-colors ${
                          !day
                            ? "invisible"
                            : day && isSameDay(day, selectedDate)
                            ? "bg-gray-900 text-white hover:bg-gray-900"
                            : day && isToday(day)
                            ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {day ? day.getDate() : ""}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-gray-900">{booking.userName}</span>
                      <span className="text-sm text-gray-600">
                        {booking.time}
                      </span>
                      <span className="text-sm text-gray-600">
                        {booking.resourceName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddUserModal
        open={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
        onAddUser={handleAddUser}
      />

      <AddResourceModal
        open={isResourceModalOpen}
        onOpenChange={setIsResourceModalOpen}
        onAddResource={handleAddResource}
      />
    </>
  );
}
