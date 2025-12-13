"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUserModal } from "@/components/custom/AddUserModal";
import { Mail, User as UserIcon } from "lucide-react";

import { User, create as createUser } from "@/api/user/create";
import { list as listUsers } from "@/api/user/list";

import { useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error"
  >("default");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    listUsers()
      .then(setUsers)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddUser = (newUser: User) => {
    createUser(newUser)
      .then((createdUser) => {
        setUsers((prevUsers) => [...prevUsers, createdUser]);
        setToastVariant("success");
        setToastMessage("Usuário adicionado com sucesso!");
        setToastOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setToastVariant("error");
        setToastMessage("Falha ao adicionar usuário");
        setToastOpen(true);
      });
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

        {!!users.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.email}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-linear-to-br from-blue-300 to-blue-800 text-white font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <span
                        className={`p-2 border rounded-sm text-xs text-white font-bold ${
                          user.user_type === "admin"
                            ? "bg-blue-400 border-blue-500"
                            : "bg-primary/80 border-primary"
                        }`}
                      >
                        {user.user_type?.toLocaleUpperCase()}
                      </span>
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
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <UserIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Nenhum usuário cadastrado ainda</p>
                <p className="text-sm">
                  Use o botão &quot;Adicionar Usuário&quot; para começar
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AddUserModal
        open={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
        onAddUser={handleAddUser}
      />

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        message={toastMessage}
      />
    </>
  );
}
