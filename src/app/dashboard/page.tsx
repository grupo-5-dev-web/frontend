"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddUserModal } from "@/components/custom/AddUserModal";
import { AddResourceModal } from "@/components/custom/AddResourceModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/custom/DatePicker";

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

          <div className="flex gap-4">
            <Button onClick={() => setIsUserModalOpen(true)}>
              Adicionar Usuário
            </Button>
            <Button onClick={() => setIsResourceModalOpen(true)}>
              Adicionar Recurso
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Total de Recursos Disponíveis
                  </p>
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
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">24</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
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
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
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
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl">18</div>
            </CardContent>
          </Card>
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
              <DatePicker />

              <div className="space-y-3">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900">{booking.userName}</p>
                        <p className="text-sm text-gray-600">{booking.time}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {booking.resourceName}
                      </p>
                    </CardContent>
                  </Card>
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
