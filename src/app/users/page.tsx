"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Mail, User as UserIcon } from "lucide-react";

import { useState } from "react";
import { AddUserModal } from "@/components/custom/AddUserModal";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function UsersPage() {
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

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddUser = (newUser: {
    name: string;
    email: string;
    password: string;
  }) => {
    setUsers([...users, { id: crypto.randomUUID(), ...newUser }]);
    setIsUserModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="mb-2">Usuários</h1>
            <p className="text-gray-600">
              Gerencie todos os usuários do sistema
            </p>
          </div>

          <Button onClick={() => setIsUserModalOpen(true)}>
            Adicionar Usuário
          </Button>
        </div>

        {users.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <UserIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum usuário cadastrado ainda</p>
                <p className="text-sm">
                  Use o botão &quot;Adicionar Usuário&quot; para começar
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-linear-to-br from-blue-600 to-blue-800 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{user.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddUserModal
        open={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
        onAddUser={handleAddUser}
      />
    </>
  );
}
