"use client";

import { Avatar, AvatarFallback } from "@/components/avatar";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";
import { Mail, User as UserIcon, X } from "lucide-react";

import { useState } from "react";
import { randomUUID } from "crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Maria Silva", email: "maria.silva@email.com" },
    { id: "2", name: "João Santos", email: "joao.santos@email.com" },
    { id: "3", name: "Ana Costa", email: "ana.costa@email.com" },
  ]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userEmail && userPassword) {
      const newUser: User = {
        id: randomUUID(),
        name: userName,
        email: userEmail,
      };
      setUsers([...users, newUser]);
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setIsUserModalOpen(false);
    }
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

          <Button
            onClick={() => setIsUserModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
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

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
            <DialogTitle className="text-xl mb-2">
              Adicionar Usuário
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mb-4">
              Preencha as informações do novo usuário
            </DialogDescription>
            <DialogClose asChild>
              <Button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
            <form onSubmit={handleAddUser}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name" className="text-sm">
                    Nome
                  </Label>
                  <Input
                    id="user-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome completo"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="user-email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="usuario@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password" className="text-sm">
                    Senha
                  </Label>
                  <Input
                    id="user-password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Adicionar
                </Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
